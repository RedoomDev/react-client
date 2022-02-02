import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Navbar } from "../../../components/navbar"
import { LoginPost } from "../../../fetch/fetchs"
import { AdminGet, AdminPost } from "../fetchs"


export default function UserEdit() {


   const [err, setErr] = useState("")
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [click, setClick] = useState(false)

   const { id } = useParams()

   useEffect(() => {
      AdminGet({
         endpoint: "/admin/user/get/" + id
      }).then(res => {
         if (res.data) {
            setEmail(res.data.email)
            setName(res.data.name)
         }
      })
   }, [])

   return (
      <div style={{ color: 'white' }}>
         <div className="admin-window bg-zinc-900" style={{ color: 'white' }}>
            <div className="admin-form">
               <div className="post-head">
                  <span className="post-head-text" style={{ fontSize: 25 }}>Konu Sistemi</span>
                  <Link to="/admin/board" className="post-head-text" style={{ fontSize: 25, float: 'right', marginRight: 20 }}>Geri Dön</Link>
                  <div className="cizgi-2"></div>
               </div>
               <div style={{ height: 20 }}></div>
               <div className="post-error">{err}</div>
               <div className="form-label">E-Posta</div>
               <input className="form-input bg-zinc-800" value={email} onChange={(e) => {
                  setEmail(e.target.value)
               }}></input>
               <div className="form-label">Kullanıcı adı</div>
               <input className="form-input bg-zinc-800" value={name} onChange={(e) => {
                  setName(e.target.value)
               }}></input>
               {click === false ? (
                  <div className="form-button bg-zinc-800" type="button" onClick={() => {
                     setClick(true)
                     AdminPost({
                        endpoint: "/admin/user/update/" + id, data: {
                           name,
                           email
                        }
                     }).then(res => {
                        if (res.token) {
                           window.location.href = "/admin/users"
                        } else {
                           setErr(res.message)
                           setClick(false)
                        }
                     })
                  }}>Gönder</div>
               ) : (
                  <div className="form-button bg-zinc-800" type="button" aria-disabled="true">Sunucuya İstek Gönderiliyor...</div>
               )}
            </div>
         </div>
      </div>
   )
}