import React, {useEffect } from "react";
import Reply from "../components/Reply";
import { useNavigate , useParams } from "react-router-dom";


export default function PostReply() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
        navigate("/login");
    }
  }, []);

  const params = useParams();
  const postId = params.postId;

  return (
    <>
      <div className="FormContainer">
        <Reply postId={postId}/>
      </div>
    </>
  );
}
