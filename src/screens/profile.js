import { useEffect, useState } from "react";
import DashLayout from "../components/layout"
import { currentUser } from "../services/appmethods";
import User from "../services/User";
export default function Profile(){
    const [user, setUser] = useState({})
    useEffect(()=>{
        const user = currentUser()
        const UserEmail  = JSON.parse(user).user.email;

        console.log(UserEmail);
        User.getServerData("/getactiveuser/"+UserEmail).then((response)=>{
            setUser(response.data.user);
        }).catch(()=>{
            console.log("Api Errorrr");
        });
    })

    return (
<DashLayout title="Profile">   
    <div className="container-fluid">
        <div className="row">
                    <div className="col-lg-5 col-xlg-5 col-md-12">
                        <div className="white-box">
                            <div className="user-bg"> <img width="100%" alt="user" src="plugins/images/large/img1.jpg" />
                                <div className="overlay-box">
                                    <div className="user-content">
                                        <a href="javascript:void(0)"><img src="plugins/images/users/genu.jpg"
                                                className="thumb-lg img-circle" alt="img" /></a>
                                        <h4 className="text-white mt-2">{user?.name}</h4>
                                        <h5 className="text-white mt-2">{user?.email}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="user-btm-box mt-5 d-md-flex">
                                {"+234 " + user?.phone}
                            </div>
                        </div>

                      
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Change Password</h6>
                            </div>
                            <div className="card-body">
                                <div className="form-horizontal form-material">
                                    <div className="form-group mb-4">
                                        <label className="col-md-12 p-0">Old Password</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="text" placeholder="Old Password"
                                                className="form-control p-0 border-0" /> </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label for="example-email" className="col-md-12 p-0">New Password</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="email" placeholder="New Password"
                                                className="form-control p-0 border-0" name="example-email"
                                                id="example-email" />
                                        </div>
                                    </div>
                                  
                                    <div className="form-group mb-4">
                                        <label className="col-md-12 p-0">Confirm Password</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="text" placeholder="Confirm Password"
                                                className="form-control p-0 border-0" />
                                        </div>
                                    </div>
                                   
                                    <div className="form-group mb-4">
                                        <div className="col-sm-12">
                                            <button className="btn btn-success">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                    </div>


                    </div>
                 
                    <div className="col-lg-7 col-xlg-7 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-horizontal form-material">
                                    <div className="form-group mb-4">
                                        <label className="col-md-12 p-0">Full Name</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="text" placeholder="Full Name" value={user?.name}
                                                className="form-control p-0 border-0" disabled/> </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label for="example-email" className="col-md-12 p-0">Email</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="email" placeholder="email"
                                                className="form-control p-0 border-0" value={user?.email} name="example-email"
                                                id="example-email" disabled/>
                                        </div>
                                    </div>
                                  
                                    <div className="form-group mb-4">
                                        <label className="col-md-12 p-0">Phone No</label>
                                        <div className="col-md-12 border-bottom p-0">
                                            <input type="text" placeholder="123 456 7890" value={user?.phone}
                                                className="form-control p-0 border-0" />
                                        </div>
                                    </div>
                                   
                                    <div className="form-group mb-4">
                                        <div className="col-sm-12">
                                            <button className="btn btn-success">Update Profile</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        </div>
      </DashLayout>
    )
}