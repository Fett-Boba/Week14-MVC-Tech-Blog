const commentFormHandler = async (event) => {
     event.preventDefault();
     const post_id = document.getElementById("myBtn").value.trim();
     const comment_body = document.querySelector('#comment-text').value.trim();

     if (comment_body) {
          const response = await fetch('/api/comments', {
               method: 'POST',
               body: JSON.stringify({ post_id, comment_body }),
               headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
               document.location.reload();
          } else {
               alert(response.statusText);
          }
     }
};
document.querySelector('#addComment').addEventListener('submit', commentFormHandler);