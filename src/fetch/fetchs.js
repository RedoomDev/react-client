import axios from "axios";
import { api_url } from "../config";
import { errors } from "./errors";
const qs = require('qs');

export function GetBoards() {
   let boards = new Promise((resolve) => {
      axios.get(api_url + "/board/get/boards").then(res => {
         resolve(res.data)
      }).catch(err => resolve(errors.errorMessages.axiosError));
   });

   let result = boards;

   return result;
}

export function GetPosts() {
   let posts = new Promise((resolve) => {
      axios.get(api_url + "/board/get/posts").then(res => {
         resolve(res.data)
      }).catch(err => resolve(errors.errorMessages.axiosError));
   });

   let result = posts;

   return result;
}

export function GetPostsFromBoard({ slug, skip, limit }) {
   let posts = new Promise((resolve) => {
      axios.get(api_url + "/board/get/posts/" + slug + "?limit=" + limit + "&skip=" + skip).then(res => {
         resolve(res.data)
      }).catch(err => resolve(errors.errorMessages.axiosError));
   });

   let result = posts;

   return result;
}

export function GetPost({ id, skip, limit }) {
   let post = new Promise((resolve) => {
      axios.get(api_url + "/board/get/post/" + id + "?limit=" + limit + "&skip=" + skip).then(res => {
         resolve(res.data)
      }).catch(err => resolve(errors.errorMessages.axiosError));
   });

   let result = post;

   return result;
}

export function PostReply({ username, icerik, reply, post, image, token }) {

   var data = {
      username,
      icerik,
      reply,
      image,
      token
   }

   let replyPost = new Promise((resolve) => {
      axios({
         url: api_url + "/board/new/comment/" + post,
         method: 'POST',
         data: qs.stringify(data)
      }).then(res => resolve(res.data)).catch(err => resolve(errors.errorMessages.axiosError));
   })

   let result = replyPost;

   return result;
}

export function NewPost({ username, icerik, board, baslik, image, token }) {

   var data = {
      username,
      icerik,
      baslik,
      image,
      token
   }

   let replyPost = new Promise((resolve) => {
      axios({
         url: api_url + "/board/new/post/" + board,
         method: 'POST',
         data: qs.stringify(data)
      }).then(res => resolve(res.data)).catch(err => resolve(errors.errorMessages.axiosError));
   })

   let result = replyPost;

   return result;
}

export function GetAuthData() {
   let data = new Promise((resolve) => {
      axios({
         url: api_url + "/auth/me",
         method: "GET",
         headers: {
            'authorization': localStorage.getItem("token")
         }
      }).then(res => {
         resolve(res.data)
      })
   })

   return data
}

export function LoginPost(data) {
   let login = new Promise((resolve) => {
      axios({
         url: api_url + "/auth/login",
         method: 'POST',
         data: qs.stringify(data)
      }).then(res => resolve(res.data)).catch(err => resolve(errors.errorMessages.axiosError));
   })

   let result = login;

   return result;
}