import { useEffect, useState } from "react"
import User from "../../services/User";
import {useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router";
import { CLUB_LOGO_URL } from "../../includes/constants";
export default function MatchCard({matchData}){
    const [clubData1, setClubData1] = useState({});
    const [clubData2, setClubData2] = useState({});
    const [isTicketAvaliable, setTicketAvailable] = useState(false);
    const [ticketData, setTicketData] = useState({});
    const { addToast } = useToasts();
    const router = useHistory();

    const buyTicket = (matchId)=> {
        addToast('Input Unit and Click Book Now', { appearance: 'success', autoDismiss : true,});
        router.push("/buyticket/"+matchId)
    }

    const ticketNotAvailable = ()=> {
        addToast('Ticket Not Available', { appearance: 'error', autoDismiss : true});
    }
   
    



    return (
    <div className="mx-2">
    <div className="card">
        <div className="card-body p-4">
        <div className="d-flex justify-content-between">
        <img src={matchData?.logo1} width="60" height="60" alt="name" />
            <div className="d-flex flex-column justify-content-center">
                <h6>{matchData?.day}</h6>
                <h6>{matchData?.time}</h6>
            </div>
            <img src={matchData?.logo2} width="60" height="60" alt="name" />
        </div>
        </div>
{ 
    matchData?.hasticket ?    <div className="card-footer appColor text-white" onClick={()=>buyTicket(matchData?.match_id)}>
           <h6 className="text-center">Book Ticket</h6>
        </div> :  <div className="card-footer appColor text-white" onClick={ticketNotAvailable}>
           <h6 className="text-center">Not Available Yet</h6>
        </div>

}
    
    </div>
    </div>
    )
}