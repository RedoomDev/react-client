import { useState } from "react"
import { Navbar } from "../../../components/navbar"
import { LoginPost } from "../../../fetch/fetchs"



export default function AdminLogin() {


   const [err, setErr] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [click, setClick] = useState(false)

   return (

      <div style={{ color: 'white' }}>
         <Navbar></Navbar>
         <div className="window bg-zinc-900" style={{ color: 'white' }}>
            <div className="form">
               <div className="form-head">Giriş Yap</div>
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