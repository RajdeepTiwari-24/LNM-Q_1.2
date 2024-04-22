import React ,{useState} from 'react';


export default function Sorting({ posts, setPosts, username}) {
  const [toggleposts, settoggleposts] =useState(false);
  const [toggleuser, settoggleuser] = useState(false);
  const [toggletopic, settoggletopic] = useState(false);
  const [togglelikes, settogglelikes] = useState(false);

  const OldtoNew = () => {
    const sortedPosts = [...posts].reverse();
    setPosts(sortedPosts);
    settoggleposts(!toggleposts);
  };

  const UserSorting = () => {
    const sortedPosts = [...posts].sort((a, b) => {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        return toggleuser ? 
            (usernameA < usernameB ? -1 : (usernameA > usernameB ? 1 : 0)) :
            (usernameA > usernameB ? -1 : (usernameA < usernameB ? 1 : 0));
    });
    setPosts(sortedPosts);
    settoggleuser(!toggleuser);
 };

 const TopicSorting = () => {
  const sortedPosts = [...posts].sort((a, b) => {
      const topicA = a.topic.toLowerCase();
      const topicB = b.topic.toLowerCase();
      return toggletopic ? 
          (topicA < topicB ? -1 : (topicA > topicB ? 1 : 0)) :
          (topicA > topicB ? -1 : (topicA < topicB ? 1 : 0));
  });
  setPosts(sortedPosts);
  settoggletopic(!toggletopic);
};

const LikesSorting = () => {
  const sortedPosts = [...posts].sort((a, b) => {
    const lengthA = a.likes.length;
    const lengthB = b.likes.length;
      return togglelikes ? 
          (lengthA < lengthB ? -1 : (lengthA > lengthB ? 1 : 0)) :
          (lengthA > lengthB ? -1 : (lengthA < lengthB ? 1 : 0));
  });
  setPosts(sortedPosts);
  settogglelikes(!togglelikes);
};

  return (
    <div className="FormContainer grid grid-cols-2 border-8">
      <p className="">Sort by:</p>
      <div className="">
        {toggleposts === false ? (
          <button className="block" onClick={OldtoNew}>
            Oldest to Latest
          </button>
        ) : (
          <button className="block" onClick={OldtoNew}>
            Latest to Oldest
          </button>
        )}
        {!username && (
          <button className="block" onClick={UserSorting}>
            Username
          </button>
        )}
        <button className="block" onClick={TopicSorting}>
          Topic
        </button>
        <button className='block' onClick={LikesSorting}>Likes</button>
      </div>
      
      </div>
  );
}
