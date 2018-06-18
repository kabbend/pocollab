import { Component, ViewChild, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { SuiModule } from 'ng2-semantic-ui';

import { nodeService } from './store/node.service';
import { AuthService } from './auth.service';

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
  ]
})

export class AppComponent implements OnInit {

  blockNumber: string = 'retrieving...';
  blockDetail: string = 'retrieving...';
  defaultAccount: string = 'none';
  loginStatus = '';
  isLoading = null;
  accounts: string[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // PO TABLE LAYOUT 
  displayedColumns = ["id","material","status","supplier","quantity","date","action1","action2"];
 
  // DATA SOURCE 
  source = [
  { id: 1, material: 'MatNr 1', supplier: 'SupplierA', status: 'OPEN', quantity: '20', date: '2018-12-12', },
  { id: 2, material: 'MatNr 2', supplier: 'SupplierB', status: 'OPEN', quantity: '208', date: '2028-02-12', },
  { id: 3, material: 'MatNr 5', supplier: 'SupplierA', status: 'OPEN', quantity: '8', date: '2019-02-01', },
  { id: 4, material: 'MatNr 1', supplier: 'SupplierA', status: 'OPEN', quantity: '2', date: '2018-12-12', },
  { id: 5, material: 'MatNr 20', supplier: 'SupplierC', status: 'NEW ORDER PUBLISHED', quantity: '28', date: '2028-02-12', },
  { id: 6, material: 'MatNr 8', supplier: 'SupplierD', status: 'REJECTED', quantity: '7', date: '2019-02-01', },
  { id: 7, material: 'MatNr 1', supplier: 'SupplierA', status: 'OPEN', quantity: '100', date: '2018-12-12', },
  { id: 8, material: 'MatNr 20', supplier: 'SupplierC', status: 'NEW ORDER PUBLISHED', quantity: '28', date: '2028-02-12', },
  { id: 9, material: 'MatNr 2', supplier: 'SupplierD', status: 'NEW ORDER PUBLISHED', quantity: '7', date: '2019-02-01', }
  ];

  dataSource = new MatTableDataSource<object>(this.source);

  constructor(private nodeService : nodeService, private authService: AuthService ) { 
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


  rejectPO( id: string ) {
	console.log("je rejette la po " + id );
	this.source[parseInt(id)-1].status="REJECTED";
  }

  acceptPO( id: string ) {
	console.log("j'accepte la po " + id );
	this.source[parseInt(id)-1].status="ACCEPTED";
  }

}


