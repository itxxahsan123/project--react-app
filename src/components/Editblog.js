import React,{ useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import parse from "html-react-parser";
import renderHTML from 'react-render-html';
import ReCAPTCHA from 'react-google-recaptcha';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import imageCompression from 'browser-image-compression';
function Editblog() {
    const history = useHistory();
    const params = useParams();
    const [loading,setloading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isVerified,setIsVerified] =useState(false);
    const [text, setText] = useState('');
    const [url, setUrl] = useState('')
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')));
    const API_URL = `${process.env.React_App_Api_Url}/api/aws/file?email=${user.email}`;
    function getBlogById()
    {
        setloading(true)
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getblogbyid?id=${params.id}`)
          .then(res => {
            setloading(false)
            setPosts(res.data.resData)
            setText(posts.text);
            setUrl(posts.image);
          })
          .catch(err =>{
            setloading(false)
              console.log(err)
          })
    }
    function onChangeCaptcha(value)
    {
        if(value)
        {
            setIsVerified(true);
        }
    }
    function publishBlog(e)
    {
      e.preventDefault();
      let formData = new FormData();
//       formData.append('file', dataUri);
       setloading(true)
       if(isVerified)
       {
              Axios.post(`${process.env.React_App_Api_Url}/api/blog/updateblog`,{
                image:url,
                title:posts.title,
                text:text,
                userid:user.id,
                verified:false,
                tag:posts.tag.toLowerCase(),
                id:params.id
              }).then(res=>{
                toast.success('Blog uploaded successfully. Our Admin will verify it shortly.');
                setloading(false);
                history.replace("/myblogs");
              }).catch(err=>{
                  console.log(err);
                  setloading(false)
                  toast.error('Something went wrong. Please try later.');
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
        const newUserProfile = {...posts};
        newUserProfile[e.target.id] = e.target.value
        setPosts(newUserProfile);
    }
    function uploadAdapter(loader) {
        return {
          upload: async () => {
            return new Promise(async (resolve, reject) => {
              loader.file.then(async (file) => {
                const options = {
                  maxSizeMB: 1,
                  maxWidthOrHeight: 400,
                  useWebWorker: true
                }
                const compressedFile = await imageCompression(file, options);
                 const formdata = new FormData();
                      formdata.append("file", compressedFile);
                Axios.post(`${API_URL}`,formdata)
                .then(res=>{
                  console.log(res.data.url)
                  resolve({
                    default: res.data.url
                  });
                  }).catch(err=>{
                      console.log(err);
                    })
                      
              });
            });
          }
        };
      }
      function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return uploadAdapter(loader);
        };
      }
      const onImageChange = (file) => {
        setloading(true);
        
        if(!file) {
        //   setDataUri('');
          return;
        }
        if(file.type==='image/png' || file.type==='image/jpeg')
        {
          fileToDataUri(file)
          .then(dataUri => {
              debugger
            const newUserProfile = {...posts};
            newUserProfile['image'] = dataUri
            setPosts(newUserProfile);
            dataURItoBlob(file);

          })
        }  
        else
        {
          toast.error('Please select only png/jpeg format of image.');
          setloading(false);
        }       
      }
      const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
        })
        function dataURItoBlob(dataURI) {
            let formData = new FormData();
            formData.append('file', dataURI);
             Axios.post(`${process.env.React_App_Api_Url}/api/aws/file?email=${user.email}`,formData).then(res=>{
                 setUrl(res.data.url);
                 setloading(false);
             }).catch(err=>{
               setloading(false);
               console.log(err);
             })
         }
    useEffect(()=> {
        getBlogById()
      },[]);

    return (
        < >
        <div className="write">
    {
        posts.image!=='' ?
          <img
          className="writeImg"
          src={posts.image}
          alt=""
        />:
        <img
          className="writeImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
    }

    <form className="writeForm" onSubmit={publishBlog}>
      <div className="writeFormGroup" style={{"marginTop":"3%"}}>
        <label >
          <i className="writeIcon fa fa-upload"></i>
        </label>
        <label className="writeFile">
        &nbsp;&nbsp;Browse Image&nbsp;&nbsp;<input id="fileInput" type="file" accept="image/*"  onChange={(event) => onImageChange(event.target.files[0] || null)} hidden/>
        </label>
      </div>

      <div className="writeFormGroup" style={{"marginTop":"3%"}}>
        <input
          className="writeInput"
          placeholder="Title *"
          type="text"
          id="title"
          value={posts.title}
          onChange={onChange}
          style={{border:"1px solid peru","borderRadius":"10px"}}
        />
      
      </div>
      <div className="writeFormGroup" style={{"marginTop":"3%"}}>
            <input
            className="writeInput"
            placeholder="Tag *"
            type="text"
            id="tag"
            value={posts.tag}
            onChange={onChange}
            style={{border:"1px solid peru","borderRadius":"10px"}}
            />
      </div>
      <div className="writeFormGroup" style={{"marginTop":"3%"}}>
          <CKEditor
          editor={ClassicEditor}
          data={posts.text}
          id="desc"
          value={posts.text}
          config={{placeholder: "Tell your story...*",extraPlugins: [uploadPlugin]}}
          onChange={(event,editor)=>{
            const data=editor.getData();
            setText(data);      
          }}
          // config={{ removePlugins: ['MediaEmbed','EasyImage','ImageUpload']}} 
          >
        </CKEditor>
      </div>
      <div className="writeFormGroup" style={{"marginTop":"3%"}}>
        <ReCAPTCHA
        sitekey="6Ldxf4geAAAAACcrnyAo-9k8hlD-BTE6ZSrQAD5t"
        onChange={onChangeCaptcha}
        size="normal"
        data-theme="dark"            
        render="explicit"
        />
      </div>
      <button className="writeSubmit" type="submit">
        Publish
      </button>
    </form>
    </div>
</>
    )
}

export default Editblog
