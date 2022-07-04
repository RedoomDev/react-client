import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import SEO from "../components/helmet";
import { KonuPosts } from "../components/konuPosts";
import { MostBoards } from "../components/mostboards";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";
import { BoardContext } from "../contexts/board.context";
import { CurrentBoard } from "../contexts/currentBoard.context";
import { GetPostsFromBoard } from "../fetch/fetchs";




export function KonuPage() {

   const [posts, setPosts] = useState([])

   const [limit, setLimit] = useState(20)
   const [skip, setSkip] = useState(0)

   const [load, setLoad] = useState(true)

   const currentBaord = useContext(CurrentBoard)

   const boards = useContext(BoardContext)

   const { slug } = useParams();

   useEffect(() => {
      GetPostsFromBoard({ slug: slug, limit: limit, skip: skip }).then(res => {
         if (res.data) {
            setPosts(res.data)
            setLoad(false)
            currentBaord[1](boards[0].find(a => a.id === res.data[0].board).baslik)
         }
      })
      window.scrollTo(0, 0)
      setLimit(20)
   }, [slug])

   function updatePosts(limit) {
      GetPostsFromBoard({ slug: slug, limit: limit, skip: skip }).then(res => {
         if (res.data) {
            setLoad(false)
            setPosts(res.data)
         }
      })
   }

   return (
      <div className="text-white font-mono">
         <SEO title={"Redoom | " + currentBaord[0]} desc={currentBaord[0] + " Konusundaki tüm gönderiler burada. Paylaşılan yazı ve resimleri burada bulabilirsin"} url={"konu/" + slug}></SEO>
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  {!load ? (<KonuPosts tag="Gönderiler" key={limit} updatePosts={updatePosts} limit={limit} setLimit={setLimit} posts={posts} slug={slug}></KonuPosts>) : (<></>)}
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