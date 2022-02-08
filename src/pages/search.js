


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { KonuPosts } from "../components/konuPosts";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import { GetPostsFromBoard } from "../fetch/fetchs";
import { AdminGet } from "./admin/fetchs";




export function SearchPage() {

   const [posts, setPosts] = useState([])

   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const loc = useLocation()

   useEffect(() => {
      AdminGet({
         endpoint: "/board/get/search?q=" + loc.search.split("=")[1]
      }).then(res => {
         if (res.data) {
            setPosts(res.data)
         }
      })
   }, [loc])



   return (
      <div className="text-white font-mono">
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  <KonuPosts tag="Gönderiler" key={limit} limit={limit} setLimit={setLimit} posts={posts}></KonuPosts>
               </div>
               <div>
                  <MostPosts></MostPosts>
               </div>
            </div>
         </div>
      </div>
   )
}