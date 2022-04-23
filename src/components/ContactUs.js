import React, {useState,useEffect} from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
toast.configure()

function ContactUs() {
    const [user, setUserState] = useState({name:'',company_name:'',email:'',mobile:'',message:''});
    const [loading,setloading] =useState(false);
    const [isVerified,setIsVerified] =useState(false);
    const history = useHistory();
    function componentDidMount(e) {
        e.preventDefault();
        setloading(true);
        if(isVerified)
        {
            if(user.mobile.length>8)
            {
                if(user.message.length>20)
                {
                        Axios.post(`${process.env.React_App_Api_Url}/api/contactus/create_contact_us`,{
                            email:user.email,
                            name:user.name,
                            company_name:'null',
                            reason:user.reason,
                            message:user.message,
                            mobile:user.mobile,
                        }).then(res=>{
                            toast.success('Your Contact Us has been successfully created. Our team member will contact you shortly.');
                            setloading(false);
                            history.replace("/");
                            window.location.reload();
                        }).catch(err=>{
                            toast.error(`${err.response.data.message}`);
                            setloading(false);
                        })
                    
                }
                else{
                    toast.error('Message length should be greater than 20 words.');
                    setloading(false);
                }
            }
            else{
                toast.error('Mobile number not valid.');
                setloading(false);
            }
        }
        else{
            toast.error('Please verify that you are human.');
            setloading(false);
        }
    }
    function onChange(e)
    {
        const newUser = {...user};
        if(e.target.id==='name')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='company_name')
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
        if(e.target.id==='reason')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='message')
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
    useEffect(()=> {
        window.scrollTo(0, 0);

      },[]);

    return (
        <div>
        {loading?<div className="loading"></div>:''} 
        {/*<div className="page-header">
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <ul className="page-header-breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li>Contact</li>
                    </ul>
                    <h1>Contact</h1>
                </div>
            </div>
        </div>
    </div>*/}
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3 >Contact Information</h3>
                        <img src="./img/bannernew3.jpeg" style={{"width":"100%"}}/>
                        <img src="./img/logo_1.png" alt="" className="image2" style={{"width":"30%","marginTop":"5%"}}/>
                        </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>Send A Message </h3>
                        <form onSubmit={(e)=>{componentDidMount(e)}}>
                            <div className="row">
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Name</span>
                                    <input className="input" autoComplete="off" type="text" name="fname" id="name" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" autoComplete="off" type="email" name="email" id="email" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Mobile</span>
                                    <input className="input" autoComplete="off" type="number" name="mobile" id="mobile" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Subject</span>
                                        <input className="input" autoComplete="off" type="text" name="password" id="reason" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <span>Message</span>
										<div className="form-group">
											<textarea class="input" name="message" placeholder="Message" id="message" onChange={onChange} required></textarea>
										</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
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
                                    <button className="primary-button">Submit</button>
                                </div>
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

export default ContactUs
