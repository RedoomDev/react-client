import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BoardContext } from "../../contexts/board.context"
import { AdminGet, AdminPost } from "./fetchs"
import moment from 'moment';
import AdminPostMain from "./posts/adminPost";
moment.locale('tr')


export default function PostsIndex() {

   const [posts, setPosts] = useState([])
   const [skip, setSkip] = useState(0)
   const [limit, setLimit] = useState(10)

   useEffect(() => {
      AdminGet({
         endpoint: "/board/get/posts?limit=" + limit + "&skip=" + skip
      }).then(res => {
         if (res.data) {
            setPosts(res.data)
         }
      })
   }, [])

   const loadmore = () => {
      AdminGet({
         endpoint: "/board/get/posts?limit=" + limit + "&skip=" + Math.floor(skip * 1 + 10)
      }).then(res => {
         if (res.data) {
            setPosts([...posts, ...res.data])
         }
      })
      setSkip(skip + 10)
   }

   return (
      <div className="admin-main">
         <div className="post-head">
            <span className="post-head-text" style={{ fontSize: 25 }}>Konu Sistemi</span>
            <div className="cizgi-2"></div>
         </div>
         <div className="admin-main-area">
            <div className="admin-main-area-list">
               {posts.map((post, idx) => (
                  <AdminPostMain post={post}></AdminPostMain>
               ))}
               {skip <= posts.length ? (
                  <div className="form-button" type="button" style={{ textAlign: 'center' }} onClick={loadmore}>Devamını yükle</div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   )
}