// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.querySelector('.login-form');

//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         // Fetch the inputs
//         const email = document.querySelector('.email').value;
//         const password = document.querySelector('.password').value;
//         const authMsg = document.querySelector('.auth-msg');

//         try {
//             const response = await fetch('http://localhost:8000/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 authMsg.textContent = 'Successfully logged in';
//                 // Store the token (e.g., in localStorage)
//                 localStorage.setItem('token', data.token);

//                 // set JWT in the token in the cookie
//                 // document.cookie = `token=${data.token}; Path=/; Secure; HttpOnly; SameSite=Strict`

//                 // Redirect to home page or any other page
//                 window.location.href = '/';
//             } else {
//                 authMsg.textContent = data.message;
//             }
//         } catch (err) {
//             console.error('Error logging in:', err);
//             authMsg.textContent = 'An error occurred. Please try again.';
//         }
//     });
// });
