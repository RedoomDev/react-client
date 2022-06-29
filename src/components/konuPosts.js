import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CurrentBoard } from "../contexts/currentBoard.context";
import { ReklamNormal } from "./adsense/reklam";
import { Post } from "./post";
import { PostWindow } from "./postWindow";

export function KonuPosts({ updatePosts, limit, setLimit, posts, slug }) {


   const [modal, setModal] = useState(false)
   const [board, setBoard] = useState(false)
   const [currentBaord, setCurrentBoard] = useContext(CurrentBoard)

   const { type } = useParams()

   const [section, setSection] = useState("text")

   useEffect(() => {
      if (!type) {
         setSection("text")
      } else {
         if (type === "text") {
            setSection(type)
         }

         if (type === "image") {
            setSection(type)
         }
      }
   }, [])

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
                     <Link to={"/konu/text/" + slug} className="section-item" style={section === "text" ? ({ borderBottom: "1px solid white", backgroundColor: "rgb(39 39 42)" }) : ({})} onClick={() => { setSection("text") }}>Yazı</Link>
                     <Link to={"/konu/image/" + slug} className="section-item" style={section === "image" ? ({ borderBottom: "1px solid white", backgroundColor: "rgb(39 39 42)" }) : ({})} onClick={() => { setSection("image") }}>Resim</Link>
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