import { useEffect, useState } from "react"
import User from "../services/User"
import {useToasts } from 'react-toast-notifications';
import { Link, useHistory } from "react-router-dom";


export default function SignUpAccount(){
    let history  = useHistory();
    const { addToast } = useToasts();
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setDisabled] = useState(true)
    const [btnMessage, setBtnMessage] = useState("Register");
    useEffect(
        () => {
            if(email === "" || password === "" || name === "" || phoneNumber === ""){
                    setDisabled(true);
            }else{
                setDisabled(false);
            }
        },[email, password, name, phoneNumber]
    )

    useEffect(
        () => {
           document.title = "CanaSports User Register";
        },[]
    )
    
    const values = {
        email : email,
        password : password,
        name : name,
        phone_number: phoneNumber,
        platform: "web"
    }

    const handleSubmit = () => {
        const spinner  = "Creating Account Please Wait ...";
        setBtnMessage(spinner);
        setDisabled(true)
        User.register(values)
        .then( (res) => {
            addToast('Account Created Successfully', { appearance: 'success', autoDismiss : true });
            history.push("/"); 
            setBtnMessage("Register");
          } )
        .catch( (error) => { 
            setDisabled(false)
            setBtnMessage("Register");
            addToast(String(error.response.data.errors.email[0]), { appearance: 'error', autoDismiss : true });
        }
          )
     
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
                                        <label for="example-email" className="col-md-12 p-0">Full Name</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="text" onInput={(e)=>setName(e.target.value)} value={name}  placeholder="Full Name"
                                                className="form-control p-0 border-1" name="fullname" id="fname" />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group mb-4">
                                        <label for="example-email" className="col-md-12 p-0">Email</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="email" onInput={(e)=>setEmail(e.target.value)} value={email}  placeholder="Email Address"
                                                className="form-control p-0 border-1" name="email" id="email" />
                                        </div>
                                    </div>


                                    <div className="form-group mb-4">
                                        <label for="example-email" className="col-md-12 p-0">Phone Number</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="number" onInput={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}  placeholder="Phone Number"
                                                className="form-control p-0 border-1" name="phonenumber" id="example" />
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

      <h6 className="text-center">Already have an Account ?? <Link to="/" className="text-secondary">Login</Link> </h6>
        
    </div>
</body> 
    )
}
