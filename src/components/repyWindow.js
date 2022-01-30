import React, { useEffect, useRef, useState } from "react"
import { PostReply } from "../fetch/fetchs"
import ImageUploading from 'react-images-uploading';
import HCaptcha from '@hcaptcha/react-hcaptcha';


export function ReplyWindow({ setModal, reply, post }) {

   const [username, setUsername] = useState("")
   const [icerik, setIcerik] = useState("")
   const [err, setErr] = useState("")
   const [token, setToken] = useState(null);
   const captchaRef = useRef(null);


   const onLoad = () => {
      // this reaches out to the hCaptcha JS API and runs the
      // execute function on it. you can use other functions as
      // documented here:
      // https://docs.hcaptcha.com/configuration#jsapi
      captchaRef.current.execute();
   };

   const [click, setClick] = useState(false)
   const [images, setImages] = React.useState([]);
   const maxNumber = 1;
   const maxFileSize = 8000000;

   const onImageChanege = (imageList, addUpdateIndex) => {
      // data for submit
      setImages(imageList);
   };


   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <span className="post-comment-button" type="button" onClick={() => setModal(false)}>[Kapat]</span>
               <div className="post-error">{err}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setUsername(e.target.value)
               }}></input>
               <div className="form-label">İçerik</div>
               <textarea className="form-input bg-zinc-800" maxLength="5000" onChange={(e) => {
                  setIcerik(e.target.value)
               }}></textarea>
               <span>{icerik.length} / 5000</span>
               <ImageUploading
                  multiple
                  value={images}
                  onChange={onImageChanege}
                  maxNumber={maxNumber}
                  maxFileSize={maxFileSize}
                  dataURLKey="data_url"
               >
                  {({
                     imageList,
                     onImageUpload,
                     onImageUpdate,
                     isDragging,
                     dragProps,
                     errors
                  }) => (
                     // write your building UI
                     <div className="upload__image-wrapper">
                        {errors && <div>{errors.maxFileSize && <span>Dosya boyutu en fazla 8mb olabilir</span>}       {errors.maxNumber && <span>En fazla 1 resim</span>}</div>}
                        <button
                           style={isDragging ? { color: 'red' } : undefined}
                           onClick={onImageUpload}
                           {...dragProps}
                        >
                           [Tıkla ya da üstüne resim sürükle]
                        </button>
                        &nbsp;
                        {imageList.map((image, index) => (
                           <div key={index} className="image-item">
                              <img src={image['data_url']} alt="" width="100" />
                              <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(index)}>[değiştir]</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </ImageUploading>
               <HCaptcha
                  sitekey="b523111d-90f5-4b0d-b29d-a4df5d370eac"
                  onLoad={onLoad}
                  onVerify={setToken}
                  ref={captchaRef}
               />
               {click === false ? (
                  <div className="form-button bg-zinc-800" type="button" onClick={(e) => {
                     if (!images[0]) {
                        setErr("Lütfen Resim Ekleyiniz")
                     } else {
                        setClick(true)
                        PostReply({ username, icerik, reply, post, image: images[0].data_url, token }).then(res => {
                           if (res.message) {
                              setErr(res.message)
                              setClick(false)
                           }
                           if (res.comment) {
                              return window.location.href = ""
                           }
                        })
                     }

                  }}>Yorumu Gönder</div>
               ) : (
                  <div className="form-button bg-zinc-800" type="button" aria-disabled="true" onClick={(e) => {

                  }}>Yorum Gönderiliyor</div>
               )}
            </div>
         </div>
      </div>
   )
}