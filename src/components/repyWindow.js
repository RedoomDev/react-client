import React, { useEffect, useRef, useState } from "react"
import { PostReply } from "../fetch/fetchs"
import HCaptcha from '@hcaptcha/react-hcaptcha';


export function ReplyWindow({ setModal, reply, post }) {

   const [username, setUsername] = useState("")
   const [icerik, setIcerik] = useState("")
   const [err, setErr] = useState("")
   const [token, setToken] = useState(null);
   const captchaRef = useRef(null);

   useEffect(() => {
      setUsername(localStorage.getItem("username") || "")
   }, [])




   const [click, setClick] = useState(false)



   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])


   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <i className="close-button fa fa-x" onClick={() => setModal(false)} ></i>
               <div className="post-error">{err}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" value={username} onChange={(e) => {
                  setUsername(e.target.value)
               }}></input>
               <div className="form-label">İçerik</div>
               <textarea className="form-input bg-zinc-800" maxLength="5000" onChange={(e) => {
                  setIcerik(e.target.value)
               }}></textarea>
               <span>{icerik.length} / 5000</span>
               <div>
                  <center>
                     <HCaptcha
                        theme="dark"
                        sitekey="b523111d-90f5-4b0d-b29d-a4df5d370eac"
                        onVerify={setToken}
                        ref={captchaRef}
                     />
                  </center>
               </div>
               <div style={{ height: 30 }}></div>
               {click === false ? (
                  <div className="form-button bg-zinc-800" onClick={(e) => {
                     setClick(true)
                     PostReply({ username, icerik, reply, post, token }).then(res => {
                        if (res.message) {
                           localStorage.setItem("username", username)
                           setErr(res.message)
                           setClick(false)
                        }
                        if (res.comment) {
                           localStorage.setItem("username", username)
                           return window.location.href = ""
                        }
                     })
                  }}>Yorumu Gönder</div>
               ) : (
                  <div className="form-button bg-zinc-800" aria-disabled="true" onClick={(e) => {

                  }}>Yorum Gönderiliyor</div>
               )}
            </div>
         </div>
      </div>
   )
}