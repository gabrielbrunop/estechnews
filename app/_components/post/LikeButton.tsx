"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { MouseEventHandler, useState } from "react"
import { createClient } from "@/utils/auth/client"

type Props = {
  likes: number,
  userLiked: boolean,
  postId: string
}

export default function LikeButton({ likes, userLiked, postId }: Props) {
  const supabase = createClient();
  
  const [liked, setLiked] = useState(userLiked);
  const [numberOfLikes, setNumberOfLikes] = useState(likes);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data: likeData, error } = await supabase
      .rpc("toggle_post_like", {
        post_id: postId,
        user_id: userData.user.id
      });

    if (error) return;

    setLiked(!liked);
    setNumberOfLikes(likeData);
  }

  return (
    <button onClick={handleClick} className="flex flex-row items-center gap-2 outline-none text-indigo-500 font-medium gray-200 rounded">
      {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      {numberOfLikes} curtida{numberOfLikes !== 1 ? "s" : ""}
    </button>
  )
}
