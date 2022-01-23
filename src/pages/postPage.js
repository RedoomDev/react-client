import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { Boards } from "../components/boards";
import { KonuPosts } from "../components/konuPosts";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import { BoardPostsContext } from "../contexts/boardPosts.context";
import { GetPost } from "../fetch/fetchs";




export function PostPage() {

   const [post, setPost] = useState([])

   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const { id } = useParams();

   useEffect(() => {
      GetPost({ id, skip, limit }).then(res => {
         if (res.data) {
            setLoad(false)
            setPost(res.data)
            console.log(res.data)
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
                           <span className="post-author-name">Gönderen: </span>
                        </div>
                        <div className="post-content">
                           {post.icerik}
                        </div>
                     </div>
                     <div className="cizgi-2"></div>
                     <div className="post-head-text">Yorumlar: </div>
                     <div className="cizgi-2"></div>

                     {post.comments ? (<>

                        {post.comments.map(c => (
                           <div className="post-comment">
                              <div className="post-main">
                                 <div className="post-author">
                                    <span className="post-author-name">Gönderen: {c.username}</span>
                                 </div>
                                 <div className="post-content">
                                    {c.icerik}
                                 </div>
                              </div>
                              <div className="cizgi-2"></div>
                           </div>
                        ))}
                     </>) : (<></>)}

                  </div>
               </div>
               <div>
                  <MostPosts></MostPosts>
               </div>
            </div>
         </div>
      </div>
   )
}