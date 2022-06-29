import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentBoard } from "../contexts/currentBoard.context";
import { ReklamNormal } from "./adsense/reklam";
import { Post } from "./post";
import { PostWindow } from "./postWindow";

export function KonuPosts({ updatePosts, limit, setLimit, posts, slug }) {


   const [modal, setModal] = useState(false)
   const [board, setBoard] = useState(false)
   const [currentBaord, setCurrentBoard] = useContext(CurrentBoard)

   return (
      <>
         <div className="boards">
            <div className="boards-head">
               <div className="text-head">
                  <span><Link className="text-white"  to="/">Anasayfa</Link> / {currentBaord}</span>
                  <span className="post-comment-button new-post" onClick={() => {
                     setBoard(slug)
                     setModal(true)
                  }}>[Yeni Gönderi]</span>
               </div>
               <div className="cizgi-2"></div>
               <div className="boards-items">
                  {posts.map(posts => (
                     <Post post={posts}></Post>
                  ))}
                  <div style={{ height: 15 }}></div>
                  <ReklamNormal />
                  {posts.length + 20 > limit ? (
                     <div className="form-button" style={{ textAlign: 'center' }} onClick={() => {
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