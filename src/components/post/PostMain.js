import { useRef, useState } from "react";
import moment from 'moment';
moment.locale('tr')


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
               <div className="post-author-name">Tarih: {moment(post.date).format("MM/DD/YYYY HH:mm")}</div>
            </div>
            <div className="post-content">
               <span className="post-content-text">{post.icerik}</span>
               <img className="post-image" ref={imageRef} loading="lazy" src={post.image} key={post.id} alt="" onClick={(e) => {
                  if (click === false) {
                     imageRef.current.style.width = "100%"
                     setClick(true)
                  } else {
                     imageRef.current.style.width = "calc(100vw - 85vw)"
                     setClick(false)
                  }
               }} />
            </div>
         </div>
      ) : (
         <div className="post-main">
            <div className="post-author">
               <span className="post-author-name">Gönderen: {post.username}</span>
               <div className="post-author-name">Tarih: {moment(post.date).format("DD/MM/YYYY HH:mm")}</div>
            </div>
            <div className="post-content">
               <span className="post-content-text">{post.icerik}</span>
               <img className="post-image" ref={imageRef} loading="lazy" src={post.image} key={post.id} alt="" onClick={(e) => {
                  if (click === false) {
                     imageRef.current.style.width = "100%"
                     setClick(true)
                  } else {
                     imageRef.current.style.width = "calc(100vw - 85vw)"
                     setClick(false)
                  }
               }} />
            </div>
         </div>
      )
   )
}