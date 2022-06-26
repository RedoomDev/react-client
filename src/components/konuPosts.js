import { useState } from "react";
import { Link } from "react-router-dom";
import { ReklamNormal } from "./adsense/reklam";
import { Post } from "./post";
import { PostWindow } from "./postWindow";

export function KonuPosts({ updatePosts, limit, setLimit, tag, posts, slug }) {


   const [modal, setModal] = useState(false)
   const [board, setBoard] = useState(false)

   return (
      <>
         <div className="boards bg-zinc-900">
            <div className="boards-head">
               <span className="text-head"><Link to="/">Anasayfa</Link> / {tag} <span className="post-comment-button" type="button" onClick={() => {
                  setBoard(slug)
                  setModal(true)
               }}>[Yeni Gönderi]</span></span>
               <div className="cizgi-2"></div>
               <div className="boards-items">
                  {posts.map(posts => (
                     <Post post={posts}></Post>
                  ))}
                  <div style={{ height: 15 }}></div>
                  <ReklamNormal />
                  {posts.length + 20 > limit ? (
                     <div className="form-button" type="button" style={{ textAlign: 'center' }} onClick={() => {
                        setLimit(limit + 20)
                        updatePosts(limit + 20)
                     }}>Devamını yükle</div>
                  ) : (<></>)}
               </div>
            </div>
         </div>
         {modal === true ? (<PostWindow setModal={setModal} board={board}></PostWindow>) : (<></>)}
      </>
   )
}