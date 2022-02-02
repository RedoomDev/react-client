import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BoardContext } from "../../contexts/board.context"
import { AdminGet, AdminPost } from "./fetchs"
import moment from 'moment';
moment.locale('tr')


export default function UsersIndex() {

   const [users, setUsers] = useState([])

   useEffect(() => {
      AdminGet({
         endpoint: "/admin/user/get"
      }).then(res => {
         if (res.data) {
            setUsers(res.data)
         }
      })
   }, [])

   return (
      <div className="admin-main">
         <div className="post-head">
            <span className="post-head-text" style={{ fontSize: 25 }}>Konu Sistemi</span>
            <Link to="/admin/user/new" className="post-head-text" style={{ fontSize: 25, float: 'right', marginRight: 20 }}>Yeni Kullanıcı</Link>
            <div className="cizgi-2"></div>
         </div>
         <div className="admin-main-area">
            <div className="admin-main-area-list">
               {users.map((user, idx) => (
                  <div className="admin-main-area-item bg-zinc-800">
                     <div>
                        <div className="admin-main-area-item-head">
                           {user.name}
                        </div>
                        <div className="admin-main-area-item-head">
                           {user.email}
                        </div>
                        <div className="admin-main-area-item-head">
                           {moment(user.date).format("MM/DD/YYYY HH:mm")}
                        </div>
                     </div>
                     <div>
                        <div className="admin-main-area-action-items">
                           <div className="admin-button delete" type="button"
                              onClick={() => {
                                 AdminPost({ endpoint: "/admin/user/delete/" + user.id }).then(res => {
                                    if (res.message) {
                                       window.location.href = ""
                                    }
                                 })
                              }}>
                              Sil
                           </div>
                           <Link to={"/admin/user/edit/" + user.id} className="admin-button edit" type="button">
                              Düzenle
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}