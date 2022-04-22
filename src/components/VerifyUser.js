import React,{ useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";

function VerifyUser() {
    const history = useHistory();
    const params = useParams();
    const [loading,setloading] =useState(false);
    const [errMsg,setErrMsg] =useState('');
    const Obj = JSON.parse(params.id);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')))
  
    function componentDidMount()
    {
      if(!user)
      {
        history.replace("/login");
      }
    }
  
    function validateUser()
    {
        debugger
        Axios.get(`${process.env.React_App_Api_Url}/api/user/verifyuser?id=${params.id}&otp=${params.otp}`).then(res=>{
            setloading(false);
            toast.success('Verified Successfully');
            history.replace("/login");
        }).catch(err=>{
            toast.error(`${err.response.data.message}`);
            setloading(false);
            setErrMsg(err.response.data.message)
        })
    }
    useEffect(()=> {
        debugger
        setloading(true);
        validateUser();
      },[]);
    return (
        <div>
        {loading?<div className="loading"></div>:''}        
        <div className="center">
            <img src="./img/thankyouemojee.jpeg"/>
            <h3 >User is being Verified. Wait for sometime.</h3>
            <p>{errMsg}</p>
        </div>
        </div>
    )
}

export default VerifyUser
