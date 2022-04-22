import React,{ useState } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

toast.configure()

function LoginComp (){
    const [user, setUserState] = useState({email:'',password:''});
    const [showPassword,setShowPassword] =useState(false);
    const [loading,setloading] =useState(false);
    const [showProfile,setShowProfile] =useState(localStorage.getItem('blogUser')?true:false);
    const [userProfile, setUserProfile] = useState(showProfile?JSON.parse(localStorage.getItem('blogUser')):'');
    const [isVerified,setIsVerified] =useState(false);
    const history = useHistory();
    const login = () =>
    {
        // ${process.env.React_App_Api_Url}
        // ${process.env.React_App_Api_Url}
        setloading(true);
        if(isVerified)
        {
            Axios.post(`${process.env.React_App_Api_Url}/api/user/login`,{email:user.email,password:user.password}).then(res=>{
                localStorage.setItem("blogUserToken",res.data.token);
                localStorage.setItem("blogUser",JSON.stringify(res.data.user));
                if(res.data.user.role==="admin")
                {
                    history.replace("/verifyblogs");
                    window.location.reload();
                    setloading(false);
                }
                else{
                    history.replace("/");
                    window.location.reload();
                    setloading(false);
                }
                setShowProfile(true);
                setUserProfile(res.data.user);
                setUserState({email:'',password:''});
            }).catch(err=>{
                if(err.response.data.message == 'Auth failed,email not found' || err.response.data.message == 'Auth failed,password mismatched.' )
                {
                    toast.error('Username or password incorrect.');
                    setloading(false);    
                }
                else{
                    toast.error(`${err.response.data.message}`);
                    setloading(false);
                }
            })
        }
        else
        {
            toast.error('Please verify that you are human.');
            setloading(false);
        }
    }
    const UpdateProfile = (e,id) =>
    {
        e.preventDefault();
        // http://172.16.17.149:3001
        setloading(true);
        Axios.put(`${process.env.React_App_Api_Url}/api/user/${id}`,
        {
            firstName:userProfile.firstName,
            lastName:userProfile.lastName,
            mobile:userProfile.mobile,
            email:userProfile.email,
            role:'customer',
            id:userProfile.id}).then(res=>{
            //localStorage.setItem("blogUserToken",res.data.token);
            localStorage.setItem("blogUser",JSON.stringify(res.data.user));
            window.location.reload();
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error(`${err.response.data.message}`);
        })

    }
    function componentDidMount(e) {
        e.preventDefault();
    //    ${process.env.React_App_Api_Url}
        login();
    }
    function updateUser(e) {
        e.preventDefault();
        UpdateProfile(e,userProfile.id);
    }
    function onChange(e)
    {
        const newUser = {...user};
        if(e.target.id=='email')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id=='password')
        {
            newUser[e.target.id] = e.target.value
        }
        setUserState(newUser);
    }
    function onUpdateUser(e)
    {
        const newUserProfile = {...userProfile};
        newUserProfile[e.target.id] = e.target.value
        setUserProfile(newUserProfile);
        console.log(setUserProfile);
    }
    function onChangeCaptcha(value)
    {
        if(value)
        {
            setIsVerified(true);
        }
    }
    return (
        <div>
       {loading?<div class="loading"></div>:''} 
        { showProfile  
            ? 
            <>
            {/*<div className="page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <ul className="page-header-breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>Edit Profile</li>
                        </ul>
                        <h1>User Profile</h1>
                    </div>
                </div>
            </div>
        </div>*/}
    
            <div className="section">
        <div className="container">
            <div className="row">
            <div className="col-md-6">
            <div className="section-row" style={{"marginTop":"0%"}}>
                <h3 >Login</h3>
                <img src="./img/about-1.jpg" style={{"width":"100%"}}/>
                </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>User Profile</h3>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>First Name</span>
                                        <input className="input" type="text" name="subject" id="firstName"  value={userProfile.firstName} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Last Name</span>
                                        <input className="input" type="text" name="subject" id="lastName"  value={userProfile.lastName} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" type="email" name="email" id="email" value={userProfile.email} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Mobile</span>
                                        <input className="input" type="number" name="email" id="mobile" value={userProfile.mobile} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                  <Link to="/resetpassword" style={{"fontWeight":"normal"}}><p>Want To  Reset Password</p></Link>
                                </div>
                                </div>
                                <div className="col-md-12">
                                    <button onClick={e=>{updateUser(e)}} className="primary-button">Update</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
            : 
            <>
            {/*<div className="page-header" >
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <ul className="page-header-breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>Login</li>
                        </ul>
                        <h1>Login</h1>
                    </div>
                </div>
            </div>
        </div>*/}
            <div className="section" >
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row" style={{"marginTop":"0%"}}>
                        <h3 >Login</h3>
                        <img src="./img/about-1.jpg" style={{"width":"100%"}}/>
                        </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>Login Information</h3>
                            <div className="row">
                            <form onSubmit={componentDidMount}>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" type="email" name="email" id="email" onChange={onChange} required
                                        pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Password</span>
                                        <input className="input" type={showPassword?"text":"password"} name="subject" id="password" onChange={onChange} required/>
                                        {!showPassword?(<i className="fa fa-eye-slash mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>):
                (<i className="fa fa-eye mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>)}
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <ReCAPTCHA
                                        sitekey="6Ldxf4geAAAAACcrnyAo-9k8hlD-BTE6ZSrQAD5t"
                                        onChange={onChangeCaptcha}
                                        size="normal"
                                        data-theme="dark"            
                                        render="explicit"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="primary-button">Sign In</button>
                                </div>
                                </form>
                                <div className="col-md-12" style={{"marginTop":"3%"}}>
                                <p>Dont have an account? <Link to="/signup">Sign Up</Link></p>
                                </div>
                                <div className="col-md-12">
                                <p><Link to="/forgetpassword">Forget Password</Link></p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}
        </div>
    )
}

export default LoginComp
