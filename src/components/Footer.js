import React,{ useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Footer() {
  let styleSheet={
    width:"50%"
  }
  const [tags, settags] = useState([]); 
  const history = useHistory();
  function getTags()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/gettags`).then(blogs => {
      console.log('getTAgs',blogs);
      settags(blogs.data.tag.count);
    }).catch(err => {
    });    
  }
  useEffect(() => {
    // getTags()
  }, [])
    return (
        <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="/" className="logo"><img src="./img/logo.png" alt="" style={styleSheet} onClick={()=>{history.push('/');window.location.reload()}}/></Link>
                </div>

                <div className="footer-copyright">
                  <span>&copy;
   Copyright &copy;2021.<script>document.write(new Date().getFullYear());</script> All rights reserved 
   </span>
                </div>
              </div>
            </div>
   
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-widget">
                    <h3 className="footer-title" hidden>About Us</h3>
                    <ul className="footer-links" style={{"marginTop":"10%"}}>
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/contactus">Contact Us</Link></li>
                      <li><Link to="/signup">Join Us</Link></li>
                    </ul>
                  </div>
                </div>
                {/*<div className="col-md-6">
                  <div className="footer-widget">
                    <h3 className="footer-title">Categories</h3>
                    <ul className="footer-links">
                    {
                       tags.length!=0?
                       tags.map(tag=>{
                         return(
                           <>
                             <li><Link to={`/allblog/${tag.tag}`}>{tag.tag}</Link></li>
                           </>
                         )
                       }):''
                    }
                    </ul>
                  </div>
                </div>*/}
              </div>
            </div>
   
            <div className="col-md-3">
              <div className="footer-widget">
                {/*<h3 className="footer-title">Join our Newsletter</h3>
                <div className="footer-newsletter">
                  <form>
                    <input className="input" type="email" name="newsletter" placeholder="Enter your email" />
                    <button className="newsletter-btn"><i className="fa fa-paper-plane"></i></button>
                  </form>
                  </div>*/}
                <ul className="footer-social">
                  <li><a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="https://www.linkedin.com" target="_blank"><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="https://mail.google.com" target="_blank"><i className="fa fa-envelope"></i></a></li>
                </ul>
              </div>
            </div>
   
          </div>
        </div>
      </footer>
    )
}

export default Footer
