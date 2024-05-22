import React, { useEffect, useState } from "react";
import axios from "axios";
import { allPostsRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ComboboxDemo } from "./ui/combobox";

// export default function Filter({ setPosts, setresetFilter, resetFilter }) {
//   const [searchCriteria, setSearchCriteria] = useState("Empty");
//   const [filterPosts, setFilterPosts] = useState(null);
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 4000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };
//   useEffect(() => {
//     const GetPosts = async () => {
//       try {
//         const response = await axios.get(`${allPostsRoute}`);
//         setFilterPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         toast.error(
//           "Internal Server Error, Retry After Sometime",
//           toastOptions
//         );
//       }
//     };
//     GetPosts();
//   }, [filterPosts]);

//   const handleFilter = async (event) => {
//     event.preventDefault();
//     try {
//       //console.log(filterPosts);
//       let topic = "Empty";
//       let username = "Empty";
//       let year = "Empty";
//       let branch = "Empty";

//       if (searchCriteria === "topic") {
//         topic = event.target.elements.topic.value;
//         //console.log(topic);
//         if (topic.length == 0) {
//           toast.error(
//             "Topic is empty, please provide a topic or Reset Filter",
//             toastOptions
//           );
//           return;
//         }
//       } else if (searchCriteria === "username") {
//         username = event.target.elements.username.value;
//         if (username.length == 0) {
//           toast.error(
//             "Username is empty, please provide an username or Reset Filter",
//             toastOptions
//           );
//           return;
//         }
//       }
//       if (event.target.elements.year.value !== "") {
//         year = event.target.elements.year.value.trim();
//         if (year[0] === "y" || year[0] === "Y") {
//           year = year.substr(1);
//         }
//         if (isNaN(year) || parseInt(year) < 0 || parseInt(year) > 24) {
//           toast.error("Wrong Year! Please enter a valid year", toastOptions);
//           return;
//         }
//       }

//       if (event.target.elements.branch.value !== "") {
//         branch = event.target.elements.branch.value;
//       }

//       const filteredPosts = filterPosts.filter((post) => {
//         return (
//           (topic === "Empty" ||
//             post.topic.toLowerCase() === topic.toLowerCase()) &&
//           (username === "Empty" ||
//             post.username.toLowerCase() === username.toLowerCase()) &&
//           (year === "Empty" ||
//             post.userId.year.toLowerCase() === year.toLowerCase()) &&
//           (branch === "Empty" ||
//             post.userId.branch.toLowerCase() === branch.toLowerCase())
//         );
//       });
//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const handleReset = () => {
//     const radioButtons = document.querySelectorAll('input[type="radio"]');
//     radioButtons.forEach((radioButton) => {
//       radioButton.checked = false;
//     });
//     const topicInput = document.getElementsByName("topic")[0];
//     const usernameInput = document.getElementsByName("username")[0];
//     const yearInput = document.getElementsByName("year")[0];

//     if (topicInput) {
//       topicInput.value = "";
//     }
//     if (usernameInput) {
//       usernameInput.value = "";
//     }
//     if (yearInput) {
//       yearInput.value = "";
//     }
//     setSearchCriteria("Empty");
//     setresetFilter(!resetFilter);
//     // setFilterPosts(null);
//   };

//   return (
//     <>
//       <Drawer>
//         <DrawerTrigger>Filter</DrawerTrigger>
//         <DrawerContent>
//           <form action="" onSubmit={handleFilter}>
//             <DrawerHeader>
//               <DrawerTitle>Filter Preferences</DrawerTitle>
//               <DrawerDescription>
//                 Posts will be filtered based on your inputs.
//               </DrawerDescription>
//             </DrawerHeader>
//             <label>
//               <input
//                 type="radio"
//                 name="criteria"
//                 value="topic"
//                 checked={searchCriteria === "topic"}
//                 onChange={() => setSearchCriteria("topic")}
//               />
//               Search by Topic
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="criteria"
//                 value="username"
//                 checked={searchCriteria === "username"}
//                 onChange={() => setSearchCriteria("username")}
//               />
//               Search by Username
//             </label>
//             <div>
//               {searchCriteria === "topic" ? (
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-gray-300 rounded-md"
//                   placeholder="Search by Topic"
//                   name="topic"
//                   min="1"
//                 />
//               ) : searchCriteria === "username" ? (
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-gray-300 rounded-md"
//                   placeholder="Search by Username"
//                   name="username"
//                   min="1"
//                 />
//               ) : null}
//             </div>
//             <div>
//               <input
//                 type="text"
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 placeholder="Enter Batch Year {eg: (Y21 , 21)}"
//                 name="year"
//                 min="1"
//               />
//             </div>
//             <div>
//               By Branch :
//               <label>
//                 <input type="radio" name="branch" value="ucs" />
//                 UCS
//               </label>
//               <label>
//                 <input type="radio" name="branch" value="ucc" />
//                 UCC
//               </label>
//               <label>
//                 <input type="radio" name="branch" value="ume" />
//                 UME
//               </label>
//               <label>
//                 <input type="radio" name="branch" value="uec" />
//                 UEC
//               </label>
//             </div>

