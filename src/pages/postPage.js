import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import PostMain from "../components/post/PostMain";
import { ReplyWindow } from "../components/repyWindow";
import { GetPost } from "../fetch/fetchs";




export function PostPage() {

   const [post, setPost] = useState({})
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
                        <span className="post-head-text"><Link to={"/"}>Anasayfa</Link> / <Link to={"/konu/" + post.board_slug}>{post.board}</Link> / {post.baslik}</span>
                        <div className="cizgi-2"></div>
                     </div>
                     <PostMain post={post}></PostMain>
                     <div className="post-head-text">Yorumlar: <span className="post-comment-button" type="button" onClick={() => {
                        setReplyModal(true)
                        setReply("")
                     }}>[Yorum yap]</span></div>

                     {post.comments ? (<>

                        {post.comments.map(c => (
                           !c.reply ? (
                              <div className="post-comment">
                                 <PostMain post={c} type={"reply"} setReply={setReply} setReplyModal={setReplyModal}></PostMain>
                                 {post.comments.map(r => (
                                    r.reply === c.id ? (
                                       <div className="reply bg-zinc-800">
                                          <PostMain post={r}></PostMain>
                                       </div>
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