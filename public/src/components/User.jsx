import React, { useEffect, useState } from "react";
import { allPostsRoute } from "../utils/APIRoutes";
import Logout from "./Logout";
import Sorting from "./Sorting";
import axios from "axios";
import { getUserRoute } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import "../css/post.css";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import img1 from "../assets/41656138_327153188042489_2142840811958576807_n.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useRef } from "react";
import logo from "../assets/Removal-689.png";

export default function User({ userId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState(null);
  const [isliked, setisliked] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${getUserRoute}/${userId}`);
        data.posts.reverse();
        setPosts(data.posts);
        setUser(data);
      } catch (error) {
        console.log(error);
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    fetchData();
    if (localStorage.getItem("USER")) {
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
    }
  }, []);

  const handleReplyClick = (postId) => {
    navigate(`/posts/${postId}`);
  };
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
              <div className="block">
                <Sorting posts={posts} setPosts={setPosts} username={true} />
              </div>
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
            <div className="hidden lg:flex lg:justify-end lg:gap-x-12">
              <Link
                to="/posts"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                <button className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Home
                </button>
              </Link>

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
                    <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      <Link to="/posts">Home</Link>
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
        {user && (
          <>
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

              <div className="-z-20 lg:grid lg:grid-cols-2 content relative h-[82vh] snap-start">
                <div className=" hidden lg:flex lg:justify-center lg:items-center">
                  <img
                    src={img1}
                    alt="Placeholder"
                    className="bg-image hidden lg:block lg:absolute -z-20 max-h-[65vh]"
                  />
                </div>

                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 z-100 ">
                  <div className="text-center">
                    {currUserId === userId ? (
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        My Profile
                      </h1>
                    ) : (
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        {user.username}'s Profile
                      </h1>
                    )}
                    <p className="text-xl mt-2 font-bold tracking-tight text-gray-900">
                      Email: {user.email}
                    </p>
                    <p className="text-xl font-bold tracking-tight text-gray-900">
                      Year: {user.year}
                    </p>
                    <p className="text-xl font-bold tracking-tight text-gray-900">
                      Branch: {user.branch}
                    </p>
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
                </div>
              </div>
              <ul ref={ref} className="z-100 lg:grid lg:grid-cols-2 gap-4">
                {posts &&
                  posts.map((post) => (
                    <li key={post._id}>
                      <Card>
                        <CardHeader>
                          <CardTitle onClick={() => handleReplyClick(post._id)}>
                            {" "}
                            {post.topic}
                          </CardTitle>
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
              {/* </div> */}
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
          </>
        )}
      </div>
    </div>
  );
}
