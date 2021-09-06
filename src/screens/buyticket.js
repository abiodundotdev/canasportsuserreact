import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router"
import DashLayout from "../components/layout"
import User from "../services/User";
import {useToasts } from 'react-toast-notifications';
import NumberFormat from "react-number-format";
import { GiTicket } from "react-icons/gi";
import swal from 'sweetalert';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { CLUB_LOGO_URL } from "../includes/constants";
export default function BuyTicket(){

    const {matchId} = useParams();
    const router = useHistory();
    const [notFound, setFound] = useState(false)
    const { addToast } = useToasts();
    const [ticketD, setTicketD] = useState({});
    const [matchData, setMatchData] =useState({})
    const [unit, setUnit] = useState(1);
    const [clubData1, setClubData1] = useState({});
    const [clubData2, setClubData2] = useState({});
    const [email, setEmail] = useState("");
    const ticketId = "CTW"+Date.now()+String(Math.floor(Math.random() * 9999)); 

    const  mapData = {
        "units": unit,
        "total_amount_paid": unit * ticketD?.price,
        "ticket_price": ticketD?.price,
        "status": 1,
        "authorized": 0,
        "match_id": matchId,
        "user": email,
        "ticket_id": ticketId
      };

      const confirmBooking  = ()=> {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want Book this Ticket",
            icon: "warning",
            dangerMode: true,
          })
          .then(willBook => {
            if (willBook) {
              bookTicket()
            }
          });
      }

      const bookTicket = ()=> {
            nprogress.start()
            User.saveDataToServer(mapData,"/bookticket").then(
                (response)=>{
                    nprogress.done()
                    if(response.data.success ===  true){
                        addToast('Ticket Booked Successfully', { appearance: 'success', autoDismiss : true});
                        router.push("/viewticket/"+ticketId);
                    }else{
                        addToast(String(response.data.message), { appearance: 'error', autoDismiss : true});  
                    }
                }
            ).catch(
                (error)=> {
                    nprogress.done()
                }
            )
      }
  
    useEffect(
        ()=>{
            const user = localStorage?.getItem("userAuth");
            const UserEmail  = JSON.parse(user).user.email;
            setEmail(UserEmail);
            User.getServerData("/getamatchapp/"+matchId).then(
                (response)=> {
                    setMatchData(response.data);
                }).catch(
                (error)=> {
                    console.log("Error");
                })

            User.getServerData("/getticketapp/"+matchId).then(
                (response)=>{
                        setFound(true)
                        setTicketD(response.data);
                }
            ).catch(
                (error)=>{
                    addToast('Ticket Not Available For The Selected Match Check Back Later', { appearance: 'error', autoDismiss : true});
                    router.push("/dashboard")
                    console.log(error);
                }
            )
        },[])

    return (
      <DashLayout title="Book Ticket">
        <div className="container-fluid">
        <div className="card" style={{margin  : '10px auto auto 0'}}>
            <div className="card-body">
                <div className="d-flex justify-content-between">   
                    <div className="col">
                        <img src={matchData?.logo1} width="60" height="60" alt="name" />
                        <h6>{matchData?.teama}</h6>
                    </div>

                    <h2>
                            <span>{matchData?.day}</span>
                            <br />
                            <span className="text-center m-5">{matchData?.time}</span>
                    </h2>

                    <div className="col">
                            <img src={matchData?.logo2} width="60" height="60" alt="name" />
                            <h6>{matchData?.teamb}</h6>
                    </div>

                </div>

            </div>
            </div>
            
            <div className="card" style={{margin  : '10px auto auto 0'}}>
                    <div className="card-body">
                    <table class="table table-striped">
                    <tbody>
                        <tr>
                        <td>Price</td>
                        <td><NumberFormat value={ticketD?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></td>
                        </tr>

                        <tr>
                        <td>Charges</td>
                        <td>0.0</td>
                        </tr>

                        <tr>
                        <td>Unit</td>
                        <td><input type="number" class="form-control" value={unit}  onInput={ (e)=>setUnit(e.target.value) } /></td>
                        </tr>

                        <tr>
                        <td>Total</td>
                        <td><NumberFormat value={ticketD?.price * unit} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></td>
                        </tr>
                    </tbody>
                    </table>
            <div>
                    <button onClick={confirmBooking} className="btn btn-success appColor">
                            <i><GiTicket size="20"/></i>  BOOK NOW
                    </button>
            </div>
                    </div>
                
            </div>

        </div>
      </DashLayout>
    )
}