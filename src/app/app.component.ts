import { Component, ViewChild, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SuiModule } from 'ng2-semantic-ui';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { nodeService } from './store/node.service';
import { AuthService } from './auth.service';
import { PO } from './store/po.model';
import { P2PCollabService } from './store/p2pcollab.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

//
// MAIN APPLICATION COMPONENT APP-ROOT
//
@Component({
  selector: 		'app-root',
  templateUrl:		'./app.component.html',
  styleUrls: [
    '../../node_modules/font-awesome/css/font-awesome.min.css',
    '../assets/Semantic-UI-CSS-master/semantic.min.css',
    './app.component.css',
  ]
})

export class AppComponent implements OnInit {

  blockNumber: string = 'retrieving...';
  blockDetail: string = 'retrieving...';
  defaultAccount: string = 'none';
  loginStatus = '';
  isLoading = null;
  accounts: string[] = [];

  p2pPOs: PO[];

/*
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }
*/

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //if (this.paginator && this.sort) { this.applyFilter(''); }
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // smart table definition
  // Data is empty here. Actual data will be loaded once we load all the POs at login()
  dataSource = new MatTableDataSource<PO>();
  displayedColumns = ["poID","poLine","poSL","poType","material","status","quantity","date","action1","action2"];

  constructor(private nodeService : nodeService, private p2pCollabService : P2PCollabService ,private authService: AuthService ) {
  }

  ngOnInit() : void {
  }

  login( account: string, key: string ) {

    this.loginStatus = '';

    this.authService.login( account, key )
     .then( 
	logged => {

		// initialize the connection to the node prior to anything else !!
    		this.nodeService.init().then( initialized => { 

    		// retrieve the last block number and then the details
    		this.nodeService.getBlockNumber( res => { 
			this.blockNumber = res; 
			this.nodeService.getBlockDetail( this.blockNumber, res => {
			this.blockDetail = res; 
    			});
    		});

    		// retrieve all accounts, and store the default one
    		this.nodeService.getAccounts( res => { 
			this.accounts = res; 
			if (res && res.length != 0) this.defaultAccount = res[0]; 
			});


		});
  		
		// Use p2pService to retreive all the POs
                console.log("debug:     before p2p init");
                this.p2pCollabService.init(this.nodeService.getNodeCnx());

                // get All POs from smart contract
                console.log("debug:     before p2p getpos");
                this.p2pCollabService.getPOs( res => {
                    this.p2pPOs = res;
		    console.log("retrieved " + this.p2pPOs.length + " POs");
		    this.dataSource.data = this.p2pPOs;
                    });
	},

	error => {

		// cannot connect. Say why
		this.loginStatus = error;

  	}

    );

  }
 
  logout() {
    this.authService.logout();
    this.loginStatus = '';
  }
  
  basicTest( s : string) {
    this.nodeService.basicTest(s);
    this.nodeService.getBlockNumber( res => {
        this.blockNumber = res;
        });
  }

  findPObyID(id:string) {
	for (let i=0;i<this.p2pPOs.length;i++) if (this.p2pPOs[i].poID == id) return this.p2pPOs[i];
  }

  supplierAcceptPO(index:number,id:string) {
   console.log("accept on line " + index + " with id " + id);
   this.findPObyID(id).status="OPEN";
   this.p2pCollabService.supplierAcceptPO(id);
  }

  supplierRejectPO(index:number,id:string) {
   // Not implemented yet
   // this.p2pCollabService.supplierRejectPO(id);
  }

}


