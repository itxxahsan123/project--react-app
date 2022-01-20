import React,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import CarouselC from "../components/carousel";
import $ from 'jquery';
toast.configure()
function Header(props) {
  const [recentBlogs, setrecentBlogs] = useState([]);
  const [searchBlogs, setsearchBlogs] = useState([]);
  const [showsearch, setSearch] = useState(false);
  const [search, setSearches] = useState('');
  var token = JSON.parse(localStorage.getItem('blogUser'));
  const history = useHistory();

	$('.nav-aside-close').on('click', function () {
		$('#nav-aside').removeClass('active');
		$('#nav').removeClass('shadow-active');
	});

  function logOut()
  {
    localStorage.clear();
    history.replace("/login");
    window.location.reload();
  }
  function getTags()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getAllblogs`).then(blogs => {
      console.log('getTAgs',blogs);
      setrecentBlogs(blogs.data.blogs)
    }).catch(err => {
      toast.error('No tags Found');
    });    
  }
  function searchfunc(e)
    {
      e.preventDefault()
        history.replace(`/allblog/search/${search.toLowerCase()}`);
       document.getElementById('search').value=''
       setSearch(false)
    }
    function onChange(e)
    {
      setSearches(e.target.value);
    }
  useEffect(() => {
    getTags();
  }, [])
    return (
     <header id="header" >     
     <div id="nav">
          <div id="nav-fixed">
            <div className="container">
              <div className="nav-logo">
                <Link to="/" className="logo"><img src="./img/logo.png" alt="" onClick={()=>{history.push('/');window.location.reload()}}/></Link>
              </div>
   
              <ul className="nav-menu nav navbar-nav">
                  <li ><Link to="/">Home</Link></li>
                { token ?
                  <>
                    {
                      token.role=="admin" ?
                      <>
                        <li ><Link to="/login" onClick={logOut}>Log out</Link></li>
                        </>
                      :
                      <> 
                      <li ><Link to="/allblog">Blogs</Link></li>
                      <li ><Link to="/allforum">Forums</Link></li>
                        <li ><Link to="/login" onClick={logOut}>Log out</Link></li>
                      </>
                    }

                  </>
                  : <> 
                  <li ><Link to="/allforum">Forums</Link></li>
                  <li ><Link to="/allblog">Blogs</Link></li>
                  </>
                }
              </ul>
              <div className="nav-btns" >
                {
                  showsearch?                
                  <div  style={{"marginTop":"2%"}}>
                    <form onSubmit={(e)=>{searchfunc(e)}} >
                    <i className="faviconcolor fa fa-times" onClick={()=>{setSearch(false);setSearches('')}}></i>
                    <input autoComplete="off" className="search-input" onChange={onChange} type="search" name="search" placeholder="Enter Your Search ..." id="search"/>
                    <button className="search-close" type="submit">Search</button>
                    </form>
                  </div>
                  :
                  <>
                  <a href="https://www.facebook.com" target="_blank" className="share-facebook"><i className="fa fa-facebook"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="https://twitter.com/" target="_blank" className="share-twitter"><i className="fa fa-twitter"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="https://www.linkedin.com" target="_blank" className="share-linkedin"><i className="fa fa-linkedin"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="https://mail.google.com" target="_blank"><i className="fa fa-envelope"></i></a>&nbsp;&nbsp;&nbsp;
                  <button className="aside-btn"><i className="faviconcolor fa fa-bars"></i></button>
                  <button className="search-btn"><i className=" faviconcolor fa fa-search" onClick={()=>{setSearch(true)}}></i></button>
                  </>
                }
              </div>
            </div>
          </div>
          <div id="nav-aside">
            <div className="section-row">
              <ul className="nav-aside-menu">
                <li  className="nav-aside-close"><Link to="/">HOME</Link></li>
                {token?
                  <>
                  {
                    token.role==='admin'?
                    <>
                    <li className="nav-aside-close"><Link to="/allblog" className="close">All BLOGS</Link></li>
                    <li className="nav-aside-close"><Link to="/allforum" className="close">All FORUMS</Link></li>
                    <li className="nav-aside-close"><Link to="/adminsignup" className="close">ADMIN SIGNUP</Link></li>
                    <li className="nav-aside-close"><Link to="/admin" className="close">USERS</Link></li>
                    <li className="nav-aside-close"><Link to="/verifyblogs" className="close">BLOGS</Link></li>
                    <li className="nav-aside-close"><Link to="/verifyforums" className="close">FORUMS</Link></li>
                    <li className="nav-aside-close"><Link to="/admincontactus" className="close">CONTACT US</Link></li>
                    <li className="nav-aside-close"><Link to='/about' className="close">ABOUT US</Link></li>
                    <li className="nav-aside-close"><Link to="/login" onClick={logOut} className="close">LOG OUT</Link></li>
                    </>
                    :<>
                    <li className="nav-aside-close"><Link to="/login" >EDIT PROFILE</Link></li>
                    <li className="nav-aside-close"><Link to="/allblog">ALL BLOGS</Link></li>
                    <li className="nav-aside-close"><Link to="/allforum">ALL FORUMS</Link></li>
                    <li className="nav-aside-close"><Link to="/myblogs">MY BLOGS</Link></li>
                    <li className="nav-aside-close"><Link to="/myforums">MY FORUMS</Link></li>
                    <li className="nav-aside-close"><Link to='/contactus'>CONTACT US</Link></li>
                    <li className="nav-aside-close"><Link to='/about'>ABOUT US</Link></li>
                    <li className="nav-aside-close"><Link to="/login" onClick={logOut}>LOG OUT</Link></li>
                    </>
                  }
                  </>
                 :
                   <>
                     <li className="nav-aside-close"><Link to="/login">LOGIN</Link></li>
                     <li className="nav-aside-close"><Link to="/allblog">ALL BLOGS</Link></li>
                     <li className="nav-aside-close"><Link to="/allforum">ALL FORUMS</Link></li>
                     <li className="nav-aside-close"><Link to='/contactus'>CONTACT US</Link></li>
                     <li className="nav-aside-close"><Link to='/about'>ABOUT US</Link></li>
                   </>}

              </ul>
            </div>
            <div className="section-row">
              <h3 style={{"color":"#888"}}>RECENT POSTS</h3>
              {
                (recentBlogs!== undefined || recentBlogs!== [] || recentBlogs!== null) ? recentBlogs.length!=0 ?
                recentBlogs.map((blog,index)=>{
                    return(
                      <>
                        {
                          index<6?
                          <div className="post post-widget">
                          <Link className="post-img" to={`/post/${blog.id}`}><img src={blog.image} alt="" /></Link>
                          <div className="post-body">
                            <h3 className="post-title navasidecolor"><Link to={`/post/${blog.id}`} className="navasidecolor">{blog.title}</Link></h3>
                          </div>
                        </div>:''
                        }
                      </>
                    )
                }):'No Blogs Found':'No Blogs Found'
              }

               </div>
            <div className="section-row">
              {/*<h3>Follow us</h3>
              <ul className="nav-aside-social">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
              </ul>*/}
            </div>
            {/*} <button className="nav-aside-close"><i className="faviconcolor fa fa-times"></i></button>*/}
          </div>
        </div>
      </header>
    )
}

export default Header
