import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BoardContext } from "../../../contexts/board.context"
import { AdminGet, AdminPost } from "../fetchs"
import moment from 'moment';
moment.locale('tr')


export default function PostsCommentsIndex() {

   const [comments, setComments] = useState([])
   const [post, setPost] = useState("")
   const [skip, setSkip] = useState(0)
   const [limit, setLimit] = useState(10)

   const {id} = useParams()

   useEffect(() => {
      AdminGet({
         endpoint: "/admin/post/get/" + id + "?limit=" + limit + "&skip=" + skip
      }).then(res => {
         if (res.data) {
            setComments(res.data.comments)
            setPost(res.data.id)
         }
      })
   }, [])

   const loadmore = () => {
      AdminGet({
         endpoint: "/admin/post/get/" + id + "?limit=" + Math.floor(limit * 1 + 1) + "&skip=" + Math.floor(skip * 1 + 1)
      }).then(res => {
         if (res.data) {
            setComments([...comments, ...res.data.comments])
         }
      })
      setSkip(skip * 1 + 1)
      setLimit(limit * 1 + 1)
   }

   return (
      <div className="admin-main">
         <div className="post-head">
            <span className="post-head-text" style={{ fontSize: 25 }}>Konu Sistemi</span>
            <Link to="/admin/posts" className="post-head-text" style={{ fontSize: 25, float: 'right', marginRight: 20 }}>Geri Dön</Link>
            <div className="cizgi-2"></div>
         </div>
         <div className="admin-main-area">
            <div className="admin-main-area-list">
               {comments.map((comment, idx) => (
                  <div className="admin-main-area-item bg-zinc-800">
                     <div>
                        <div className="admin-main-area-item-details">
                           <div>id: {comment.id}</div>
                           <div>Yazar: {comment.username}</div>
                           <div>İçerik: {comment.icerik.slice(0, 100)}</div>
                           <div>Tarih: {moment(comment.date).format("MM/DD/YYYY HH:mm")}</div>
                        </div>
                     </div>
                     <div>
                        <div className="admin-main-area-action-items">
                           <div className="admin-button delete" type="button"
                              onClick={() => {
                                 AdminPost({
                                    endpoint: "/admin/post/get/" + post + "/delete/comment/" + comment.id
                                 }).then(res => {
                                    window.location.href = ""
                                 })
                              }}>
                              Sil
                           </div>
                           <Link to={"/post/" + post} className="admin-button edit" type="button">
                              Gönderi
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
               {limit <= comments.length ? (
                  <div className="form-button" type="button" style={{ textAlign: 'center' }} onClick={loadmore}>Devamını yükle</div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   )
}