import NavBar from './navbar'
import LeftSideBar from './leftsidebar';
import React, { useEffect, useState } from 'react'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import User from '../services/User';
import { useHistory } from 'react-router';
function DashLayout({children, title}){
    const [pageReady, setPageRady] = useState(false);
    const router =  useHistory();
  
useEffect(
    ()=>{
        nprogress.start()
        setPageRady(true)
        document.title = "CanaSports User's " +title;
        const user = localStorage.getItem("userAuth");
        const UserEmail  = JSON.parse(user).user.email;
        User.getServerData("/getactiveuser/"+UserEmail).then((response)=>{
           console.log("done");
        }).catch(()=>{
            router.push("/")
        });

    },[])

useEffect(
    () =>{
     nprogress.done()
    },[pageReady]
    )

    

    return (
   <> 
     <body>

<div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">    
            <NavBar />
            <LeftSideBar />
           
            <div className="page-wrapper">

            <div className="page-breadcrumb bg-white">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 className="page-title">{title}</h4>
                    </div>
                    <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                        <div className="d-md-flex">
                            <ol className="breadcrumb ms-auto">
                                <li><a href="#" className="fw-normal">{title}</a></li>
                            </ol>

                        </div>
                    </div>
                </div>
            </div>

            {children}
            
           
            </div>
</div>
       </body>
</>
    );
}

export default DashLayout