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

export function PostReply({ username, icerik, reply, post }) {

   var data = {
      username,
      icerik,
      reply
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