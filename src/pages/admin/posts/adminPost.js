import moment from "moment"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AdminPost } from "../fetchs"
import { PostEditWindow } from "./editWindow"






export default function AdminPostMain({ post }) {

   const [modal, setModal] = useState(false)

   return (
      <>
         <div className="admin-main-area-item bg-zinc-800">
            <div>
               <div className="admin-main-area-item-head">
                  {post.baslik}
               </div>
               <div className="admin-main-area-item-details">
                  <div>id: {post.id}</div>
                  <div>Yazar: {post.username}</div>
                  <div>İçerik: {post.icerik.slice(0, 100)}</div>
                  <div>Tarih: {moment(post.date).fromNow()}</div>
               </div>
            </div>
            <div>
               <div className="admin-main-area-action-items">
                  <div className="admin-button delete"
                     onClick={() => {
                        AdminPost({
                           endpoint: "/admin/post/delete/" + post.id
                        }).then(res => {
                           window.location.href = ""
                        })
                     }}>
                     Sil
                  </div>
                  <Link to={"/admin/post/comments/" + post.id} className="admin-button edit" >
                     Yorumları
                  </Link>
                  <Link to={"/post/" + post.id} className="admin-button edit">
                     Gönderi
                  </Link>
                  <Link className="admin-button edit" onClick={() => setModal(true)}>
                     Düzenle
                  </Link>
               </div>
            </div>
         </div>
         {modal ? (
            <PostEditWindow post={post} setModal={setModal}></PostEditWindow>
         ) : (<></>)}
      </>
   )
}