
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