//             <ToastContainer />
//             <DrawerFooter>
//               <button
//                 className="maxw-300px p-3 bg-[#1E75D5] text-white rounded-md inline mx-[30px]"
//                 type="submit"
//                 onClick={setDrawer}
//               >
//                 Filter
//               </button>
//               <button
//                 className="maxw-200px p-3 bg-red-500 text-white rounded-md inline"
//                 onClick={handleReset}
//               >
//                 Reset Filter
//               </button>
//               <DrawerClose>
//                 Cancel
//               </DrawerClose>
//             </DrawerFooter>
//           </form>
//         </DrawerContent>
//       </Drawer>

//     </>
//   );
// }

export default function Filter({ setPosts, setresetFilter, resetFilter }) {
  const [searchCriteria, setSearchCriteria] = useState("Empty");
  const [filterPosts, setFilterPosts] = useState(null);
  const [filters, setFilters] = useState({
    topic: "",
    username: "",
    year: "",
    branch: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const GetPosts = async () => {
      try {
        const response = await axios.get(`${allPostsRoute}`);
        setFilterPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    GetPosts();
  }, [filterPosts]);

  const handleFilter = async (event) => {
    event.preventDefault();
    try {
      let { topic, username, year, branch } = filters;

      if (searchCriteria === "topic" && !topic) {
        toast.error(
          "Topic is empty, please provide a topic or Reset Filter",
          toastOptions
        );
        return;
      }
      if (searchCriteria === "username" && !username) {
        toast.error(
          "Username is empty, please provide a username or Reset Filter",
          toastOptions
        );
        return;
      }
      if (year) {
        year = year.trim();
        if (year[0].toLowerCase() === "y") {
          year = year.substr(1);
        }
        if (isNaN(year) || parseInt(year) < 0 || parseInt(year) > 24) {
          toast.error("Wrong Year! Please enter a valid year", toastOptions);
          return;
        }
      }

      const filteredPosts = filterPosts.filter((post) => {
        return (
          (topic === "" || post.topic.toLowerCase() === topic.toLowerCase()) &&
          (username === "" ||
            post.username.toLowerCase() === username.toLowerCase()) &&
          (year === "" ||
            post.userId.year.toLowerCase() === year.toLowerCase()) &&
          (branch === "" ||
            post.userId.branch.toLowerCase() === branch.toLowerCase())
        );
      });

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleReset = () => {
    setFilters({
      topic: "",
      username: "",
      year: "",
      branch: "",
    });
    setSearchCriteria("Empty");
    setresetFilter(!resetFilter);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Drawer>
      <DrawerTrigger>Filter</DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleFilter}>
          <DrawerHeader>
            <DrawerTitle>Filter Preferences</DrawerTitle>
            <DrawerDescription>
              Posts will be filtered based on your inputs.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-1 m-5 gap-2">
            <label>
              <input
                type="radio"
                name="criteria"
                value="topic"
                checked={searchCriteria === "topic"}
                onChange={() => setSearchCriteria("topic")}
              />
              Search by Topic
            </label>
            <label>
              <input
                type="radio"
                name="criteria"
                value="username"
                checked={searchCriteria === "username"}
                onChange={() => setSearchCriteria("username")}
              />
              Search by Username
            </label>

            <div>
              {searchCriteria === "topic" ? (
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Search by Topic"
                  name="topic"
                  value={filters.topic}
                  onChange={handleChange}
                  min="1"
                />
              ) : searchCriteria === "username" ? (
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Search by Username"
                  name="username"
                  value={filters.username}
                  onChange={handleChange}
                  min="1"
                />
              ) : null}
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter Batch Year {eg: (Y21 , 21)}"
                name="year"
                value={filters.year}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div>
              By Branch :
              {/* <label>
                <input
                  type="radio"
                  name="branch"
                  value="ucs"
                  checked={filters.branch === "ucs"}
                  onChange={handleChange}
                />
                UCS
              </label>
              <label>
                <input
                  type="radio"
                  name="branch"
                  value="ucc"
                  checked={filters.branch === "ucc"}
                  onChange={handleChange}
                />
                UCC
              </label>
              <label>
                <input
                  type="radio"
                  name="branch"
                  value="ume"
                  checked={filters.branch === "ume"}
                  onChange={handleChange}
                />
                UME
              </label>
              <label>
                <input
                  type="radio"
                  name="branch"
                  value="uec"
                  checked={filters.branch === "uec"}
                  onChange={handleChange}
                />
                UEC
              </label> */}
              <ComboboxDemo onChange={handleChange} value={filters.branch} />
            </div>
          </div>

          <ToastContainer />
          <DrawerFooter>
            <div className="flex justify-center gap-2">
              <DrawerClose
                className="min-w-26 p-3 bg-black text-white rounded-md"
                type="submit"
              >
                Filter
              </DrawerClose>
              <button
                className="min-w-26 p-3 bg-red-500 text-white rounded-md "
                type="button"
                onClick={handleReset}
              >
                Reset Filter
              </button>
            </div>

            <DrawerClose>Cancel</DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
