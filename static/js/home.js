// // home.js

// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         // Fetch the user profile while including the token in the request headers
//         const response = await fetch('/profile', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         });

//         // Check if the response is OK
//         if (response.ok) {
//             // Display the user profile content
//             const htmlContent = await response.text();
//             document.body.innerHTML = htmlContent;
//         } else if (response.status === 403) {
//             // Redirect to login page for unauthorized access
//             window.location.href = '/login';
//         } else {
//             console.error('Failed to load user profile:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error loading user profile:', error);
//     }
// });
