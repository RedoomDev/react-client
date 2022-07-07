import React, { useContext, useEffect, useRef, useState } from "react"
import ImageUploading from 'react-images-uploading';
import { useHistory } from "react-router-dom";
import Select from 'react-select'
import { NewPost } from "../../../fetch/fetchs";
import { BoardContext } from "../../../contexts/board.context";
import { AdminPost } from "../fetchs";


export function PostEditWindow({ setModal, board, post }) {
   let history = useHistory();

   const [baslik, setBaslik] = useState("")
   const [icerik, setIcerik] = useState("")
   const [err, setErr] = useState("")

   const [section, setSection] = useState("text")

   const [images, setImages] = React.useState([]);
   const [click, setClick] = useState(false)
   const maxNumber = 10;
   const maxFileSize = 8000000;



   useEffect(() => {
      setBaslik(post.baslik)
      setIcerik(post.icerik)
   }, [])




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

      if (board) {
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
               <div className="form-label">Başlık</div>
               <input value={baslik} className="form-input bg-zinc-800" onChange={(e) => {
                  setBaslik(e.target.value)
               }}></input>

               {!board ? (
                  <>
                     <div className="form-label">Konu</div>
                     <Select
                        classNamePrefix="react-select"
                        options={options} defaultValue={{
                           'label': boards[0].find(a => a.id === post.board).baslik
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


               {section === "text" ? (
                  <>
                     <div className="form-label">İçerik</div>
                     <textarea value={icerik} className="form-input bg-zinc-800" maxLength="50000" onChange={(e) => {
                        setIcerik(e.target.value)
                     }}></textarea>
                     <span>{icerik.length} / 50000</span>
                  </>
               ) : (<></>)}

               <div style={{ height: 30 }}></div>
               <div className="form-button" onClick={() => {
                  setClick(true)
                  AdminPost({
                     endpoint: "/admin/post/edit/" + post.id,
                     data: { baslik, icerik, board: boardselection }
                  }).then(res => {
                     if (!res.error) {
                        history.push('/admin')
                     }
                  })
               }}>Gönderiyi Gönder</div>

            </div>
         </div>
      </div>
   )
}