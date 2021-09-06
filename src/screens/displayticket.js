import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import DashLayout from "../components/layout"
import User from '../services/User';
import {useToasts } from 'react-toast-notifications';
import { currentUser } from '../services/appmethods';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { ImPrinter } from 'react-icons/im';
import { GiSave } from 'react-icons/gi';
import ShowTicket from './userticket';
import { useReactToPrint } from 'react-to-print';

var QRCode = require('qrcode.react');

export default function DisplayTicket(){
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      });

return(
<DashLayout title="View Ticket">
<div className="container-fluid">

    <ShowTicket ref={componentRef} />
    
<div className="d-flex justify-content-between align-items-center mt-0">
    <button className="btn btn-success" onClick={handlePrint} ><ImPrinter /> Print</button> 
    <button className="btn btn-primary"><GiSave /> Save As Pdf</button>
</div>

         </div>
        </DashLayout>
    )
}

