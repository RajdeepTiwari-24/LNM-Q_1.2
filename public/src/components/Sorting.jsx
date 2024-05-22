import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Sorting({ posts, setPosts, username }) {
  const [toggleposts, settoggleposts] = useState(false);
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
      return toggleuser
        ? usernameA < usernameB
          ? -1
          : usernameA > usernameB
          ? 1
          : 0
        : usernameA > usernameB
        ? -1
        : usernameA < usernameB
        ? 1
        : 0;
    });
    setPosts(sortedPosts);
    settoggleuser(!toggleuser);
  };

  const TopicSorting = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const topicA = a.topic.toLowerCase();
      const topicB = b.topic.toLowerCase();
      return toggletopic
        ? topicA < topicB
          ? -1
          : topicA > topicB
          ? 1
          : 0
        : topicA > topicB
        ? -1
        : topicA < topicB
        ? 1
        : 0;
    });
    setPosts(sortedPosts);
    settoggletopic(!toggletopic);
  };

  const LikesSorting = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const lengthA = a.likes.length;
      const lengthB = b.likes.length;
      return togglelikes
        ? lengthA < lengthB
          ? -1
          : lengthA > lengthB
          ? 1
          : 0
        : lengthA > lengthB
        ? -1
        : lengthA < lengthB
        ? 1
        : 0;
    });
    setPosts(sortedPosts);
    settogglelikes(!togglelikes);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Sort</DropdownMenuTrigger>
      <DropdownMenuContent>
        {toggleposts === false ? (
          <DropdownMenuItem className="block" onClick={OldtoNew}>
            Oldest to Latest
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="block" onClick={OldtoNew}>
            Latest to Oldest
          </DropdownMenuItem>
        )}
        {!username && (
          <DropdownMenuItem className="block" onClick={UserSorting}>
            Username
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="block" onClick={TopicSorting}>
          Topic
        </DropdownMenuItem>
        <DropdownMenuItem className="block" onClick={LikesSorting}>
          Likes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
