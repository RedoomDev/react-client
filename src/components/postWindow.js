import React, { useEffect, useRef, useState } from "react"
import { NewPost } from "../fetch/fetchs"
import ImageUploading from 'react-images-uploading';
import { useNavigate } from "react-router-dom";
import HCaptcha from '@hcaptcha/react-hcaptcha';



export function PostWindow({ setModal, board }) {
   let navigate = useNavigate();

   const [username, setUsername] = useState("")
   const [baslik, setBaslik] = useState("")
   const [icerik, setIcerik] = useState("")
   const [err, setErr] = useState("")
   const [token, setToken] = useState(null);
   const captchaRef = useRef(null);

   const [images, setImages] = React.useState([]);
   const [click, setClick] = useState(false)
   const maxNumber = 1;
   const maxFileSize = 8000000;

   const onLoad = () => {
      // this reaches out to the hCaptcha JS API and runs the
      // execute function on it. you can use other functions as
      // documented here:
      // https://docs.hcaptcha.com/configuration#jsapi
      captchaRef.current.execute();
   };

   const onImageChanege = (imageList, addUpdateIndex) => {
      // data for submit
      setImages(imageList);
   };

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   const getBase64 = file => {
      return new Promise(resolve => {
         let fileInfo;
         let baseURL = "";
         // Make new FileReader
         let reader = new FileReader();

         // Convert the file to base64 text
         reader.readAsDataURL(file);

         // on reader load somthing...
         reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
         };
      });
   };

   function handlePaste(e) {
      if (e.clipboardData.files.length) {
         const fileObject = e.clipboardData.files[0];
         getBase64(fileObject).then(basedata => {
            const data = { data_url: basedata, file: fileObject }
            if (images[0]) {
               onImageChanege([data], 0)
            } else {
               setImages([data])
            }
         })
      }
   }


   return (
      <div className="fullscreen-modal-window" onPaste={handlePaste}>
         <div className="window bg-zinc-900" onPaste={handlePaste}>
            <div className="form" onPaste={handlePaste}>
               <span className="post-comment-button" type="button" onClick={() => setModal(false)} >[Kapat]</span>
               <div className="post-error">{err}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setUsername(e.target.value)
               }}></input>
               <div className="form-label">Başlık</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setBaslik(e.target.value)
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
                           className="upload_image_button bg-zinc-800"
                           style={isDragging ? { color: 'red' } : undefined}
                           onClick={onImageUpload}
                           {...dragProps}
                        >
                           [Tıkla ya da üstüne resim sürükle]
                        </button>
                        &nbsp;
                        {imageList.map((image, index) => (
                           <div key={index} className="image-item">
                              <img src={image['data_url']} alt="" className="uploaded_image" />
                              <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(index)} className="upload_image_button bg-zinc-800">[değiştir]</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </ImageUploading>
               <center>
                  <HCaptcha
                     theme="dark"
                     sitekey="b523111d-90f5-4b0d-b29d-a4df5d370eac"
                     onLoad={onLoad}
                     onVerify={setToken}
                     ref={captchaRef}
                  />
               </center>
               <div style={{ height: 30 }}></div>
               {click === false ? (
                  <div className="form-button bg-zinc-800" type="button" onClick={() => {
                     if (!images[0]) {
                        setErr("Lütfen Resim Ekleyiniz")
                     } else {
                        setClick(true)
                        NewPost({ username, icerik, board, baslik, image: images[0].data_url, token: token }).then(res => {
                           if (res.message) {
                              setErr(res.message)
                              setClick(false)
                           }
                           if (res.post) {
                              navigate('/post/' + res.post)
                           }
                        })
                     }
                  }}>Gönderiyi Gönder</div>
               ) : (
                  <div className="form-button bg-zinc-800" type="button" aria-disabled="true" onClick={() => {

                  }}>Gönderi Gönderiliyor...</div>
               )}
            </div>
         </div>
      </div>
   )
}