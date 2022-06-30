import { useEffect, useRef, useState } from "react"
import { api_url } from "../../config"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import ImageWindow from "./ImageModal";





export default function PostImage({ post }) {


   const buttonStyle = {
      width: "30px",
      background: 'none',
      border: '0px',
   };

   const properties = {
      prevArrow: <button style={{ ...buttonStyle, marginLeft: 20 }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" /></svg></button>,
      nextArrow: <button style={{ ...buttonStyle, marginRight: 20 }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z" /></svg></button>
   }

   const [images, setImages] = useState([])
   const [selectedImage, setSelectedImage] = useState("")

   useEffect(() => {
      if (post.image) {
         setImages(post.image)
      }
   }, [post])

   return (
      <div className="post-images">
         <Slide autoplay={false} transitionDuration={200} infinite={false} prevArrow={properties.prevArrow} nextArrow={properties.nextArrow}>
            {images.map((a, idx) => (
               <>
                  <div onClick={() => {
                     setSelectedImage(api_url + "/media/" + post.id + "/" + idx)
                  }} className="post-image-area">
                     <img className="post-image" loading="lazy" src={api_url + "/media/" + post.id + "/" + idx} key={post.id} alt="" />
                  </div>

                  <span className="post-images-pc">
                     <img className="post-image" loading="lazy" src={api_url + "/media/" + post.id + "/" + idx} key={post.id} alt="" />
                  </span>
               </>
            ))}
         </Slide>
         {selectedImage ? (<ImageWindow images={images} selected={selectedImage} setSelected={setSelectedImage} />) : (<></>)}
      </div>
   )
}