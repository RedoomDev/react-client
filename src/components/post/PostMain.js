import { useRef, useState } from "react";
import moment from 'moment';
import PostText from "./PostText";
import { ReklamPostContent } from "../adsense/reklam";
import { api_url } from "../../config";
import PostImage from "./PostImage";
moment.locale('tr')


export default function PostMain({ post, type, setReplyModal, setReply }) {

   return (
      type === "reply" ? (
         <div className="post-main">
            <div className="post-author">
               <span className="post-author-name">{post.username} <span className="post-comment-button" onClick={() => {
                  setReplyModal(true)
                  setReply(post.id)
               }}>[Yanıtla]</span></span>
               <div className="post-author-name">{moment(post.date).fromNow()}</div>
            </div>
            <div className="post-content">
               <PostText text={post.icerik}></PostText>
            </div>
         </div>
      ) : (
         <div className="post-main">
            <div className="post-author">
               <span className="post-author-name">{post.username}</span>
               <div className="post-author-name">{moment(post.date).fromNow()}</div>
            </div>
            <div className="post-content">
               {!post.icerik ? (
                  <PostImage post={post}></PostImage>
               ) : (
                  <PostText text={post.icerik}></PostText>
               )}
            </div>
         </div>
      )
   )
}