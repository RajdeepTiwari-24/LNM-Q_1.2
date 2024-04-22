import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import {
  allPostsRoute,
  addPostRoute,
  addReplyRoute,
  deletePostRoute,
  deleteReplyRoute,
} from "../utils/APIRoutes";


export function InputDialog({ posts, setPosts }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [currUsername, setCurrUsername] = useState(null);
  const [currUserId, setCurrUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const GetPosts = async ()=>{
      axios
      .get(`${allPostsRoute}`)
      .then((res) => {
        const postData = Array.isArray(res.data) ? res.data.reverse() : [];
        setTimeout(() => {
          setPosts(postData);
          setLoading(false);
        }, 600);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    }
    GetPosts();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId= JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUsername(username);
      setCurrUserId(userId);
    }
    
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.elements.text.value;
    const topic =event.target.elements.topic.value;
    if (text.length < 1) {
      alert("Empty");
      return ;
    }
    if(topic.length<1){
      alert("Topic Required");
      return ;
    }
    const { data } = await axios.post(addPostRoute, {
      text,
      topic,
      currusername: currUsername,
      currUserId
    });
    if (data.status === false) {
      alert(data.msg);
    }
    if (data.status === true) {
      alert("Post Added Successfully");
    }
    event.target.elements.text.value = "";
    event.target.elements.topic.value = "";
    setOpen(false);
    setPosts([data.post, ...posts]);
  };

  return (
    <>
      <button
        className="bg-gray-300 border-1 p-2 px-8 lg:px-24 rounded-full  shadow-md border-gray-200 mx-auto z-2 "
        onClick={() => setOpen(true)}
      >
        What do you want to ask or share?
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            What do you want to share or ask?
                          </Dialog.Title>
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Topic"
                              name="topic"
                              min="1"
                            />
                            <textarea
                              placeholder="ADD TEXT HERE"
                              name="text"
                              minLength={1}
                              rows={4}
                              style={{ width: "100%", maxWidth: "500px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        //   onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        ADD
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export function ReplyDialog({ postId, post, setpost }) {
  const [open, setOpen] = useState(false);
  const [currusername, setusername] = useState(null);
  const cancelButtonRef = useRef(null);
  const [reload, setreload] = useState(false);
  const [currUsername, setCurrUsername] = useState(null);
  const [currUserId, setCurrUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("User check");
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setusername(username);
      setCurrUserId(userId);
    }
  }, []);

  useEffect(()=>{
    setLoading(true);
    const GetPost= async ()=>{
      try {
        const {data} = await axios.get(`${allPostsRoute}/${postId}`);
        setTimeout(() => {
          setpost(data.post);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    GetPost();
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(
      localStorage.getItem("USER")
    ).username;
    const userId= JSON.parse(localStorage.getItem("USER"))._id;
    setusername(username);
    setCurrUserId(userId);
    }
},[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const  text  = event.target.elements.text.value;
    if(text.length <1){
        alert("Empty");
        return false;
    }
    const {data} = await axios.post(addReplyRoute, {
        text,
        currusername,
        userId: currUserId,
        postId
    });
    if (data.status === false) {
        alert(data.msg);
     }
    if (data.status === true) {
        alert("Reply Added Successfully");
    }
    event.target.elements.text.value="";
    console.log(data);
    setOpen(false);
    setpost(data.post);
  };

  return (
    <>
      <button
        className="bg-gray-300 border-1 p-2 px-8 lg:px-24 rounded-full  shadow-md border-gray-200 mx-auto z-2 "
        onClick={() => setOpen(true)}
      >
        Reply
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Add Reply
                          </Dialog.Title>
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Reply"
                              name="text"
                              min="1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        //   onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        ADD
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* {loading ? <Spinner /> : null} */}
    </>
  );
}