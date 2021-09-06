import { useEffect, useState } from "react"
import DashLayout from "../components/layout"
import User from "../services/User"
import NumberFormat from 'react-number-format';
import moment from 'moment'

export default function Transactions(){
    const [transactions, setTransactions] = useState([])
    const [userEmailS, setUserEmailS] = useState("")
  
    useEffect(
        ()=>{
        const user = localStorage?.getItem("userAuth");
        const UserEmail  = JSON.parse(user).user.email;
        setUserEmailS(UserEmail)
            User.getServerData("/getusertransactions/"+UserEmail).then((response)=>{
                setTransactions(response.data);
            }).catch(()=>{
                console.log("Api Errorrr");
            })
        },[]
    )
    return (
      <DashLayout title="Transactions">
        <div className="container-fluid">
         
       { 
      transactions.length == 0 ?  <h6 className="text-center">No transactions Found</h6> : <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                        <div class="white-box">
                            <div class="d-md-flex mb-3">
                                <h4 class="box-title mb-0">Transactions History</h4>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">Transaction Id</th>
                                            <th class="border-top-0">Type</th>
                                            <th class="border-top-0">Status</th>
                                            <th class="border-top-0">Amount</th>
                                            <th class="border-top-0">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                      
                                  {
                                      transactions.map(
                                          (eachTrans)=> {
                                              return (
                                                <tr>
                                                <td class="txt-oflo">{eachTrans?.transactionid}</td>
                                                <td>{eachTrans?.type === "add" ? "Fund Wallet" :  "Bought Ticket" }</td>
                                                <td>{eachTrans?.status == 1 ? <span className="label label-success">Successfull</span> :  <span className="tag tag-danger">Failed</span> }</td>
                                                <td class="txt-oflo"><NumberFormat value={eachTrans?.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></td>
                                                <td><span class="text-info">{moment(eachTrans?.created_at).format('LLL')}</span></td>
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