import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Boards } from "../components/boards";
import { KonuPosts } from "../components/konuPosts";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import { BoardPostsContext } from "../contexts/boardPosts.context";
import { GetPostsFromBoard } from "../fetch/fetchs";




export function KonuPage() {

   const [posts, setPosts] = useState([])

   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const slug = "anime"

   useEffect(() => {
      GetPostsFromBoard({ slug: slug, limit: limit, skip: skip }).then(res => {
         if (res.data) {
            setLoad(false)
            setPosts(res.data)
         }
      })
   }, [])

   return (
      <div className="text-white font-mono">
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  <KonuPosts tag="Gönderiler" posts={posts}></KonuPosts>
               </div>
               <div>
                  <MostPosts></MostPosts>
               </div>
            </div>
         </div>
      </div>
   )
}