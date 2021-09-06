import moment from "moment";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import QRCode from "react-qr-code";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import { currentUser } from "../services/appmethods";
import User from "../services/User";

export default function ShowTicket(){
    const [amount, setAmount] = useState(0);
    const router = useHistory();
    const { addToast } = useToasts();
    const {ticketId} = useParams()
    const [sc , setSC] = useState(false)
    const [ticketData, setTicketData] = useState({})

    const apStyle = {
        height : "700px",
        width: "350px",
        borderRadius : '3px',
        padding : "0",
        boxShadow : '0 5px 12px 0 rgba(0, 0, 0, 0.26)',
        //background : 'url(/images/stadiumbackground.jpg) #a24d49',
        clipPath  : "url('#my-clip-path')",
        backgroundColor : '#a24d49',
        margin: '2rem auto',
        filter: 'drop-shadow(0 3px 10px #a24d49)',}

    const onChangeHandler = event => {
        setAmount(event.target.value);
      };
      useEffect(
          ()=> {
               User.getServerData("/getticketmatchdata/" + ticketId).then(
                   (response)=> {
                       setTicketData(response.data.data);
                       console.log(response.data.data)
                   }
               ).catch(
                   (error)=> {
                        router.push("/dashboard");
                        addToast('Invalid Ticket Id', { appearance: 'error', autoDismiss : true });
                   }
               )
          },[])
    return (
        <>  
<div class="row clearfix contanier-fluid d-flex align-items-center">     
   <div className="card text-center text-white" style={apStyle}>
   <div class="card-body">
           <div className="d-flex justify-content-between">
         
           <div className="d-flex flex-column">
               <img src={ticketData?.club1Data?.logo_url} width="50px" height="60px" alt="teamA" />
               <span className="text-white">{ticketData?.club1Data?.team_name}</span>
           </div>
           
           <h6 className="text-white">VS</h6>
             
           <div className="d-flex flex-column">
               <img src={ticketData?.club2Data?.logo_url} width="50px" height="60px" alt="teamA" />
               <span className="text-white">{ticketData?.club2Data?.team_name}</span>
           </div>

           </div>

           <div className="d-flex flex-column justify-content-between">
               <h6 className="text-white">{ticketData?.match?.pitch}</h6>
               <h6 className="text-white">{ticketData?.match?.match_day}</h6>
               <h6 class="text-secondary">{ticketData?.match?.match_time}</h6>
               <div> {ticketData?.ticket?.authorized === 0 ? <span className="label label-danger">Pending</span> : <span className="label label-success">Authorized</span> } </div>
               <span style={{color : "grey"}}>Ticket ID</span>
               <h6 className="text-white">{ticketData?.ticket?.ticket_id}</h6>
           </div>

           <div style={{backgroundColor : "white", padding : "8px"}}>
               <QRCode value={String(ticketData?.ticket?.ticket_id)} size={200} />
           </div>

           <div className="mt-2" style={{border : "1px dashed white"}}></div>

           <div className="mt-2 p-3 d-flex flex-column" style={{backgroundColor : "white"}}>
              
                   <div className="d-flex justify-content-between">
                       <span>Name::</span>
                       <span>{ JSON.parse(currentUser())?.user?.name}</span>
                   </div>

                   <div className="d-flex justify-content-between">
                       <span>Units::</span>
                       <span>{ ticketData?.ticket?.units}</span>
                   </div>

                   <div className="d-flex justify-content-between">
                       <span>Price::</span>
                       <span><NumberFormat value={ticketData?.ticket?.ticket_price} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></span>
                   </div>

                   <div className="d-flex justify-content-between">
                       <span>Total::</span>
                       <span><NumberFormat value={ticketData?.ticket?.total_amount_paid} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></span>
                   </div>

                   <div className="d-flex justify-content-between">
                       <span>Time Booked::</span>
                       <span>{moment(ticketData?.ticket?.created_at).format("LL")}</span>
                   </div>


           </div>

   </div>
</div>

</div> 

       

   <svg class="svg" xmlns="http://www.w3.org/2000/svg">
           <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
               <path d="M1,0 l0,0.429 c-0.015,0.007,-0.026,0.033,-0.026,0.065 s0.011,0.058,0.026,0.065 V1 H0 V0.559 c0.015,-0.007,0.026,-0.033,0.026,-0.065 S0.015,0.436,0,0.429 V0 h1"></path>
           </clipPath>
   </svg>
</>
    )

}