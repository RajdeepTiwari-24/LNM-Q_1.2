import React, { useEffect, useState } from "react";
import {
  allPostsRoute,
  deletePostRoute,
  deleteReplyRoute,
} from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";
import "../css/reply.css";
import { Dialog as HeadlessUIDialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReplyDialog } from "../components/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/Removal-119.png";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { NavReplyDialog } from "../components/Dialog";
import { BiTrash } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { MdAttachFile } from "react-icons/md";
import logo from "../assets/Removal-689.png";

export default function Reply({ postId }) {
  const navigate = useNavigate();
  const [post, setpost] = useState(null);
  const [currUserId, setCurrUserId] = useState(null);
  const [currUsername, setCurrUsername] = useState(null);
  const [isliked, setisliked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const GetPost = async () => {
      try {
        const { data } = await axios.get(`${allPostsRoute}/${postId}`);
        setpost(data.post);
      } catch (error) {
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    GetPost();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUserId(userId);
      setCurrUsername(username);
    }
  }, []);

  const handledeletepost = async () => {
    const { data } = await axios.post(deletePostRoute, {
      postId,
    });
    console.log(data.status);
    if (data.status === false) {
      toast.error("Post Not Deleted", toastOptions);
    }
    if (data.status === true) {
      console.log("aajana2");
      toast.success("Post Deleted Suucessfully", toastOptions);
    }
    setTimeout(() => {
      navigate("/posts");
    }, 2000);
  };

  const handledeletereply = async (replyId) => {
    const { data } = await axios.post(deleteReplyRoute, {
      postId,
      replyId,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success(data.msg, toastOptions);
    }
    setpost(data.post);
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.post(`${allPostsRoute}/${postId}`, {
        userId: currUserId,
      });
      const updatedPost = { ...post, likes: data.likes };
      setpost(updatedPost);
      setisliked(!isliked);
    } catch (error) {
      toast.error("Internal Server Error, Retry After Sometime", toastOptions);
    }
  };

  const handleUsernameClick = (userId) => {
    navigate("/profile", { state: { userId: userId } });
  };

  if (!post) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="App snap-container">
        <div className="bg-white">
          <header className="sticky inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1 gap-x-12">
                <button href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">LNM-Q</span>
                  <img className="h-10 w-auto" src={logo} alt="" />
                </button>
                {/* <div className={`${!showButton ? "hidden" : ""} justify-start`}> */}
                {post && (
                  <NavReplyDialog
                    postId={postId}
                    setpost={setpost}
                    currUserId={currUserId}
                    currUsername={currUsername}
                  />
                )}
                {currUserId === post.userId && (
                  <>
                    <button>
                      <BiTrash size={23} onClick={() => handledeletepost()} />
                    </button>
                    <br />
                  </>
                )}
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
                <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  <Link to="/posts">Home</Link>
                </button>
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
            <HeadlessUIDialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <HeadlessUIDialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                      <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        <Link to="/posts">Home</Link>
                      </button>
                      <button className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
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
              </HeadlessUIDialog.Panel>
            </HeadlessUIDialog>
          </header>
        </div>
        <div className="post-section">
          {post && (
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
                <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold">
                        {" "}
                        {post.topic}
                      </CardTitle>
                      <CardDescription className="text-2xl">
                        {post.username}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-full w-full rounded-md border p-2">
                        <p className="text-lg">{post.text}</p>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="grid grid-cols-3 ">
                      <div className="grid grid-cols-2">
                        <button>
                          {" "}
                          <sub>{post.replies.length}</sub>
                          <NavReplyDialog
                            postId={postId}
                            setpost={setpost}
                            currUserId={currUserId}
                            currUsername={currUsername}
                          />
                        </button>
                        {post.imageUrl && (
                          <div className="lg:hidden">
                            <UIDialog>
                              <DialogTrigger>
                                <MdAttachFile size={23} />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Image:</DialogTitle>
                                  <DialogDescription>
                                    <img
                                      src={`${post.imageUrl}`}
                                      alt="image"
                                      className="h-[150px] w-[150px] mx-auto"
                                    />
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </UIDialog>
                          </div>
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
                  {post.imageUrl && (
                    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
                      <img
                        src={`${post.imageUrl}`}
                        alt="image"
                        className="mx-auto"
                      />
                    </div>
                  )}
                  {!post.imageUrl && (
                    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
                      <img src={img} alt="Placeholder" />
                    </div>
                  )}
                </div>
                {/* <div className=" flex flex-col justify-center items-center text-center">
                    <p>Post: </p>

                    <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      {post.topic}
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      {post.username}
                    </p>

                    <p className="text-md font-semibold leading-6">
                      {post.text}
                    </p>
                    <div>
                      {post.imageUrl && (
                        <div className="lg:hidden">
                          <UIDialog>
                            <DialogTrigger>Attachment</DialogTrigger>
                            <DialogContent>
                              // <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </DialogDescription>
                             // </DialogHeader> 
                              <div className="p-2">
                                <img
                                  src={`${post.imageUrl}`}
                                  alt="image"
                                  className="mx-auto"
                                />
                              </div>
                            </DialogContent>
                          </UIDialog>
                        </div>
                      )}
                    </div>
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
                    <p>{new Date(post.createdAt).toLocaleString()}</p>

                    {currUserId === post.userId && (
                      <>
                        <button
                          className="inline-block  bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                          onClick={() => handledeletepost()}
                        >
                          Delete
                        </button>
                        <br />
                      </>
                    )}
                    <div>
                      <ReplyDialog
                        postId={postId}
                        setpost={setpost}
                        currUserId={currUserId}
                        currUsername={currUsername}
                      />
                    </div>
                  </div>
                  {post.imageUrl && (
                    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
                      <img
                        src={`${post.imageUrl}`}
                        alt="image"
                        className="mx-auto"
                      />
                    </div>
                  )}
                  {!post.imageUrl && (
                    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
                      <img src={img} alt="Placeholder" />
                    </div>
                  )}*/}
                {/* </div>  */}

                {/* <br /> */}
                <div>
                  <div>
                    <p className="text-2xl mt-4">Replies:</p>
                    <ul>
                      {post.replies &&
                        post.replies.map((reply) => (
                          <div className="snap-child-s sm:snap-child-l bg-image">
                            <div className="px-6 py-4">
                              <li key={reply._id}>
                                <div
                                  className="font-bold text-xl "
                                  onClick={() =>
                                    handleUsernameClick(reply.userId)
                                  }
                                >
                                  Username: {reply.username}
                                </div>
                                <p>{reply.text}</p>

                                <p>
                                  {new Date(reply.createdAt).toLocaleString()}
                                </p>
                                {console.log(reply)}
                                {currUserId === reply.userId && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handledeletereply(reply._id)
                                      }
                                      className="inline-block  bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                    >
                                      Delete
                                    </button>
                                    <br />
                                  </>
                                )}
                                <br />
                              </li>
                            </div>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
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
      <ToastContainer />
    </>
  );
}
