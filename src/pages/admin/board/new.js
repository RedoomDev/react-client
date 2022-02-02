import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../../../components/navbar"
import { LoginPost } from "../../../fetch/fetchs"



export default function BoardNew() {


   const [err, setErr] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [click, setClick] = useState(false)

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
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setEmail(e.target.value)
               }}></input>
               <div className="form-label">Şifre</div>
               <input className="form-input bg-zinc-800" type="password" onChange={(e) => {
                  setPassword(e.target.value)
               }}></input>

               {click === false ? (
                  <div className="form-button bg-zinc-800" type="button" onClick={() => {
                     setClick(true)
                     LoginPost({
                        email,
                        password
                     }).then(res => {
                        if (res.token) {
                           localStorage.setItem("token", res.token)
                           window.location.href = ""
                        } else {
                           setErr(res.message)
                           setClick(false)
                        }
                     })
                  }}>Giriş Yap</div>
               ) : (
                  <div className="form-button bg-zinc-800" type="button" aria-disabled="true">Sunucuya İstek Gönderiliyor...</div>
               )}
            </div>
         </div>
      </div>
   )
}