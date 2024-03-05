async function signupFormHandler(event) {
  event.preventDefault(); // Prevent default form submission behavior
  
  // Get username and password from the form inputs
  const username = document.querySelector('#username-input-signup').value.trim();
  const password = document.querySelector('#password-input-signup').value.trim();

  // Check if username and password are not empty
  if (username && password) {
    try {
      // Send a POST request to the correct server endpoint for signup
      const response = await fetch('/api/user/signup', { 
        method: 'POST',
        body: JSON.stringify({ username, password }), // Send username and password as JSON in the request body
        headers: { 'Content-Type': 'application/json' }, // Specify content type as JSON
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // Redirect the user to the dashboard upon successful signup
        document.location.replace('/dashboard');
      } else {
        // Display an alert if signup failed
        alert('Failed to sign up.');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error:', error);
      alert('An error occurred while signing up.');
    }
  }
}

// Add event listener to the signup form for form submission
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);