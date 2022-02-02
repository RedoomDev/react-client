import axios from "axios";
import { api_url } from "../../config";
import { errors } from "../../fetch/errors";
const qs = require('qs');

export function AdminPost({ endpoint, data }) {
   let replyPost = new Promise((resolve) => {
      axios({
         url: api_url + endpoint,
         method: 'POST',
         headers: {
            'authorization': localStorage.getItem("token")
         },
         data: qs.stringify(data)
      }).then(res => resolve(res.data)).catch(err => resolve(errors.errorMessages.axiosError));
   })

   let result = replyPost;

   return result;

}

export function AdminGet({ endpoint }) {
   let data = new Promise((resolve) => {
      axios({
         url: api_url + endpoint,
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