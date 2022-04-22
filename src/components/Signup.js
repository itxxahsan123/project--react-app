import React, {useState} from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

toast.configure()
function SignupComp(e) {
    const [user, setUserState] = useState({firstName:'',email:'',lastName:'',mobile:'',password:'',role:'customer',userPrivilegeId:2,confirmpassword:''});
    const [loading,setloading] =useState(false);
    const [isVerified,setIsVerified] =useState(false);
    const [showPassword,setShowPassword] =useState(false);
    const [message, setMessage] = useState({whiteSpace:false,specialCharacter:false,numberPresent:false,
    lengthGreaterthen8:false,UpperCase:false});
    const history = useHistory();
    function componentDidMount(e) {
        e.preventDefault();
        setloading(true);
     if(validateEmail(user.email))
     {
        if(isVerified)
        {
            if(message.whiteSpace === true && message.specialCharacter === true && message.numberPresent === true
                && message.lengthGreaterthen8 === true && message.UpperCase === true)
             {
                if(user.mobile.length>8)
                {
                    if(user.password.length>8)
                    {
                        if(user.password  === user.confirmpassword)
                        {
                            Axios.post(`${process.env.React_App_Api_Url}/api/user/signup`,{user}).then(res=>{
                                toast.success('An email has been sent to your account. Please verify it for login.');
                                setloading(false);
                                history.replace("/verificationpage");
                            }).catch(err=>{
                                toast.error(`${err.response.data.message}`);
                                setloading(false);
                            })
                        }
                        else{
                            toast.error('Password and Confirm Password mismatch.');
                            setloading(false);
                        }
                    }
                    else{
                        toast.error('Password length should be greater than 8.');
                        setloading(false);
                    }
                }
                else{
                    toast.error('Mobile number not valid.');
                    setloading(false);
                }
             }
             else
             {
                toast.error('Password not valid.');
                setloading(false);
             }
        }
        else
        {
            toast.error('Please verify that you are human.');
            setloading(false);
        }
     }
     else{
            toast.error('Email format not correct.');
            setloading(false);
        }
    }
    function onChange(e)
    {
        const newUser = {...user};
        if(e.target.id==='firstName')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='lastName')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='email')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='mobile')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='password')
        {
            newUser[e.target.id] = e.target.value
            checkWhiteSpace(e.target.value)
            checkNumber(e.target.value)
            checkUpperCase(e.target.value)
            checkSymbol(e.target.value)
            checkLength(e.target.value)
        }
        if(e.target.id==='confirmpassword')
        {
            newUser[e.target.id] = e.target.value
        }
        setUserState(newUser);

    }
    function onChangeCaptcha(value)
    {
        if(value)
        {
            setIsVerified(true);
        }
    }
    function validatePassword(password) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
        return re.test(password);
    }
    function checkWhiteSpace(value)
    {
        let newUser = message;
        const isNonWhiteSpace = /^\S*$/;
        if (isNonWhiteSpace.test(value)) {
            newUser.whiteSpace=true
          //return "Password must not contain Whitespaces.";
        }
        else
        {
            newUser.whiteSpace=false
        }
        setMessage(newUser);
    }
    function checkNumber(value)
    {
        let newUser = message;
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (isContainsNumber.test(value)) {
            newUser.numberPresent=true
           //          return "Password must contain at least one Digit.";
        }
        else
        {
            newUser.numberPresent=false
        }
        setMessage(newUser);
    }
    function checkUpperCase(value)
    {
        const newUser = message;
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (isContainsUppercase.test(value)) {
            newUser.UpperCase=true
//          return "Password must have at least one Uppercase Character.";
        }
        else
        {
            newUser.UpperCase=false
        }
        setMessage(newUser);
    }
    function checkSymbol(value)
    {
        const newUser = message;
        const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
      if (isContainsSymbol.test(value)) {
        newUser.specialCharacter=true
//          return "Password must contain at least one Special Symbol.";
      }
      else
      {
        newUser.specialCharacter=false   
      }
      setMessage(newUser);
    }
    function checkLength(value)
    {
        const newUser = message;
        const isValidLength = /^.{9,16}$/;
        if (isValidLength.test(value)) {
            newUser.lengthGreaterthen8=true;
          //return "Password must be 9-16 Characters Long.";
        }
        else
        {
            newUser.lengthGreaterthen8=false;
        }
        setMessage(newUser);
    }
    function checkPasswordValidity(value) {
       // const isContainsLowercase = /^(?=.*[a-z]).*$/;
        // if (!isContainsLowercase.test(value)) {
        //   return "Password must have at least one Lowercase Character.";
        // }
       return null;
      }
    function validateEmail(email) {

        return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      }
    return (
        <div>
        {loading?<div class="loading"></div>:''} 
        <>
        {/*<div className="page-header">
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <ul className="page-header-breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li>Signup</li>
                    </ul>
                    <h1>User Registeration</h1>
                </div>
            </div>
        </div>
    </div>*/}
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3>Register</h3>
                        <img src="./img/about-2.jpg" style={{"width":"100%"}}/>
                    </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>Signup Information</h3>
                        <form onSubmit={(e)=>{componentDidMount(e)}}>
                            <div className="row">
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>First Name</span>
                                    <input autocomplete="off" className="input"  type="text" name="fname" id="firstName" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span> Last Name</span>
                                    <input className="input" autocomplete="off" type="text" name="lname" id="lastName" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" autocomplete="off" type="email" name="email" id="email" onChange={onChange} required />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Mobile</span>
                                    <input className="input" autocomplete="off" type="number" name="mobile" id="mobile" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Password</span>
                                        <input className="input" autoComplete="off" type={showPassword?"text":"password"} name="password" id="password" onChange={onChange} required/>
                                        {!showPassword?(<i className="fa fa-eye-slash mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>):
                                        (<i className="fa fa-eye mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>)}
                                        {
                                            message?message.numberPresent?
                                            <p style={{"color":"green","fontSize":"12px"}}>- Must contain number.</p>:
                                            <p style={{"color":"red","fontSize":"12px"}}>- Must contain number.</p>:''
                                        }
                                        {
                                            message?message.UpperCase?
                                            <p style={{"color":"green","fontSize":"12px","marginTop":"-5%"}}>- Must contain capital letter.</p>:
                                            <p style={{"color":"red","fontSize":"12px","marginTop":"-5%"}}>- Must contain capital letter.</p>:''
                                        }
                                        {
                                            message?message.specialCharacter?
                                            <p style={{"color":"green","fontSize":"12px","marginTop":"-5%"}}>- Must contain special character.</p>:
                                            <p style={{"color":"red","fontSize":"12px","marginTop":"-5%"}}>- Must contain special character.</p>:''
                                        }
                                        {
                                            message?message.lengthGreaterthen8?
                                            <p style={{"color":"green","fontSize":"12px","marginTop":"-5%"}}>- Password length should be greater then 8.</p>:
                                            <p style={{"color":"red","fontSize":"12px","marginTop":"-5%"}}>- Password length should be greater then 8.</p>:''
                                        }
                                        {
                                            message?message.whiteSpace?
                                            <p style={{"color":"green","fontSize":"12px","marginTop":"-5%"}}>- Password must not contain Whitespaces.</p>:
                                            <p style={{"color":"red","fontSize":"12px","marginTop":"-5%"}}>- Password must not contain Whitespaces.</p>:''
                                        }
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Confrim Password</span>
                                        <input className="input" autocomplete="off" type={showPassword?"text":"password"} name="confirmPassword" onChange={onChange} id="confirmpassword" required/>
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
                                    <button className="primary-button" >Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12" style={{"marginTop":"3%"}}>
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>

        </div>
    )
}

export default SignupComp
