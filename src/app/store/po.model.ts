export interface PO {

 poID: string;          // unique id
 poLine : string;       // PO Line
 poSL : string;      // PO Scheduled Line
 material: string;      // Customer material ref...
 status: string;        // among NOP, CCOR, etc.
 reqQty: number;        // requested qty
 reqDate: string;       // requested date
 poType: string;        // PO Type
 poDocType: string;     // PO Document Type

}

