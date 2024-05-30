import Logout from "./Logout";
import Filter from "./Filter";
import axios from "axios";
import { allPostsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Sorting from "./Sorting";
import { React, useState, useEffect } from "react";
import "../css/post.css";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/garfield-gif-4-unscreen.gif";
import logo from "../assets/Removal-689.png";
import { NavPostDialog, PostDialog } from "../components/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useRef } from "react";
import { BiMessageAdd } from "react-icons/bi";

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
  const [currUsername, setCurrUsername] = useState(null);
  const [isliked, setisliked] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const GetPosts = async () => {
      axios
        .get(`${allPostsRoute}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((e) => {
          console.log(e);
          toast.error(
            "Internal Server Error, Retry After Sometime",
            toastOptions
          );
        });
    };
    GetPosts();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
      setCurrUsername(username);
    }
  }, []);

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.post(allPostsRoute, {
        postId,
        userId: currUserId,
      });
      setPosts(
        posts.map((p) => (p._id === postId ? { ...p, likes: data.likes } : p))
      );
      setisliked(!isliked);
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error, Retry After Sometime", toastOptions);
    }
  };

  const handleReplyClick = (postId) => {
    console.log(postId);
    navigate(`/posts/${postId}`);
  };

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="App">
      <div className="bg-white">
        <header className="sticky inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-4 lg:px-8 border-gray-200 bg-[#F9EFF9] drop-shadow-md"
            aria-label="Global"
          >
            <div className="flex lg:flex-1 gap-x-12">
              <button href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">LNM-Q</span>
                <img className="h-10 w-auto" src={logo} alt="" />
              </button>
              <div>
                <Sorting
                  className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  posts={posts}
                  setPosts={setPosts}
                  username={false}
                />
              </div>
              <div>
                <Filter
                  className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  setPosts={setPosts}
                />
              </div>
              <NavPostDialog
                posts={posts}
                setPosts={setPosts}
                currUserId={currUserId}
                currUsername={currUsername}
              />
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
                className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => handleUsernameClick(currUserId)}
              >
                My Profile
              </button>
              <button
                href="#"
                className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                  <img className="h-8 w-auto" src={logo} alt="" />
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

        <div className="relative isolate px-6 pt-14 lg:px-8 snap-child">
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

          <div className="content relative  h-[82vh]">
            <img
              src={img1}
              alt="Placeholder"
              className="layer bg-image hidden lg:block lg:absolute -z-20"
            />
            <img
              src={img2}
              alt="Placeholder"
              className="layer bg-image hidden lg:block lg:absolute -z-20 right-0"
            />
            <div className="layer mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 z-50 lg:relative">
              <div className="text-center">
                <h1 className="group font-thunder tracking-wide text-8xl text-transparent bg-clip-text bg-[#5B3DD2] drop-shadow-md hover:drop-shadow-xl transition duration-150 hover:ease-in">
                  LNM-
                  <h1 className="font-thunderit tracking-wide text-8xl text-transparent inline-block bg-clip-text pr-3 bg-[#5B3DD2] transition duration-150 group-hover:bg-gradient-to-r group-hover:from-[#5B3DD2] group-hover:to-[#EB993D] group-hover:ease-in ">
                    Q
                  </h1>
                  .
                </h1>{" "}
                <br />
                <PostDialog
                  posts={posts}
                  setPosts={setPosts}
                  currUserId={currUserId}
                  currUsername={currUsername}
                />
                <div className="mt-10 flex items-center justify-center gap-x-6 ">
                  <button
                    href="#"
                    onClick={handleClick}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    All Posts <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-center bottom-0 -z-20 lg:hidden">
                <div className="bg-image absolute -z-20 bottom-0 m-auto">
                  <img className="-z-20" src={img3} alt="Placeholder" />
                </div>
              </div>
            </div>
          </div>
          <ul ref={ref} className="z-100 lg:grid lg:grid-cols-2 lg:gap-4">
            {posts &&
              posts.map((post) => (
                <li key={post._id}>
                  <Card>
                    <CardHeader>
                      <CardTitle onClick={() => handleReplyClick(post._id)}>
                        {" "}
                        {post.topic}
                      </CardTitle>
                      <CardDescription
                        onClick={() => handleUsernameClick(post.userId._id)}
                      >
                        {post.username}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-36 w-full rounded-md border p-2">
                        <p>{post.text}</p>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="grid grid-cols-3">
                      <div className="grid grid-cols-2">
                        <button
                          className="hidden lg:inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 "
                          onClick={() => handleReplyClick(post._id)}
                        >
                          {" "}
                          Reply <sub>{post.replies.length}</sub>
                        </button>
                        <button className="lg:hidden">
                          {" "}
                          <sub>{post.replies.length}</sub>
                          <BiMessageAdd
                            onClick={() => handleReplyClick(post._id)}
                          />
                        </button>
                        {post.imageUrl && (
                          <HoverCard>
                            <HoverCardTrigger>
                              <MdAttachFile size={23} />
                            </HoverCardTrigger>
                            <HoverCardContent>
                              <img
                                src={`${post.imageUrl}`}
                                alt="image"
                                className="h-[150px] w-[150px] mx-auto"
                              />
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                      <div>
                        {post.likes.indexOf(currUserId) === -1 ? (
                          <>
                            <button onClick={() => handleLike(post._id)}>
                              <FaRegHeart size={23} color="red" />
                            </button>
                            <p className="inline"> {post.likes.length}</p>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleLike(post._id)}>
                              <FaHeart size={23} color="red" />
                            </button>
                            <p className="inline"> {post.likes.length}</p>
                          </>
                        )}
                      </div>

                      <div className="post-time">
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </CardFooter>
                  </Card>

                  <br />
                </li>
              ))}
          </ul>

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
