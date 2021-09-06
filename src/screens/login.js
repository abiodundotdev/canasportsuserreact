import { useEffect, useState } from "react"
import User from "../services/User"
import {useToasts } from 'react-toast-notifications';
import { Link, useHistory } from "react-router-dom";


export default function Login(){
    let history  = useHistory();
    const { addToast } = useToasts();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setDisabled] = useState(true)
    const [btnMessage, setBtnMessage] = useState("Login");
    useEffect(
        () => {
            if(email === "" || password === ""){
                    setDisabled(true);
            }else{
                setDisabled(false);
            }
        },[email, password]
    )

    useEffect(
        () => {
           document.title = "CanaSports User Login";
        },[]
    )
    
    const values = {
        email : email,
        password : password,
        device_name : "Server"
    }

    const handleSubmit = () => {
        const spinner  = "Logging Please Wait ...";
        setBtnMessage(spinner);
        setDisabled(true);
        User.login(values)
        .then( (res) => {
            addToast('Welcome Back '+res.data.user.name + "", { appearance: 'success', autoDismiss : true });
             localStorage.setItem("userAuth", JSON.stringify(res.data));
             localStorage.setItem("token", JSON.stringify(res.data.token).split("|")[1]);
             localStorage.setItem("isLoggedIn", true);
             history.push("/dashboard");
             setBtnMessage("Login");
             
          } )
        .catch( (errdata) =>  {
        setDisabled(false);
            addToast('Invalid Username or Password', { appearance: 'error', autoDismiss : true });
            setBtnMessage("Login");
          })
     
  }   
     

    return (
<body className="appColor2" style={{minHeight: '100vh'}}>
   
    <div className="row clearfix contanier-fluid d-flex align-items-center p-5">  
        <div className="col-lg-4 m-auto">
            <div className="d-flex justify-content-center">
            <img src="/images/onlyname.png" style={{width : '150px', height: '80px'}} alt="homepage" className="my-2" />
            </div>

                 <div className="card">
                            <div className="card-body">
                                    <div className="form-group mb-4">
                                        <label for="example-email" className="col-md-12 p-0">Email</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="email" onInput={(e)=>setEmail(e.target.value)} value={email}  placeholder="Email Address"
                                                className="form-control p-0 border-1" name="email" id="example-email" />
                                        </div>
                                    </div>



                                    <div className="form-group m2-4">
                                        <label className="col-md-12 p-0">Password</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input placeholder="Password" name="password" type="password" onInput={(e)=>setPassword(e.target.value)} value={password} className="form-control p-0 border-1" />
                                        </div>
                                    </div>    

                            <div className="d-flex justify-content-center col-12">      
                            <div className="w-100 p-3"><button className="btn btn-success w-100" onClick={handleSubmit} disabled={isDisabled}>{btnMessage}</button></div>      
                            </div>
                           
                        </div>

                </div>
            </div>

    <h6 className="text-center">New to CanaSportsNg ?? <Link className="text-secondary" to="/signup">Sign up</Link> </h6>
    <h6 className="text-center"><Link className="text-secondary" to="/forgetpassword">Forget Password ??</Link> </h6>
  
</div>
</body> 
    )
}
