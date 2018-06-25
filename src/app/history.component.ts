import { Component, SimpleChange, SimpleChanges, ViewChild, OnInit, Input, Output, OnChanges, EventEmitter, AfterViewInit } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { MatTableDataSource } from '@angular/material';

import { P2PCollabService } from './store/p2pcollab.service';
import { poEvent } from './poEvent.model';

@Component({
  selector: 		'history',
  templateUrl:		'./history.component.html',
  styleUrls: [
    '../../node_modules/font-awesome/css/font-awesome.min.css',
    '../assets/Semantic-UI-CSS-master/semantic.min.css',
    './app.component.css',
  ]
})

export class HistoryComponent implements OnInit, OnChanges {

  @Input() poID: string = '';
  history_table: poEvent[];

  dataSource = new MatTableDataSource<poEvent>();
  displayedColumns = ["poID","type","block","timestamp"];

  constructor( private p2pCollabService : P2PCollabService ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const id: SimpleChange = changes.poID;
    this.poID = id.currentValue;
    console.log("looking for history of '" + this.poID + "'");
    this.p2pCollabService.retrieveOrderAccepted(this.poID).then( 
		t => { 	this.history_table = t;  
			this.dataSource.data = t;
			console.log("having retrieved events: " + JSON.stringify(t) );
  			}
		);
  }

}

