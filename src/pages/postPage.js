import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ReklamPostContent } from "../components/adsense/reklam";
import SEO from "../components/helmet";
import { MostBoards } from "../components/mostboards";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import PostMain from "../components/post/PostMain";
import { ReplyWindow } from "../components/repyWindow";
import { api_url } from "../config";
import { CurrentBoard } from "../contexts/currentBoard.context";
import { GetPost } from "../fetch/fetchs";



export function PostPage() {

   const [post, setPost] = useState({})
   const [reply, setReply] = useState("")


   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const [replyModal, setReplyModal] = useState(false)
   const [currentBaord, setCurrentBoard] = useContext(CurrentBoard)

   const { id } = useParams();

   useEffect(() => {
      GetPost({ id, skip, limit }).then(res => {
         if (res.data) {
            setPost(res.data)
            setLoad(false)
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
                  {
                     !load ? (
                        <div className="post-area">
                           <SEO title={"Redoom | " + post.baslik} desc={post.icerik.length > 150 ? (post.icerik.slice(0, 150) + "...") : ((post.icerik))} url={"post/" + post.id} image={api_url + "/media/" + post.id + "/"}></SEO>
                           <div className="post-head">
                              <span className="post-head-text"><Link className="text-white" to={"/"}>Anasayfa</Link> / <Link className="text-white" to={"/konu/" + post.board_slug} onClick={() => { setCurrentBoard(post.board) }}>{post.board}</Link> / {post.baslik}</span>
                              <div className="cizgi-2"></div>
                           </div>
                           <PostMain post={post}></PostMain>
                           <ReklamPostContent />
                           <div className="post-head-text">Yorumlar: <span className="post-comment-button" onClick={() => {
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
                                             <div className="reply">
                                                <div className="reply-line"></div>
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
                     ) : (
                        <></>
                     )
                  }
               </div>
               <div>
                  <MostPosts></MostPosts>
                  <MostBoards />
               </div>
            </div>
         </div>
         {replyModal === true ? (
            <ReplyWindow setModal={setReplyModal} reply={reply} post={post.id}></ReplyWindow>
         ) : (<></>)}
      </div>
   )
}