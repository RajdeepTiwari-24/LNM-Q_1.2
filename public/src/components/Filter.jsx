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

export default function Filter({ setPosts }) {
  const [searchCriteria, setSearchCriteria] = useState("Empty");
  const [originalPosts, setOriginalPosts] = useState([]);
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
        setOriginalPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error(
          "Internal Server Error, Retry After Sometime",
          toastOptions
        );
      }
    };
    GetPosts();
  }, []);

  const handleFilter = async (event) => {
    event.preventDefault();
    try {
      let { topic, username, year, branch } = filters;

      if (searchCriteria === "topic") {
        username = "";
        if (!topic) {
          toast.error(
            "Topic is empty, please provide a topic or Reset Filter",
            toastOptions
          );
          return;
        }
      }
      if (searchCriteria === "username") {
        topic = "";
        if (!username) {
          toast.error(
            "Username is empty, please provide a username or Reset Filter",
            toastOptions
          );
          return;
        }
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

      const filteredPosts = originalPosts.filter((post) => {
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
    setPosts(originalPosts);
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
      <DrawerTrigger className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
        Filter
      </DrawerTrigger>
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
