import React, { useContext, useEffect, useRef, useState } from "react"
import { NewPost } from "../fetch/fetchs"
import ImageUploading from 'react-images-uploading';
import { useHistory } from "react-router-dom";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { BoardContext } from "../contexts/board.context";
import Select from 'react-select'


export function PostWindow({ setModal, board }) {
   let history = useHistory();

   const [username, setUsername] = useState("")
   const [baslik, setBaslik] = useState("")
   const [icerik, setIcerik] = useState("")
   const [err, setErr] = useState("")
   const [token, setToken] = useState(null);
   const captchaRef = useRef(null);

   const [section, setSection] = useState("text")

   const [images, setImages] = React.useState([]);
   const [click, setClick] = useState(false)
   const maxNumber = 10;
   const maxFileSize = 8000000;



   useEffect(() => {
      setUsername(localStorage.getItem("username") || "")
   }, [])

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

   const [options, setOptions] = useState([])

   const boards = useContext(BoardContext)

   const [boardselection, setBoard] = useState("undefined")

   useEffect(() => {
      window.scrollTo(0, 0)
      boards[0].map(a => {
         setOptions(old => [...old, {
            'label': a.baslik,
            'value': a.slug
         }])
      })

      if(board){
         setBoard(board)
      }
   }, [board])

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
            if (images.length < 10) {
               setImages(old => [...old, data])
            } else {
               setErr("En fazla 10 resim")
            }
         })
      }
   }

   const customStyles = {
      control: () => ({
         backgroundColor: 'rgb(47, 47, 53)',
         minHeight: 38,
         display: 'flex',
      }),
      singleValue: () => ({
         color: 'white',
         display: 'flex',
         gridArea: '1 / 1 / 2 / 3'
      })
   }



   return (
      <div className="fullscreen-modal-window" onPaste={handlePaste}>
         <div className="window">
            <div className="form">
               <i className="close-button fa fa-x" onClick={() => setModal(false)} ></i>
               <div className="post-error">{err}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" value={username} onChange={(e) => {
                  setUsername(e.target.value)
               }}></input>
               <div className="form-label">Başlık</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setBaslik(e.target.value)
               }}></input>

               {!board ? (
                  <>
                     <div className="form-label">Konu</div>
                     <Select
                        classNamePrefix="react-select"
                        options={options} defaultValue={{
                           'label': "Lütfen bir konu seçiniz"
                        }}
                        key="select"
                        onChange={(e) => {
                           setBoard(e.value)
                        }}
                        className="react-select-container"
                        styles={customStyles}
                     ></Select>
                  </>
               ) : (<></>)}

               <div className="section-menu">
                  <div className="section-item" style={section === "text" ? ({ borderBottom: "1px solid white", backgroundColor: "rgb(39 39 42)" }) : ({})} onClick={() => { setSection("text") }}>Yazı</div>
                  <div className="section-item" style={section === "image" ? ({ borderBottom: "1px solid white", backgroundColor: "rgb(39 39 42)" }) : ({})} onClick={() => { setSection("image") }}>Resim</div>
               </div>

               {section === "text" ? (
                  <>
                     <div className="form-label">İçerik</div>
                     <textarea className="form-input bg-zinc-800" maxLength="50000" onChange={(e) => {
                        setIcerik(e.target.value)
                     }}></textarea>
                     <span>{icerik.length} / 50000</span>
                  </>
               ) : (<></>)}

               {section === "image" ? (
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
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors
                     }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                           {errors && <div>{errors.maxFileSize && <span>Dosya boyutu en fazla 8mb olabilir</span>}       {errors.maxNumber && <span>En fazla 10 resim</span>}</div>}
                           <button
                              className="upload_image_button bg-zinc-800"
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                           >
                              [Tıkla ya da üstüne resim sürükle]
                           </button>
                           &nbsp;
                           <div className="image-items">
                              {imageList.map((image, index) => (
                                 <div key={index} className="image-item">
                                    <span className="delete-image" onClick={() => onImageRemove(index)}><i className="fa fa-x"></i></span>
                                    <img src={image['data_url']} alt="" className="uploaded_image" />
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </ImageUploading>
               ) : (<></>)}

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
                  <div className="form-button" onClick={() => {
                     setClick(true)
                     NewPost({ username, icerik, board: boardselection, baslik, image: images || "", token: token }).then(res => {
                        if (res.message) {
                           localStorage.setItem("username", username)
                           setErr(res.message)
                           setClick(false)
                        }
                        if (res.post) {
                           localStorage.setItem("username", username)
                           history.push('/post/' + res.post)
                        }
                     })
                  }}>Gönderiyi Gönder</div>
               ) : (
                  <div className="form-button" aria-disabled="true" onClick={() => {

                  }}>Gönderi Gönderiliyor...</div>
               )}
            </div>
         </div>
      </div>
   )
}