const updatePostFormHandler = async (event) => {
     //event.preventDefault();

     const post_id = document.getElementById("updateBtn").value.trim();
     const post_title = document.querySelector('#postTitle').value.trim();
     const post_body = document.querySelector('#postBody').value.trim();

     if (post_title || post_body) {
          const response = await fetch(`/api/posts/${post_id}`, {
               method: 'PUT',
               body: JSON.stringify({ post_id, post_title, post_body }),
               headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
               document.location.replace('/dashboard');
          } else {
               alert(response.statusText);
          }
     }
};

document.querySelector('#updateBtn').addEventListener('click', updatePostFormHandler);