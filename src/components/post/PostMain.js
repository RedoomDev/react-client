import { useRef, useState } from "react";


export default function PostMain({ post, type, setReplyModal, setReply }) {

   const [click, setClick] = useState(false)
   const imageRef = useRef()

   return (
      type === "reply" ? (
         <div className="post-main">
            <div className="post-author">
               <span className="post-author-name">Gönderen: {post.username} <span className="post-comment-button" type="button" onClick={() => {
                  setReplyModal(true)
                  setReply(post.id)
               }}>[Yanıtla]</span></span>
            </div>
            <div className="post-content">
               <img className="post-image" ref={imageRef} loading="lazy" src={post.image} key={post.id} alt="" width="300vw" onClick={(e) => {
                  if (click === false) {
                     imageRef.current.style.width = "100%"
                     setClick(true)
                  } else {
                     imageRef.current.style.width = "25%"
                     setClick(false)
                  }
               }} />
               <span className="post-content-text">{post.icerik}</span>
            </div>
         </div>
      ) : (
         <div className="post-main">
            <div className="post-author">
               <span className="post-author-name">Gönderen: {post.username}</span>
            </div>
            <div className="post-content">
               <img className="post-image" ref={imageRef} loading="lazy" src={post.image} key={post.id} alt="" width="300vw" onClick={(e) => {
                  if (click === false) {
                     imageRef.current.style.width = "100%"
                     setClick(true)
                  } else {
                     imageRef.current.style.width = "25%"
                     setClick(false)
                  }
               }} />
               <span className="post-content-text">{post.icerik}</span>
            </div>
         </div>
      )
   )
}