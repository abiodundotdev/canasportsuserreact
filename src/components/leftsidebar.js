import {FaTable} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'
import {BsCardList} from 'react-icons/bs'
import {ImProfile} from 'react-icons/im'
import {GiTicket} from 'react-icons/gi'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'

export default function LeftSideBar(){
    const router = useHistory();
    const logmeout = () => {
        localStorage.removeItem("userAuth");
        router.push("/");
    }
    return (
<aside class="left-sidebar" data-sidebarbg="skin6">
            <div class="scroll-sidebar">
              
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">

                        <li class="sidebar-item pt-2">
                         <Link to="/dashboard">   <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                aria-expanded="false">
                                <i><MdDashboard size="20"/></i>
                                <span class="hide-menu">Dashboard</span>
                            </a>
                            </Link>
                        </li>

                        <li class="sidebar-item">
                        <Link to="/profile"> <a class="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                <i><ImProfile size="20"/> </i>
                                <span class="hide-menu">Profile</span>
                            </a>
                        </Link>
                        </li>

                        <li class="sidebar-item">
                        <Link to="/transactions"> <a class="sidebar-link waves-effect waves-dark sidebar-link"
                                aria-expanded="false">
                                <i><BsCardList size="20" /></i>
                                <span class="hide-menu">Transactions</span>
                            </a>
                        </Link>
                        </li>

                    <li class="sidebar-item">
                        <Link to="/tickets"><a class="sidebar-link waves-effect waves-dark sidebar-link" 
                                aria-expanded="false">
                                <i> <GiTicket size="20"/></i>
                                <span class="hide-menu">Tickets</span>
                            </a>
                        </Link>
                        </li>

                        <li class="sidebar-item">
                        <Link onClick={logmeout}><a class="sidebar-link waves-effect waves-dark sidebar-link" 
                                aria-expanded="false">
                                <i> <AiOutlineLogout size="20"/></i>
                                <span class="hide-menu">LogOut</span>
                            </a>
                        </Link>
                        </li>
                       
                        <li class="text-center p-20 upgrade-btn">
                            
                        </li>
                    </ul>

                </nav>
               
            </div>
        </aside>
        
    )
}