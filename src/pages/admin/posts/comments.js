import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BoardContext } from "../../../contexts/board.context"
import { AdminGet, AdminPost } from "../fetchs"
import moment from 'moment';
moment.locale('tr')


export default function PostsCommentsIndex() {

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
                  <div className="admin-main-area-item bg-zinc-800">
                     <div>
                        <div className="admin-main-area-item-head">
                           {post.baslik}
                        </div>
                        <div className="admin-main-area-item-details">
                           <div>id: {post.id}</div>
                           <div>Yazar: {post.username}</div>
                           <div>İçerik: {post.icerik.slice(0, 100)}</div>
                           <div>Tarih: {moment(post.date).format("MM/DD/YYYY HH:mm")}</div>
                        </div>
                     </div>
                     <div>
                        <div className="admin-main-area-action-items">
                           <div className="admin-button delete" type="button"
                              onClick={() => {
                                 AdminPost({
                                    endpoint: "/admin/post/delete/" + post.id
                                 }).then(res => {
                                    window.location.href = ""
                                 })
                              }}>
                              Sil
                           </div>
                           <Link to={"/admin/post/comments/" + post.id} className="admin-button edit" type="button">
                              Yorumları
                           </Link>
                           <Link to={"/post/" + post.id} className="admin-button edit" type="button">
                              Gönderi
                           </Link>
                        </div>
                     </div>
                  </div>
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