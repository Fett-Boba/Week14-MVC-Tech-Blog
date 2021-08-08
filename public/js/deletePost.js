const deletePostFormHandler = async (event) => {

     //event.preventDefault();


     const id = document.getElementById("deleteBtn").value.trim();

     const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
     });
     if (response.ok) {
          document.location.replace('/dashboard');
     } else {
          alert(response.statusText);
     }

};

document.querySelector('#deleteBtn').addEventListener('click', deletePostFormHandler);
