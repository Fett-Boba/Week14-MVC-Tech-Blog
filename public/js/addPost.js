const postFormHandler = async (event) => {
     event.preventDefault();

     const post_title = document.querySelector('#post-title').value.trim();
     const post_body = document.querySelector('#post-body').value.trim();

     if (post_body) {
          const response = await fetch('/api/posts', {
               method: 'POST',
               body: JSON.stringify({ post_title, post_body }),
               headers: { 'Content-Type': 'application/json' },
          });
          // console.log(response);
          if (response.ok) {
               document.location.replace('/dashboard');
          } else {
               alert(response.statusText);
          }
     }
};

document.querySelector('#addPost').addEventListener('submit', postFormHandler);
