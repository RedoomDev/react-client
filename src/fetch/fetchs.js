import axios from "axios";
import { api_url } from "../config";
import { errors } from "./errors";

export function GetBoards() {
   let boards = new Promise((resolve) => {
      axios.get(api_url + "/board/get/boards").then(res => {
         resolve(res.data)
      }).catch(err => resolve(errors.errorMessages.axiosError));
   });

   let result = boards;

   return result
}