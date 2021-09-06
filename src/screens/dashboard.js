import DashLayout from "../components/layout";
import MatchCard from "../components/minicomponents/matchcard";
import {MdAccountBalanceWallet} from 'react-icons/md'
import {BsEyeSlashFill} from 'react-icons/bs'
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import User from "../services/User";
import { usePaystackPayment } from 'react-paystack';
import Modal from 'react-modal';
import moment from 'moment'
import { currentUser } from "../services/appmethods";
export default function Dashboard(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = useState(false);
    const [fetchedData, setFetchedData]= useState({});
    const [amountToPay, setAmountToPay] = useState(0);
    const [matches, setMatches] = useState([])
    const [transactions, setTransactions] = useState([])
    const [userEmailS, setUserEmailS] = useState("")
    const [name, setName] = useState("")


    const config = {
        reference: (new Date()).getTime(),
        email: userEmailS,
        amount: amountToPay * 100,
        publicKey: 'pk_live_fac0f027efd7002eee03dfaead07984e0df40b70',
    };

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
      };
    
      // you can call this function anything
      const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
      }

      const PaystackHookExample = () => {
        const initializePayment = usePaystackPayment(config);
        return (
          <div>
            <button className="btn btn-success"  onClick={() => {
                  initializePayment(onSuccess, onClose)
              }}> Pay <NumberFormat value={amountToPay} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
               </button>
          </div>
        );
    };
   
    const customStyles = {
        content : {
          top                   : '50%',
          width                 : '500px',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }
  
   useEffect(()=>{
        const user = currentUser()
        const UserEmail  = JSON.parse(user).user.email;
        setUserEmailS(UserEmail)
        setName(JSON.parse(user).user.name)

        console.log(UserEmail);
        User.getServerData("/getactiveuser/"+UserEmail).then((response)=>{
            setFetchedData(response.data.user);
        }).catch(()=>{
            console.log("Api Errorrr");
        });

        User.getServerData("/getallmatch").then((response)=>{
            setMatches(response.data);
        }).catch(()=>{
            console.log("Api Errorrr");
        })

        User.getServerData("/getusertransactions/"+UserEmail).then((response)=>{
            setTransactions(response.data);
        }).catch(()=>{
            console.log("Api Errorrr");
        })

    },[])
    return (
      <DashLayout title="Dashboard">
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={openModal}><MdAccountBalanceWallet />  Fund Wallet</button>
                 {
                    //<button className="btn btn-info"><BsEyeSlashFill />  Hide Balance</button>
                 }
            </div>
        <br />

        <h6>Welcome Back {name} !!</h6>
        <br />
             <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-12">
                        
                        <div className="card white-box analytics-info">
                            <h3 className="box-title">Wallet Balance</h3>
                            <ul className="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div id="sparklinedash"><canvas width="67" height="30"
                                            style={{display: 'inlineBlock', width: '67px', height: '30px', verticalAlign: 'top'}}></canvas>
                                    </div>
                                </li>
                                <li className="ms-auto"><span className="counter text-success"><NumberFormat value={fetchedData?.wallet_balance} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></span></li>
                                
                            </ul>
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="card white-box analytics-info">
                            <h3 className="box-title">Total Tickets</h3>
                            <ul className="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div id="sparklinedash2"><canvas width="67" height="30"
                                            style={{display: 'inlineBlock', width: '67px', height: '30px', verticalAlign: 'top'}}></canvas>
                                    </div>
                                </li>
                                <li className="ms-auto"><span className="counter text-purple">{matches?.length}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="card white-box analytics-info">
                            <h3 className="box-title">Upcoming Matches</h3>
                            <ul className="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div id="sparklinedash3"><canvas width="67" height="30"
                                            style={{display: 'inlineBlock', width: '67px', height: '30px', verticalAlign: 'top'}}></canvas>
                                    </div>
                                </li>
                                <li className="ms-auto"><span className="counter text-info">{matches?.length}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 class="box-title mb-3">Upcoming Matches</h6>
                    <div className="table-responsive">
                        <div className="d-lg-flex justify-content-between">
                                    
                                {matches?.map( (eachmatch) => {
                                    return <MatchCard matchData={eachmatch}/>
                                } ) }  

                        </div>
                    </div>
                </div>


        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
        <div className="card">
            <div className="card-header">
                <h6 className="card-title">Fund Wallet</h6>
            </div>


        <div className="card-body">
            <div className="form-group mb-4">
                <label className="col-md-12 p-0">Amount</label>
                <div className="col-md-12 border-bottom p-0">
                    <input type="number" onInput={(e)=>setAmountToPay(e.target.value)} value={amountToPay} className="form-control p-0 border-0" />
                </div>
            </div>    

            <div className="form-group mb-4">
                <div className="col-sm-12">
                    <PaystackHookExample />
                </div>
            </div> 

        </div>

        </div>


        </Modal>

<br />
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                        <div class="white-box">
                            <div class="d-md-flex mb-3">
                                <h3 class="box-title mb-0">Recent Transactions</h3>
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
               

            </div>

      </DashLayout>
    )
}