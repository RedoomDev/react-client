import { useState } from "react/cjs/react.development";
import { Post } from "./post";
import { PostWindow } from "./postWindow";

export function KonuPosts({ tag, posts, slug }) {


   const [modal, setModal] = useState(false)
   const [board, setBoard] = useState(false)

   return (
      <>
         <div className="boards bg-zinc-900">

            <div className="boards-head">
               <span className="text-head">{tag} <span className="post-comment-button" type="button" onClick={() => {
                  setBoard(slug)
                  setModal(true)
               }}>[Yeni Gönderi]</span></span>
               <div className="cizgi-2"></div>
               <div className="boards-items">
                  {posts.map(posts => (
                     <Post post={posts}></Post>
                  ))}
               </div>
            </div>
         </div>
         {modal === true ? (<PostWindow setModal={setModal} board={board}></PostWindow>) : (<></>)}
      </>
   )
}