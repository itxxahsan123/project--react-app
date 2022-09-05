import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
toast.configure();

function About() {
  const [mostReadBlogs, setMostReadBlogs] = useState([]);
  const [featuredblogs, setfeaturedblogs] = useState([]);
  const [loading, setloading] = useState(false);
  function splitDate(x) {
    let y = x.split("T");
    return y[0];
  }
  function mostRead() {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmostreadblogs`)
      .then((blogs) => {
        setMostReadBlogs(blogs.data.tag);
        setloading(false);
      })
      .catch((err) => {
        toast.error("No Most read blogs Found");
      });
  }
  function featuredBlogs() {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`)
      .then((blogs) => {
        setfeaturedblogs(blogs.data.tag);
        setloading(false);
      })
      .catch((err) => {
        toast.error("No featured blogsFound");
        setloading(false);
      });
  }
  useEffect(() => {
    setloading(true);
    mostRead();
    featuredBlogs();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="section">
      {loading ? <div class="loading"></div> : ""}
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="section-row">
              <h3>About Us</h3>
              <p style={{ textAlign: "justify" }}>
                Learntohack.com.au compiles all of the biggest news, articles,
                videos, and much more on Cyber Security, Penetration Testing,
                Ethical Hacking, Vulnerabilities, Data encryption and Threat
                Analysis into a single location. Our overall purpose is to
                provide a helpful and practical platform to assist you in
                gaining a better knowledge and a faster overview of everything
                going on in the field of Cyber Security. Learntohack.com.au was
                created by cyber security specialists — qualified experts with
                an in-depth understanding of the most recent threats and
                security practices. The blog seeks to appeal to all levels of
                skill, from experienced hackers to those solely searching for
                tips on how to efficiently protect their information. A
                significant breach or type of malware is discovered almost every
                day, but Learntohack.com.au is not here to hype up risks or
                mislead people but to deliver clear, precise guidance and
                insight into the challenges that today's technology users face.
              </p>
              <figure className="figure-img">
                <img
                  className="img-responsive"
                  src="./img/about-1.jpg"
                  alt=""
                />
              </figure>
              <h3>Article Submission</h3>
              <p style={{ textAlign: "justify" }}>
                We welcome posts from enthusiastic users all over the world at
                Learntohack.com.au, so please create an account on our portal
                and submit the article. Once the content is reviewed, the
                article will be posted on our blog.
              </p>
            </div>
            <div className="row section-row">
              {/* <div className="col-md-6">
                <figure className="figure-img">
                  <img
                    className="img-responsive"
                    src="./img/about-2.jpg"
                    alt=""
                  />
                </figure>
              </div> */}
              <div className="col-md-12" style={{ textAlign: "justify" }}>
                <h3>Our Guidelines</h3>
                <p>
                  We would like to be certain that everyone on
                  Learntohack.com.au respects the blog posted and other members,
                  so here are some guidelines to follow:
                </p>
                <ul className="list-style">
                  <li>
                    <p>
                      To begin with, Learntohack.com.au is a community, so
                      please treat people with respect.
                    </p>
                  </li>
                  <li>
                    <p>
                      Learntohack.com.au is not responsible for the actions of
                      its members, but any person who engages in improper
                      behaviour may be suspended.
                    </p>
                  </li>
                  <li>
                    <p>
                      Views and opinions expressed by members are their own, and
                      we accepts no accountability for comments.
                    </p>
                  </li>
                  <li>
                    <p>
                      Racist, sexist, ageist, or other discriminating remarks
                      are not tolerated. If you come across any content that
                      offends you, please inform us right away and we will look
                      into it.
                    </p>
                  </li>
                  <li>
                    <p>
                      Please respect the copyrights and privacy of others with
                      the content you submit.
                    </p>
                  </li>
                  <li>
                    <p>Be truthful.</p>
                  </li>
                  <li>
                    <p>
                      Posts and comments should not be used to sell your
                      products or services.
                    </p>
                  </li>
                  <li>
                    <p>
                      We might reuse your comments or articles, or publish them
                      via our Social media channels.
                    </p>
                  </li>
                  <li>
                    <p>
                      It is forbidden to promote this website through
                      inappropriate mail.
                    </p>
                  </li>
                </ul>
              </div>
              <h3>Contact Us</h3>
              <p style={{ textAlign: "justify" }}>
                If you have any feedback or issues, please contact us at &nbsp;
                <b>
                  <a href="mailto:info@learntohack.com.au">
                    info@learntohack.com.au
                  </a>
                </b>
                . We eagerly await your response. You may also connect with us
                on our social media to get the latest news.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="aside-widget">
              <div className="section-title">
                <h2>Most Read</h2>
              </div>
              {mostReadBlogs.length != 0
                ? mostReadBlogs.map((mostReadBlog, index) => {
                    return (
                      <>
                        {index < 5 ? (
                          <div className="post post-widget">
                            <Link
                              className="post-img"
                              to={`/post/${mostReadBlog.id}`}
                            >
                              <img
                                src={mostReadBlog.image}
                                alt=""
                                style={{ height: "90px" }}
                              />
                            </Link>
                            <div className="post-body">
                              <h3 className="post-title">
                                <Link to={`/post/${mostReadBlog.id}`}>
                                  {mostReadBlog.title}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })
                : ""}
            </div>
            <div className="aside-widget">
              <div className="section-title">
                <h2>Featured Posts</h2>
              </div>
              {featuredblogs.length != 0
                ? featuredblogs.map((featuredblog, index) => {
                    return (
                      <>
                        {index < 5 ? (
                          <div className="post post-thumb">
                            <Link
                              className="post-img"
                              to={`/post/${featuredblog.id}`}
                            >
                              <img
                                src={featuredblog.image}
                                alt=""
                                style={{ height: "176px" }}
                              />
                            </Link>
                            <div className="post-body">
                              <div className="post-meta">
                                <Link
                                  className="post-category cat-3"
                                  to={`/post/${featuredblog.id}`}
                                >
                                  {featuredblog.tag}
                                </Link>
                                <span className="post-date">
                                  {splitDate(featuredblog.updatedAt)}
                                </span>
                              </div>
                              <h3 className="post-title">
                                <Link to={`/post/${featuredblog.id}`}>
                                  {featuredblog.title}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })
                : ""}
            </div>
            {/*<div className="aside-widget">
                        <div className="section-title">
                            <h2>Catagories</h2>
                        </div>
                        <div className="category-widget">
                            <ul>
                                <li><a href="#" className="cat-1">Web Design<span>340</span></a></li>
                                <li><a href="#" className="cat-2">JavaScript<span>74</span></a></li>
                                <li><a href="#" className="cat-4">JQuery<span>41</span></a></li>
                                <li><a href="#" className="cat-3">CSS<span>35</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside-widget">
                        <div className="tags-widget">
                            <ul>
                                <li><a href="#">Chrome</a></li>
                                <li><a href="#">CSS</a></li>
                                <li><a href="#">Tutorial</a></li>
                                <li><a href="#">Backend</a></li>
                                <li><a href="#">JQuery</a></li>
                                <li><a href="#">Design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">JavaScript</a></li>
                                <li><a href="#">Website</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Archive</h2>
                        </div>
                        <div className="archive-widget">
                            <ul>
                                <li><a href="#">January 2018</a></li>
                                <li><a href="#">Febuary 2018</a></li>
                                <li><a href="#">March 2018</a></li>
                            </ul>
                        </div>
                    </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
