import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Header from './components/header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Write from "./pages/WriteBlog";
import Posts from "./pages/Posts";
import Blogdetails from './components/Blog-details';
import WriteForum from "./pages/WriteForum";
import AllForum from "./pages/AllForum";
import ForumDetails from "./components/ForumDetails";
import Myblogs from "./components/Myblogs";
import Admin from "./components/Admin";
import VerifyBlogs from "./components/VerifyBlogs";
import VerifyForums from "./components/VerifyForums";
import AdminSignup from "./components/AdminSignup";
import { Carousel } from "react-responsive-carousel";
import Myforums from "./components/Myforums";
import Contactus from "./pages/Contactus";
import Admincontactus from "./components/Admincontactus";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Editblog from "./components/Editblog";
import VerificationComp from "./components/VerificationComp";
import VerifyUser from "./components/VerifyUser";
function App() {
  return (
    <>
    {/* http://3.223.54.220:3001*/}
    <Router>     
        <Switch>
      
          <Route exact path="/about">
          <Header ></Header>
          <AboutUs></AboutUs>
          </Route>

          <Route exact path="/signup">
          <Header ></Header>
          <Signup></Signup>
          </Route>

          <Route exact path="/login" >
          <Header ></Header>
          <Login ></Login>
          </Route>

        <Route exact path="/allblog/:tag">
        <Header ></Header>
        <Posts></Posts>
        </Route>
        <Route exact path="/allblog/search/:search">
        <Header ></Header>
        <Posts></Posts>
      </Route>
        <Route exact path="/allblog">
        <Header ></Header>
        <Posts></Posts>
        </Route>
        <Route exact path="/contactus">
        <Header ></Header>
        <Contactus></Contactus>
        </Route>
        <Route exact path="/admincontactus">
        <Header ></Header>
        <Admincontactus></Admincontactus>
      </Route>
        <Route exact path="/uploadblog">
        <Header ></Header>
        <Write></Write>
        </Route>

        <Route exact path="/post/:id">
        <Header ></Header>
        <Blogdetails ></Blogdetails>
         </Route>

         <Route exact path="/forum">
         <Header ></Header>
         <WriteForum></WriteForum>
        </Route>
        <Route exact path="/forum/:id">
        <Header ></Header>
        <ForumDetails></ForumDetails>
       </Route>
        <Route exact path="/allforum">
        <Header ></Header>
        <AllForum></AllForum>
        </Route>
        <Route exact path="/myblogs">
        <Header ></Header>
        <Myblogs></Myblogs>
         </Route>
         <Route exact path="/myforums">
         <Header ></Header>
         <Myforums></Myforums>
         </Route>
         <Route exact path="/admin">
         <Header ></Header>
         <Admin></Admin>
          </Route>
          <Route exact path="/adminsignup">
          <Header ></Header>
          <AdminSignup></AdminSignup>
          </Route>
          <Route exact path="/verifyblogs">
          <Header ></Header>
          <VerifyBlogs></VerifyBlogs>
          </Route>
          <Route exact path="/verifyforums">
          <Header ></Header>
          <VerifyForums></VerifyForums>
        </Route>
         <Route exact path="/forgetpassword">
            <Header ></Header>
            <ForgetPassword></ForgetPassword>
          </Route>
          <Route exact path="/resetpassword">
          <Header ></Header>
          <ResetPassword></ResetPassword>
        </Route>
        <Route exact path="/editblog/:id">
          <Header ></Header>
          <Editblog></Editblog>
        </Route>
        <Route exact path="/verificationpage">
          <Header ></Header>
          <VerificationComp></VerificationComp>
        </Route>
        <Route exact path="/verifyuser/:id/:otp">
          <Header ></Header>
          <VerifyUser></VerifyUser>
        </Route>
          <Route exact path="/" >
          <Home></Home>
          </Route>
    
        </Switch>
      <Footer></Footer>
    </Router>
    
    </>
  );
}

export default App;