import React,{ useState } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

toast.configure()

function ResetPassword() {
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('blogUser')));
    const [user, setUserState] = useState({oldPassword:'',newPassword:'',confirmPassword:'',id:0});
    const [loading,setloading] =useState(false);
    const history = useHistory();
    const [isVerified,setIsVerified] =useState(false);
    const [message, setMessage] = useState({whiteSpace:false,specialCharacter:false,numberPresent:false,
        lengthGreaterthen8:false,UpperCase:false});
        const [showPassword,setShowPassword] =useState(false);
    function componentDidMount(e) {
        e.preventDefault();
        setloading(true);
        if(isVerified)
        {
            if(message.whiteSpace === true && message.specialCharacter === true && message.numberPresent === true
                && message.lengthGreaterthen8 === true && message.UpperCase === true)
             {
                if(user.newPassword.length>8)
                {
                    if(user.newPassword  === user.confirmPassword)
                    {
                        Axios.post(`${process.env.React_App_Api_Url}/api/user/resetpassword`,{user}).then(res=>{
                            toast.success('Password Updated.');
                            setloading(false);
                            history.replace("/login");
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
    function onChange(e)
    {
        const newUser = {...user};
        newUser.id = userProfile.id;
        if(e.target.id==='oldPassword')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='newPassword')
        {
            newUser[e.target.id] = e.target.value
            checkWhiteSpace(e.target.value)
            checkNumber(e.target.value)
            checkUpperCase(e.target.value)
            checkSymbol(e.target.value)
            checkLength(e.target.value)
        }
        if(e.target.id==='confirmPassword')
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
    return (
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3>Reset Password</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <ul className="list-style">
                            <li><p><strong>Email:</strong> <a href="#">Webmag@blog.com</a></p></li>
                            <li><p><strong>Phone:</strong> 213-520-7376</p></li>
                            <li><p><strong>Address:</strong> 3770 Oliver Street</p></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>Reset Password</h3>
                            <div className="row">
                            <form onSubmit={(e)=>{componentDidMount(e)}}>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Old Password</span>
                                        <input className="input" type={showPassword?"text":"password"} name="email" id="oldPassword" onChange={onChange} required/>
                                        {!showPassword?(<i className="fa fa-eye-slash mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>):
                                        (<i className="fa fa-eye mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>)}
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Password</span>
                                        <input className="input" autoComplete="off" type={showPassword?"text":"password"} name="password" id="newPassword" onChange={onChange} required/>
                                        {!showPassword?(<i className="fa fa-eye-slash mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>):
                                        (<i className="fa fa-eye mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>)}
                                        {
                                            message?message.numberPresent?
                                            <p style={{"color":"green"}}>- Must contain number.</p>:
                                            <p style={{"color":"red"}}>- Must contain number.</p>:''
                                        }
                                        {
                                            message?message.UpperCase?
                                            <p style={{"color":"green"}}>- Must contain capital letter.</p>:
                                            <p style={{"color":"red"}}>- Must contain capital letter.</p>:''
                                        }
                                        {
                                            message?message.specialCharacter?
                                            <p style={{"color":"green"}}>- Must contain special character.</p>:
                                            <p style={{"color":"red"}}>- Must contain special character.</p>:''
                                        }
                                        {
                                            message?message.lengthGreaterthen8?
                                            <p style={{"color":"green"}}>- Password length should be greater then 8.</p>:
                                            <p style={{"color":"red"}}>- Password length should be greater then 8.</p>:''
                                        }
                                        {
                                            message?message.whiteSpace?
                                            <p style={{"color":"green"}}>- Password must not contain Whitespaces.</p>:
                                            <p style={{"color":"red"}}>- Password must not contain Whitespaces.</p>:''
                                        }
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Confirm Password</span>
                                    <input className="input" type={showPassword?"text":"password"} id="confirmPassword" onChange={onChange} required/>
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
                                    <button type="submit" className="primary-button">Reset Password</button>
                                </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default ResetPassword
