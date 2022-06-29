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

   const [section, setSection] = useState("text")

   return (
      <>
         <div className="boards">
            <div className="boards-head">
               <div className="text-head">
                  <span><Link className="text-white" to="/">Anasayfa</Link> / {currentBaord}</span>
                  <span className="post-comment-button new-post" onClick={() => {
                     setBoard(slug)
                     setModal(true)
                  }}>[Yeni Gönderi]</span>
               </div>
               <div className="cizgi-2"></div>
               <div className="boards-items">
                  <div className="section-menu">
                     <div className="section-item" style={section === "text" ? ({ borderBottom: "1px solid white", backgroundColor: "rgb(39 39 42)" }) : ({})} onClick={() => { setSection("text") }}>Yazı</div>
                     <div className="section-item" style={section === "image" ? ({ borderBottom: "1px solid white", backgroundColor: "rgb(39 39 42)" }) : ({})} onClick={() => { setSection("image") }}>Resim</div>
                  </div>

                  {section === "text" ? (
                     posts.map(posts => (
                        posts.icerik ? (
                           <Post post={posts}></Post>
                        ) : (<></>)
                     ))
                  ) : (<></>)}

                  {section === "image" ? (
                     <div className="board-images-grid">
                        {
                           posts.map(posts => (
                              !posts.icerik ? (
                                 <Post post={posts}></Post>
                              ) : (<></>)
                           ))
                        }
                     </div>
                  ) : (<></>)}

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