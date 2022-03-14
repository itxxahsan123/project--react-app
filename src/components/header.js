import React,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Carousel from "../components/carousel";
import $ from 'jquery';
toast.configure()
function Header(props) {
  const [recentBlogs, setrecentBlogs] = useState([]);
  const [searchBlogs, setsearchBlogs] = useState([]);
  const [showsearch, setSearch] = useState(false);
  const [search, setSearches] = useState('');
  var token = JSON.parse(localStorage.getItem('blogUser'));
  const [allForums, setallForums] = useState([]);
  const [tags, settags] = useState([]); 
  const history = useHistory();

  $(window).scroll(function(){
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();
  
    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });

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
      console.log(err);
    });    
  }
  function getCategories()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/gettags`).then(blogs => {
      console.log('getTAgs',blogs);
      settags(blogs.data.tag.count);
    }).catch(err => {
      console.log(err);
    });    
  }
  function getAllForums()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/forum/getAllforums`).then(blogs => {
      console.log('All Forum',blogs);
      setallForums(blogs.data.blogs)
    }).catch(err => {
      console.log(err);
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
    getAllForums();
    getCategories();
  }, [])
    return (
     <header id="header" className="sticky" style={{"zIndex":"1000"}}> 
     <div id="nav" style={{"opacity":"0.5"}}>
          <div id="nav-fixed">
            <div className="container" style={{"marginLeft":"-2%","width":"100%"}}>
                <ul className="nav-menu nav navbar-nav" >
                     { tags.length!=0 ?
                      tags.map( (tag,index)=>{
                        return (
                          <>
                              {
                                index<11?
                                <li ><Link to={`/allblog/${tag.tag}`} style={{textTransform:"uppercase",fontSize:"12px"}}>{tag.tag}</Link></li>
                                :''
                              }
                          </>
                        )
                      }):''
                    }                   
                </ul>
            </div>
          </div>
      </div>     
     <div id="nav" >
          <div id="nav-fixed">
            <div className="container" style={{"marginLeft":"0%","width":"100%"}}>
              <div className="nav-logo" >
                <Link to="/" className="logo"><img src="./img/logo.png" alt="" onClick={()=>{history.push('/');window.location.reload()}}/></Link>
              </div>
   
              <ul className="nav-menu nav navbar-nav">
                  <li ><Link to="/">HOME</Link></li>
                { token ?
                  <>
                    {
                      token.role=="admin" ?
                      <>
                        <li ><Link to="/login" onClick={logOut}>Log out</Link></li>
                        </>
                      :
                      <> 
                      <li ><Link to="/allblog">BLOGS</Link></li>
                      <li ><Link to="/allforum">FORUMS</Link></li>
                      <li><Link to="/uploadblog" >SUBMIT BLOG</Link></li>
                      <li ><Link to="/login" onClick={logOut}>LOG OUT</Link></li>
                      </>
                    }

                  </>
                  : <> 
                  <li ><Link to="/allforum">FORUMS</Link></li>
                  <li ><Link to="/allblog">BLOGS</Link></li>
                  <li><Link to="/login" >LOGIN</Link></li>
                  <li><Link to="/uploadblog" >SUBMIT BLOG</Link></li>
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
                  <a href="https://www.facebook.com/JypraGroupAU" target="_blank" className="share-facebook"><i className="fa fa-facebook"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="https://www.instagram.com/jypragroup/" target="_blank" className="share-twitter"><i className="fa fa-instagram"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="https://twitter.com/JypraGroup" target="_blank" className="share-twitter"><i className="fa fa-twitter"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="https://www.linkedin.com/company/jypragroup" target="_blank" className="share-linkedin"><i className="fa fa-linkedin"></i></a>&nbsp;&nbsp;&nbsp;
                  <a href="mailto:info@jypragroup.com.au" target="_blank"><i className="fa fa-envelope"></i></a>&nbsp;&nbsp;&nbsp;
                  <button className="search-btn"><i className=" faviconcolor fa fa-search" onClick={()=>{setSearch(true)}}></i></button>
                  <button className="aside-btn"><i className="faviconcolor fa fa-bars" ></i></button>
                  </>
                }
              </div>
            </div>
          </div>
          <div id="nav-aside">
            <div className="section-row">
              <ul className="nav-aside-menu">
              <div style={{"backgroundColor":"#000","width":"100%","padding":"10px 10px 10px 10px","marginTop":"-10%","marginBottom":"10%"}}>
              <div className="section-row">
                  <h3 style={{"color":"#fff"}}>Follow us</h3>
                  <ul className="nav-aside-social">
                    <li><a href="https://www.facebook.com/JypraGroupAU"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com/jypragroup/"><i className="fa fa-instagram"></i></a></li>
                    <li><a href="https://twitter.com/JypraGroup"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/jypragroup"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="mailto:info@jypragroup.com.au"><i className="fa fa-google-plus"></i></a></li>
                  </ul>
                 {token? 
                  <button style={{"marginTop":"5%","width":"100%","backgroundColor":"#fff","padding":"10px 10px 10px 10px","color":"#7abd13","fontSize":"20px"}} >
                  <Link to="/login" style={{"color":"#7abd13"}}>
                  <i className="fa fa-users" style={{"color":"#7abd13"}}></i>&nbsp;&nbsp;
                  EDIT PROFILE</Link>
                  </button>:
                 <button style={{"marginTop":"5%","width":"100%","backgroundColor":"#fff","padding":"10px 10px 10px 10px","color":"#7abd13","fontSize":"20px"}} >
                 <Link to="/login" style={{"color":"#7abd13"}}>
                 <i className="fa fa-users" style={{"color":"#7abd13"}}></i>&nbsp;&nbsp;
                 LOGIN OR SIGNUP</Link>
                 </button>}
              </div>
              </div>
              <button style={{"width":"100%","backgroundColor":"#7abd13",
              "padding":"20px 20px 20px 20px","color":"#fff","fontSize":"25px","textAlign":"left","marginBottom":"5%"}} >
              QUICK LINKS
              </button>
                <li  className="nav-aside-close"><Link to="/">HOME</Link></li>
                {token?
                  <>
                  {
                    token.role==='admin'?
                    <>
                    <li className="nav-aside-close"><Link to="/allblog" >All BLOGS</Link></li>
                    <li className="nav-aside-close"><Link to="/allforum" >All FORUMS</Link></li>
                    <li className="nav-aside-close"><Link to="/adminsignup" >ADMIN SIGNUP</Link></li>
                    <li className="nav-aside-close"><Link to="/admin" >USERS</Link></li>
                    <li className="nav-aside-close"><Link to="/verifyblogs" >BLOGS</Link></li>
                    <li className="nav-aside-close"><Link to="/verifyforums" >FORUMS</Link></li>
                    <li className="nav-aside-close"><Link to="/admincontactus" >CONTACT US</Link></li>
                    <li className="nav-aside-close"><Link to='/about' >ABOUT US</Link></li>
                    <li className="nav-aside-close"><Link to="/login" onClick={logOut} >LOG OUT</Link></li>
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
                     <li className="nav-aside-close"><Link to="/allblog">ALL BLOGS</Link></li>
                     <li className="nav-aside-close"><Link to="/allforum">ALL FORUMS</Link></li>
                     <li className="nav-aside-close"><Link to='/contactus'>CONTACT US</Link></li>
                     <li className="nav-aside-close"><Link to='/about'>ABOUT US</Link></li>
                   </>}

              </ul>
            </div>
            <div className="section-row">
            <button style={{"width":"100%","backgroundColor":"#7abd13",
            "padding":"20px 20px 20px 20px","color":"#fff","fontSize":"25px","textAlign":"left","marginBottom":"5%"}} >
            RECENT POSTS
            </button>
              {
                (recentBlogs!== undefined || recentBlogs!== [] || recentBlogs!== null) ? recentBlogs.length!=0 ?
                recentBlogs.map((blog,index)=>{
                    return(
                      <>
                        {              
                          <div className="post post-widget" style={{"padding":"10px 20px 10px 20px"}}>
                          <Link className="post-img" to={`/post/${blog.id}`}><img src={blog.image} alt="" /></Link>
                          <div className="post-body">
                            <h3 className="post-title navasidecolor"><Link to={`/post/${blog.id}`} className="navasidecolor">{blog.title}</Link></h3>
                          </div>
                        </div>
                        }
                      </>
                    )
                }):'No Blogs Found':'No Blogs Found'
              }

               </div>
               <div className="section-row">
               <button style={{"width":"100%","backgroundColor":"#7abd13",
               "padding":"20px 20px 20px 20px","color":"#fff","fontSize":"25px","textAlign":"left","marginBottom":"5%"}} >
               RECENT FORUMS
               </button>
                 {
                   (allForums!== undefined || allForums!== [] || allForums!== null) ? allForums.length!=0 ?
                   allForums.map((forum,index)=>{
                       return(
                         <>
                           {              
                             <div className="post post-widget" style={{"padding":"10px 20px 10px 20px"}}>
                             <Link className="post-img" to={`/forum/${forum.id}`}><img src={forum.image} alt="" /></Link>
                             <div className="post-body">
                               <h3 className="post-title navasidecolor"><Link to={`/forum/${forum.id}`} className="navasidecolor">{forum.title}</Link></h3>
                             </div>
                           </div>
                           }
                         </>
                       )
                   }):'No Forums Found':'No Forums Found'
                 }
   
                  </div>
                
                  <div className="section-row">
                  <button style={{"width":"100%","backgroundColor":"#7abd13",
                  "padding":"20px 20px 20px 20px","color":"#fff","fontSize":"25px","textAlign":"left","marginBottom":"5%"}} >
                  CATEGORIES
                  </button>
                  <div className="category-widget" style={{"padding":"10px 20px 10px 20px"}}>
                  <ul>
                     { tags.length!=0 ?
                      tags.map( (tag,index)=>{
                        return (
                            <ul>
                              { 
                                (index+1)%4===0 ? <li><Link to={`/allblog/${tag.tag}`} className="cat-1" style={{"color":"#fff"}}>{tag.tag}<span>{tag.count}</span></Link></li> : 
                                (index+1)%3===0 ? <li><Link to={`/allblog/${tag.tag}`} className="cat-2" style={{"color":"#fff"}}>{tag.tag}<span>{tag.count}</span></Link></li> : 
                                (index+1)%2===0 ? <li><Link to={`/allblog/${tag.tag}`} className="cat-3" style={{"color":"#fff"}}>{tag.tag}<span>{tag.count}</span></Link></li> : 
                                (index)%2===0 ?<li><Link to={`/allblog/${tag.tag}`} className="cat-4" style={{"color":"#fff"}}>{tag.tag}<span>{tag.count}</span></Link></li> :''
                              }
                            </ul>
                        )
                      }):''
                    }                   
                  </ul>
              </div>       
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
