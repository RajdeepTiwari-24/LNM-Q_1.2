import Logout from "./Logout";
import Filter from "./Filter";
import axios from "axios";
import { allPostsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Sorting from "./Sorting";
import { React, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "../css/post.css"; 
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { PostDialog } from "../components/Dialog";

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
  const [currUsername, setCurrUsername] = useState(null);
  const [isliked, setisliked] = useState(false);
  const [isfilter, setisfilter] =useState(false);
  const [resetFilter , setresetFilter] =useState(false);

  useEffect(() => {
    const GetPosts = async ()=>{
      axios
      .get(`${allPostsRoute}`)
      .then((res) => {
          setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    GetPosts();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId= JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
      setCurrUsername(username);
    }
  }, [resetFilter]);
  
  const handleLike = async (postId) => {
    try {
        const { data } = await axios.post(allPostsRoute,{
          postId,
          userId: currUserId
        });
        setPosts(posts.map(p => p._id === postId ? { ...p, likes: data.likes } : p));
        setisliked(!isliked)
    } catch (error) {
        console.error(error);
    }
    
};

  const handleReplyClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };
  const handleFilter =()=>{
    setisfilter(!isfilter);
  }


  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const springProps1 = useSpring({
    // transform: `translateX(${-offsetY * 1.5}px)`,
  });
  const springProps2 = useSpring({
    // transform: `translateX(${offsetY * 1.5}px)`,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   const checkScrollPosition = () => {
  //     if (window.pageYOffset > 430) {
  //       setShowButton(true);
  //     } else {
  //       setShowButton(false);
  //     }
  //   };

  //   window.addEventListener("scroll", checkScrollPosition);

  //   return () => window.removeEventListener("scroll", checkScrollPosition);
  // }, []);

  return (
    <div className="App">
      <div className="bg-white">
        <header className="sticky inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1 lg:gap-x-12">
              <button href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">LNM-Q</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </button>
              <div className={`${!showButton ? "hidden" : ""} justify-start`}>
                <Sorting posts={posts} setPosts={setPosts} username={false} />
              </div>
            </div>

            <div className={`${!showButton ? "hidden" : ""}`}>
              <PostDialog posts={posts} setPosts={setPosts} currUserId={currUserId} currUsername={currUsername}/>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
              <button
                className="text-sm font-semibold leading-6 text-gray-900 "
                onClick={() => handleUsernameClick(currUserId)}
              >
                My Profile
              </button>
              <button
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <Logout />
              </button>
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <button href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">LNM-Q</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => handleUsernameClick(currUserId)}
                    >
                      My Profile
                    </button>
                  </div>
                  <div className="py-6">
                    <button
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <Logout />
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8 ">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="content relative overflow-y-scroll h-[82vh] snap-start">
            <animated.div
              style={springProps1}
              className="bg-image hidden lg:block lg:absolute lg:-z-1"
            >
              <img src={img1} alt="Placeholder" />
            </animated.div>
            <animated.div
              style={springProps2}
              className="bg-image hidden lg:block lg:absolute lg:-z-1 right-0"
            >
              <img src={img2} alt="Placeholder" />
            </animated.div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 z-100 ">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  LNM-Q
                </h1>
                <PostDialog posts={posts} setPosts={setPosts} currUserId={currUserId} currUsername={currUsername}/>
                <div className="mt-10 flex items-center justify-center gap-x-6 ">
                  <div>
                    <Sorting
                      posts={posts}
                      setPosts={setPosts}
                      username={false}
                    />
                  </div>
                  <button
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    All Posts <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center bottom-0 -z-1000">
              <div className="bg-image absolute -z-1000 bottom-0 m-auto">
                <img className="-z-1000" src={img3} alt="Placeholder" />
              </div>
            </div>
          </div>
          <button className="w-full p-3 bg-[#1E75D5] text-white rounded-md inline mx-[30px]" onClick={handleFilter}>Filter Posts</button>
          {isfilter && (
            <Filter setPosts={setPosts}  setresetFilter={setresetFilter} resetFilter={resetFilter}/>
          )}
          <div className="snap-container">
            <ul>
              {posts &&
                posts.map((post) => (
                  <li key={post._id}>
                    <div className="snap-child-s sm:snap-child-l bg-image">
                      <div className="px-6 py-4">
                        <p onClick={() => handleUsernameClick(post.userId._id)}>
                          {post.username}
                        </p>
                        <div
                          className="font-bold text-xl mb-2"
                          onClick={() => handleReplyClick(post._id)}
                        >
                          {post.topic}
                        </div>
                        <p className="text-gray-700 text-base">{post.text}</p>
                        {post.imageUrl && (
                          <img src={`${post.imageUrl}`} alt="image" className="h-[150px] w-[150px] mx-auto" />
                        )}
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <button
                          className="inline-block
                          bg-gray-200
                          rounded-full
                          px-3
                          py-1
                          text-sm
                          font-semibold
                          text-gray-700
                          mr-2
                          mb-2"
                          onClick={() => handleReplyClick(post._id)}
                        >
                          {" "}
                          Reply{" "}
                          <sub>{post.replies.length}</sub>
                        </button>
                      </div>
                      {/* {console.log(post)} */}
                      {post.likes.indexOf(currUserId)=== -1 ? (
                      <>
                        <button onClick={()=> handleLike(post._id)}>Likes: </button>
                        <p className="inline"> {post.likes.length}</p>
                      </>
                        
                    ):(
                      <>
                        <button className="bg-red-500 " onClick={()=> handleLike(post._id)}>Likes: </button>
                        <p className="inline"> {post.likes.length}</p>
                      </>
                    )}
                      <div className="post-time">
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <br />
                  </li>
                ))}
            </ul>
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
