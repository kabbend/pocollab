import { Injectable } from '@angular/core';
import { PO } from '../store/po.model';
import * as Web3 from 'web3';
import {Buffer} from 'buffer';          // required during tx signature
import { AppConfig } from '../app.config';



declare let require: any;
declare let window: any;

let p2pAbi = require('../contracts/P2PContract.json');

@Injectable()
export class P2PCollabService {


  _web3: any;
  private _tokenContract: any;
  private _tokenContractAddress: string = AppConfig.settings.contracts.p2pContractAddr; // P2P contract orders 15 June
  private _vendorAddress: string = AppConfig.settings.contracts.vendorAddr; 
  private _vendorPwd: string = AppConfig.settings.contracts.vendorPwd; 
  private _buyerAddress: string = AppConfig.settings.contracts.buyerAddr; 
  private _orderEvent: any;

  private _table : PO[] = [];

//---------------------------
//
//---------------------------
constructor() {

  }

//---------------------------
//
//---------------------------
public init( web3 : any)
{
    this._web3 = web3; // keep the connection to the node

    if(!this._web3.isConnected()) {
        alert("** ALERT ** cannot connect to node via web3js !");
        } else {
        console.log("web3 version " + this._web3.version.api + " " + this._web3.version.node);
    }

  // Connect to the smart contract
  this._tokenContract = this._web3.eth.contract(p2pAbi).at(this._tokenContractAddress);
  console.log("P2P contract status =  " + this._tokenContract.health());
  console.log("P2P contract nb Orders =  " + this._tokenContract.getOrderseq());

}

//---------------------------
//
//---------------------------
public getPOs(callback){



var result : any;

var nbPO = this._tokenContract.getOrderseq();
console.log("Nb Orders  = " + nbPO);

for (var _i = 1; _i <= nbPO; _i++) {

//initialize the PO in PO[]
if (this._table.length == _i-1){
this._table.push({poID:"TheID",poLine:"010",poSL:"1",poType:"CALL-UP",material:"FR_V5791536020000",status:"OPEN",reqQty:5,reqDate:"11/02/2015",poDocType:"CALL-UP"});
}

var result : any;
result = this._tokenContract.queryOrder(_i);

var xml = result[2];
var fastXmlParser = require('fast-xml-parser');
var xmlOrder = fastXmlParser.parse(xml);
console.log(" _i = " + _i);
console.log("IDOC (" + _i + ") = " + xmlOrder['ZORDERS05']['IDOC']['EDI_DC40']['DOCNUM']);
this._table[_i-1].poID    = xmlOrder['ZORDERS05']['IDOC']['EDI_DC40']['DOCNUM'];
if (result[3] == 10){
  this._table[_i-1].status  = "NEW ORDER PUB.";
}
else{
  this._table[_i-1].status  = "OPEN";
}
/**
if (xmlOrder['ZORDERS05']['IDOC']['EDI_DC40']['STATUS'] == "10"){
  this._table[_i-1].status  = "NEW ORDER PUB.";
}
else{
  this._table[_i-1].status  = "OPEN";
}
**/
//this._table[_i-1].status  = xmlOrder['ZORDERS05']['IDOC']['EDI_DC40']['STATUS'];
this._table[_i-1].poType  = xmlOrder['ZORDERS05']['IDOC']['E1EDK01']['Z1ZAIREDK01']['ORDER_TYPE'];
this._table[_i-1].poSL    = xmlOrder['ZORDERS05']['IDOC']['E1EDP01']['POSEX']; // to be checked if POSEX is the schedule line or the PO line
this._table[_i-1].reqDate = xmlOrder['ZORDERS05']['IDOC']['E1EDP01']['Z1ZAIREDP20']['EINDT']; // to be checked requested date
}
   // callback
   callback(this._table);
}

//-----------------------------
// Supplier Accept PO
//-----------------------------
public supplierAcceptPO(id: string): Promise<boolean> { 

    console.log("entering p2pCollabService.supplierAcceptPO(" + id + ")");

    return new Promise<boolean>( (resolve,reject) => { 
    	this._web3.personal.unlockAccount(this._vendorAddress, this._vendorPwd, 300, (error, result) => { 
		if (error) {
			console.log("UnlockAccount ERROR : "+error);
			resolve(false);
		} else{ 
			console.log("UnlockAccount RESULT : "+result);
        		var sid = id + "";
        		console.log(" ==> acceptOrder() id = " + sid);
       			this._tokenContract.acceptOrder(sid ,"",{gas : 10000000, from : this._vendorAddress},function (error, result){ 
				if (error){
					console.log("acceptOrder ERROR : "+error);
					resolve(false);
				} else {
					console.log("acceptOrder RESULT : "+result);
				}})
  			// Watch the event
  			this._orderEvent = this._tokenContract.OrderSent({}, {fromBlock: 0, toBlock: 'latest'});
  			this._orderEvent.watch( (error, result) => {
    			if (!error) {
        			// do what you want to do with the event data
				if (id == result.args.po_id){
					console.log("BINGO PO id = " + result.args.po_id + " Num Order = " + result.args.orderno);
					var no = parseInt(result.args.orderno) ;
					console.log("about to update _table at rank '" + no + "'");
        				this._table[no-1].status="OPEN"; // I think there is a shift in the index ( hence -1 )
        				console.log("RESULT: PO id = " + result.args.po_id + " Num Order = " + result.args.orderno)
					resolve(true);
				}	
    			} else {
				resolve(false);
			}});

		}}); 


	});

}

}

