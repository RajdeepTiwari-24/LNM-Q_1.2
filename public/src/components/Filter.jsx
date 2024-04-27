import React, { useEffect, useState } from 'react';
import axios from "axios";
import { allPostsRoute } from "../utils/APIRoutes";


export default function Filter({ setPosts, setresetFilter, resetFilter}) {
  const [searchCriteria, setSearchCriteria] = useState('Empty');
  const [filterPosts, setFilterPosts] = useState(null);

  useEffect(() => {
    const GetPosts = async () => {
        try {
            const response = await axios.get(`${allPostsRoute}`);
            setFilterPosts(response.data); 
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    GetPosts();
}, [filterPosts]);

  
  const handleFilter = async (event) => {
    event.preventDefault(); 
    try {
      console.log(filterPosts);
      let topic = 'Empty';
      let username ='Empty';
      let year= 'Empty';
      let branch= 'Empty';

      if(searchCriteria==='topic'){
          topic=event.target.elements.topic.value;
          
      }else if(searchCriteria==='username'){
          username= event.target.elements.username.value;
      }
      if (event.target.elements.year.value !== '') {
          year = event.target.elements.year.value.trim();
          if (year[0] === 'y' || year[0] === 'Y') {
            year = year.substr(1);
          }
          if (isNaN(year) || parseInt(year) < 0 || parseInt(year) > 24) {
            alert('Wrong Year! Please enter a valid year');
            return;
          }
        }
        
      if(event.target.elements.branch.value!==''){
          branch=event.target.elements.branch.value;
      }

      const filteredPosts = filterPosts.filter((post) => {
          return (
            (topic === 'Empty' || post.topic.toLowerCase() === topic.toLowerCase()) &&
            (username === 'Empty' || post.username.toLowerCase() === username.toLowerCase()) &&
            (year === 'Empty' || post.userId.year.toLowerCase() === year.toLowerCase()) &&
            (branch === 'Empty' || post.userId.branch.toLowerCase() === branch.toLowerCase())
          );
        });
      setPosts(filteredPosts);
      
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  };

  const handleReset=()=>{
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
    const topicInput = document.getElementsByName('topic')[0];
    const usernameInput = document.getElementsByName('username')[0];
    const yearInput = document.getElementsByName('year')[0];

    if (topicInput) {
        topicInput.value = '';
    }
    if (usernameInput) {
        usernameInput.value = '';
    }
    if (yearInput) {
        yearInput.value = '';
    }
    setSearchCriteria('Empty');
    setresetFilter(!resetFilter);
    setFilterPosts(null);
  }

  return (
    <>
    <form action="" onSubmit={handleFilter}>
        <label>
          <input
            type="radio"
            name="criteria"
            value="topic"
            checked={searchCriteria === 'topic'}
            onChange={() => setSearchCriteria('topic')}
          />
          Search by Topic
        </label>
        <label>
          <input
            type="radio"
            name="criteria"
            value="username"
            checked={searchCriteria === 'username'}
            onChange={() => setSearchCriteria('username')}
          />
          Search by Username
        </label>
        <div>
        {searchCriteria === 'topic' ? (
            <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Search by Topic"
                name="topic"
                min="1"
            />
        ) : searchCriteria === 'username' ? (
            <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Search by Username"
                name="username"
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
          min='1'
        />
      </div>
      <div>
        By Branch :   
        <label>
          <input
            type="radio"
            name="branch"
            value="ucs"
          />
          UCS
        </label>
        <label>
          <input
            type="radio"
            name="branch"
            value="ucc"
          />
          UCC
        </label>
        <label>
          <input
            type="radio"
            name="branch"
            value="ume"
          />
          UME
        </label>
        <label>
          <input
            type="radio"
            name="branch"
            value="uec"
          />
          UEC
        </label>
      </div>
      <button className="maxw-300px p-3 bg-[#1E75D5] text-white rounded-md inline mx-[30px]" type="submit">
        Filter
      </button>
      <button className="maxw-200px p-3 bg-red-500 text-white rounded-md inline" onClick={handleReset}>Reset Filter</button>
    </form>
    
    </>
  );
}
