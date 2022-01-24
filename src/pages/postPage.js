import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { Boards } from "../components/boards";
import { KonuPosts } from "../components/konuPosts";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import { ReplyWindow } from "../components/repyWindow";
import { BoardPostsContext } from "../contexts/boardPosts.context";
import { GetPost } from "../fetch/fetchs";




export function PostPage() {

   const [post, setPost] = useState([])
   const [reply, setReply] = useState("")


   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const [replyModal, setReplyModal] = useState(false)

   const { id } = useParams();

   useEffect(() => {
      GetPost({ id, skip, limit }).then(res => {
         if (res.data) {
            setLoad(false)
            setPost(res.data)
         }
      })
      window.scrollTo(0, 0)
   }, [id])

   return (
      <div className="text-white font-mono">
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  <div className="post-area bg-zinc-900">
                     <div className="post-head">
                        <span className="post-head-text">{post.baslik}</span>
                        <div className="cizgi-2"></div>
                     </div>
                     <div className="post-main">
                        <div className="post-author">
                           <span className="post-author-name">Gönderen: {post.username}</span>
                        </div>
                        <div className="post-content">
                           {post.icerik}
                           <img className="post-image" loading="lazy" src={post.image} key={post.id} alt="" width="300vw" />
                        </div>
                     </div>
                     <div className="post-head-text">Yorumlar: <span className="post-comment-button" type="button" onClick={() => {
                        setReplyModal(true)
                        setReply("")
                     }}>[Yorum yap]</span></div>

                     {post.comments ? (<>

                        {post.comments.map(c => (
                           !c.reply ? (
                              <div className="post-comment">
                                 <div className="post-main">
                                    <div className="post-author">
                                       <span className="post-author-name">Gönderen: {c.username} <span className="post-comment-button" type="button" onClick={() => {
                                          setReplyModal(true)
                                          setReply(c.id)
                                       }}>[Yanıtla]</span></span>
                                    </div>
                                    <div className="post-content">
                                       {c.icerik}
                                       <img className="post-image" src={c.image} loading="lazy" key={c.id} alt="" width="300vw" />
                                    </div>
                                 </div>
                                 {post.comments.map(r => (
                                    r.reply === c.id ? (
                                       <>
                                          <div className="reply bg-zinc-800">
                                             <div className="post-main">
                                                <div className="post-author">
                                                   <span className="post-author-name">Gönderen: {r.username}</span>
                                                </div>
                                                <div className="post-content">
                                                   {r.icerik}
                                                   <img className="post-image" src={r.image} key={r.id} alt="" loading="lazy" width="300vw" />
                                                </div>
                                             </div>
                                          </div>
                                       </>
                                    ) : (<></>)
                                 ))}
                                 <div className="cizgi-2"></div>
                              </div>
                           ) : (<></>)
                        ))}
                     </>) : (<></>)}

                  </div>
               </div>
               <div>
                  <MostPosts></MostPosts>
               </div>
            </div>
         </div>
         {replyModal === true ? (
            <ReplyWindow setModal={setReplyModal} reply={reply} post={post.id}></ReplyWindow>
         ) : (<></>)}
      </div>
   )
}