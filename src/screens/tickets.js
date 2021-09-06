import { useEffect, useState } from "react"
import DashLayout from "../components/layout"
import User from "../services/User"
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { Link } from "react-router-dom";

export default function Tickets(){
    const [tickets, setTickets] = useState([])
    const [userEmailS, setUserEmailS] = useState("")
  
    useEffect(
        ()=>{
        const user = localStorage?.getItem("userAuth");
        const UserEmail  = JSON.parse(user).user.email;
        setUserEmailS(UserEmail)
            User.getServerData("/getuserticketslist/"+UserEmail).then((response)=>{
                setTickets(response.data);
            }).catch(()=>{
                console.log("Api Errorrr");
            })
        },[]
    )
    return (
      <DashLayout title="User Tickets">
        <div className="container-fluid">
         
       { 
      tickets.length == 0 ?  <h6 className="text-center">No Tickets Found</h6> : <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                        <div class="white-box">
                            <div class="d-md-flex mb-3">
                                <h4 class="box-title mb-0 text-primary">Tickets History</h4>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">Ticket Id</th>
                                            <th class="border-top-0">Unit(s)</th>
                                            <th class="border-top-0">Match Id</th>
                                            <th class="border-top-0">Amount Paid</th>
                                            <th class="border-top-0">Time Booked</th>
                                            <th class="border-top-0">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                      
                                  {
                                      tickets.map(
                                          (eachticket)=> {
                                              return (
                                            <tr>
                                                <td class="txt-oflo"><Link to={"/viewticket/"+eachticket?.ticket_id}>{eachticket?.ticket_id}</Link></td>
                                                <td>{eachticket?.units}</td>
                                                <td>{eachticket?.match_id}</td>
                                                <td class="txt-oflo"><NumberFormat value={eachticket?.total_amount_paid} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></td>
                                                <td><span class="text-info">{moment(eachticket?.created_at).format('LLL')}</span></td>
                                                <td>{eachticket?.authorized === 1 ? <span className="label label-success">Authorized</span> :  <span className="label label-danger">Pending</span> }</td>
                                            </tr>
                                              )
                                          }
                                      )
                                  }      
                                       
                                      

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
    }
        </div>
      </DashLayout>
    )
}