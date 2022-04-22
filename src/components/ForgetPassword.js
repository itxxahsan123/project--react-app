import React,{ useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

toast.configure()

function ForgetPassword() {
    const [loading,setloading] =useState(false);
    const history = useHistory();
    const [user, setUserState] = useState({email:''});
    const [isVerified,setIsVerified] =useState(false);
    const [user1,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')));

    function forgetPassword(e)
    {
        setloading(true);
        e.preventDefault();
        if(isVerified)
        {
            Axios.get(`${process.env.React_App_Api_Url}/api/user/forget_password?email=${user.email}`).then(res=>{
                toast.success('Email has been sent to your account');
                setloading(false);
                history.replace("/login");
            }).catch(err=>{
                toast.error(`${err.response.data.message}`);
                setloading(false);
            })
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
        if(e.target.id=='email')
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
    function componentDidMount()
    {
      if(!user1)
      {
        history.replace("/login");
      }
    }
    useEffect(()=> {
        //componentDidMount();
      },[]);

    return (
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <div className="section-row" style={{"marginTop":"0%"}}>
                <h3 >Forget Password</h3>
                <img src="./img/about-1.jpg" style={{"width":"100%"}}/>
                </div>
        </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>Enter your Email to Reset Password</h3>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" type="email" name="email" id="email" onChange={onChange} required/>
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
                                    <button onClick={e=>{forgetPassword(e)}} className="primary-button">Submit</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default ForgetPassword
