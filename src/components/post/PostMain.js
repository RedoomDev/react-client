import { useRef, useState } from "react";
import moment from 'moment';
import PostText from "./PostText";
import { ReklamPostContent } from "../adsense/reklam";
import { api_url } from "../../config";
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
               <div className="post-author-name">Tarih: {moment(post.date).fromNow()}</div>
            </div>
            <div className="post-content">
               <PostText text={post.icerik}></PostText>
            </div>
         </div>
      ) : (
         <div className="post-main">
            <div className="post-author">
               <span className="post-author-name">Gönderen: {post.username}</span>
               <div className="post-author-name">Tarih: {moment(post.date).fromNow()}</div>
            </div>
            <div className="post-content">
               <PostText text={post.icerik}></PostText>
               {post.image ? (
                  <img className="post-image" ref={imageRef} loading="lazy" src={click === false ? api_url + "/media/" + post.id + "/" + "?width=200&height=200" : api_url + "/media/" + post.id + "/"} key={post.id} alt="" onClick={(e) => {
                     if (click === false) {
                        imageRef.current.style.width = "100%"
                        setClick(true)
                     } else {
                        imageRef.current.style.width = "calc(100vw - 85vw)"
                        setClick(false)
                     }
                  }} />
               ) : (<></>)}
            </div>
         </div>
      )
   )
}