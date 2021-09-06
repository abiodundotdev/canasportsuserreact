import { FaSearch } from "react-icons/fa";
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "../services/User";
import NumberFormat from 'react-number-format';
import { MdNotifications } from "react-icons/md";


export default function NavBar(){
    const [fetchedData, setFetchedData] = useState({})
    useEffect(
        ()=> {
            const user = localStorage?.getItem("userAuth");
            const UserEmail  = JSON.parse(user).user.email;
    
            console.log(UserEmail);
            User.getServerData("/getactiveuser/"+UserEmail).then((response)=>{
                setFetchedData(response.data.user);
            }).catch(()=>{
                console.log("Api Errorrr");
            });
        },[])
    return (
        <header className="topbar" data-navbarbg="skin5">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark navbar-fixed-top">
            <div className="navbar-header" data-logobg="skin6">
               <Link to="/dashboard"><a className="navbar-brand">
                    <div className="d-flex justify-content-between">
                        <img src="/images/onlylogo.png" width="50" height="50" alt="homepage" />
                        <img src="/images/onlyname.png" width="120" height="50" alt="homepage" />
                    </div>
                    </a>
                </Link>

                 <a className="nav-toggler waves-effect waves-light text-dark d-block d-md-none"
                   ><i><AiOutlineMenuUnfold /></i></a>
            </div>
           <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
               
                <ul className="navbar-nav ms-auto d-flex align-items-center">

                    <li className="px-4 d-flex">
                      <h5 className="text-white p-2" style={{fontFamily : 'roboto-mono'}}>Balance: <NumberFormat value={fetchedData?.wallet_balance} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></h5>
                      <h5 className="text-white p-2"><MdNotifications /> <span className="badge badge-primary">0</span> </h5>
                    </li>
                   
                   </ul>
            </div>
        </nav>
    </header>
    )
}