import { useEffect, useState } from "react"
import User from "../services/User"
import {useToasts } from 'react-toast-notifications';
import { Link, useHistory } from "react-router-dom";


export default function ForgetPassword(){
    let history  = useHistory();
    const { addToast } = useToasts();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setDisabled] = useState(true)
    useEffect(
        () => {
            if(email === ""){
                    setDisabled(true);
            }else{
                setDisabled(false);
            }
        },[email, password]
    )
    
    const values = {
        email : email,
        password : password,
        device_name : "Server"
    }

    const handleSubmit = () => {
        User.login(values)
        .then( (res) => {
            addToast('Welcome Back '+res.data.user.name + "", { appearance: 'success', autoDismiss : true });
             localStorage.setItem("userAuth", JSON.stringify(res.data));
             localStorage.setItem("token", JSON.stringify(res.data.token).split("|")[1]);
             localStorage.setItem("isLoggedIn", true);
             history.push("/dashboard");
             
          } )
        .catch( (errdata) =>  {
        if(errdata.response.status === 422){
            addToast('Invalid Username or Password', { appearance: 'error' });
          }
       
          alert(errdata)
          })
     
  }   

      

    return (
<body className="appColor2" style={{minHeight: '100vh'}}>
    <div className="row mt-20">
        <div className="col-lg-4"></div>
    <div className="col-lg-4 m-2">
            <div className="row clearfix contanier-fluid d-flex align-items-center">  
    
            <div className="d-flex justify-content-center">
            <img src="/images/onlyname.png" style={{width : '150px', height: '80px'}} alt="homepage" className="my-2" />
            </div>

                 <div className="card">
                            <div className="card-body">
                                <h6 className="text-center">Request Password Reset</h6>
                                   
                                    <div className="form-group mb-4">
                                        <label for="example-email" className="col-md-12 p-0">Email</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="email" onInput={(e)=>setEmail(e.target.value)} value={email}  placeholder="Email Address"
                                                className="form-control p-0 border-2" name="example-email" id="example-email" />
                                        </div>
                                    </div>

                            <div className="d-flex justify-content-center col-12">      
                            <div className="w-100 p-3"><button className="btn btn-success w-100" onClick={handleSubmit} disabled={isDisabled}>Request Password</button></div>      
                            </div>
                           
                        </div>

                </div>
            </div>

    <h6 className="text-center">Remember Password ?? <Link className="text-secondary" to="/">Sign In</Link> </h6>
        
    </div>
    <div className="col-lg-4"></div>
</div>
</body> 
    )
}
