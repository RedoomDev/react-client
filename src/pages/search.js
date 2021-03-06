


import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { KonuPosts } from "../components/konuPosts";
import { MostBoards } from "../components/mostboards";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import { CurrentBoard } from "../contexts/currentBoard.context";
import SEO from "../components/helmet";
import { AdminGet } from "./admin/fetchs";




export function SearchPage() {

   const [posts, setPosts] = useState([])

   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const [currentBaord, setCurrentBoard] = useContext(CurrentBoard)

   const loc = useLocation()

   useEffect(() => {
      AdminGet({
         endpoint: "/board/get/search?q=" + loc.search.split("=")[1]
      }).then(res => {
         if (res.data) {
            setPosts(res.data)
         }
      })

      setCurrentBoard("Ara")
   }, [loc])



   return (
      <div className="text-white font-mono">
         <SEO title={"Redoom | " + loc.search.split("=")[1] + " Araması"} desc={loc.search.split("=")[1] + " aramasının sonuçları. Sitemizdeki tüm göndelerin aramasını bu sayfadan yapabilirsiniz."} url={"search?=" + loc.search.split("=")[1]}></SEO>
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  <KonuPosts tag="Gönderiler" key={limit} limit={limit} setLimit={setLimit} posts={posts}></KonuPosts>
               </div>
               <div>
                  <MostPosts></MostPosts>
                  <MostBoards />
               </div>
            </div>
         </div>
      </div>
   )
}