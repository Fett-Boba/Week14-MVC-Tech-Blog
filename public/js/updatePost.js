const updatePostFormHandler = async (event) => {
     //event.preventDefault();

     const id = document.getElementById("updateBtn").value.trim();

     // const response = await fetch(`/api/posts/${id}`, {
     //      method: 'DELETE',
     // });
     // if (response.ok) {
     //      document.location.replace('/dashboard');
     // } else {
     //      alert(response.statusText);
     // }

};

document.querySelector('#updateBtn').addEventListener('click', updatePostFormHandler);






// Update an existing post
async function updatePost(id) {
     const post_id = document.getElementById("myBtn").value.trim();
     const post_title = document.querySelector('#postTitle').value.trim();
     const post_body = document.querySelector('#postBody').value.trim();

     if (post_title || post_body) {
          const response = await fetch(`/api/post/update/${id}`, {
               method: 'PUT',
               body: JSON.stringify({ post_id, post_title, post_body }),
               headers: { 'Content-Type': 'application/json' },
          });
          console.log("----====>>>> " + response);
          if (response.ok) {
               document.location.replace('/api/dashboard');
          } else {
               alert(response.statusText);
          }
     }
}