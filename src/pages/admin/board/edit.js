import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Navbar } from "../../../components/navbar"
import { LoginPost } from "../../../fetch/fetchs"
import { AdminGet, AdminPost } from "../fetchs"



export default function BoardEdit() {


   const [err, setErr] = useState("")
   const [slug, setSlug] = useState("")
   const [baslik, setBaslik] = useState("")
   const [about, setAbout] = useState("")
   const [click, setClick] = useState(false)

   const { boardslug } = useParams()

   useEffect(() => {
      AdminGet({
         endpoint: '/board/get/board/' + boardslug
      }).then(res => {
         if(res.data){
            setSlug(res.data.slug)
            setBaslik(res.data.baslik)
            setAbout(res.data.about)
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
               <div className="form-label">Slug</div>
               <input className="form-input bg-zinc-800" value={slug} onChange={(e) => {
                  setSlug(e.target.value)
               }}></input>
               <div className="form-label">Başlık</div>
               <input className="form-input bg-zinc-800" value={baslik} onChange={(e) => {
                  setBaslik(e.target.value)
               }}></input>
               <div className="form-label">Hakkında</div>
               <input className="form-input bg-zinc-800" value={about} onChange={(e) => {
                  setAbout(e.target.value)
               }}></input>

               {click === false ? (
                  <div className="form-button bg-zinc-800" type="button" onClick={() => {
                     setClick(true)
                     AdminPost({
                        endpoint: "/admin/board/update/" + boardslug, data: {
                           slug,
                           baslik,
                           about
                        }
                     }).then(res => {
                        if (res.board) {
                           window.location.href = "/admin/board"
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