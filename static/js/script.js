document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Login successful, redirecting...");
            window.location.href = "/introduce";
        } else {
            alert('Login failed');
        }
    });
});
 


document.getElementById("introForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let introduction = document.getElementById("introduction").value;
    fetch('/submit-intro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ introduction })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Your introduction has been submitted for approval.');
            window.location.href = "/admin";
        } else {
            alert('Submission failed.');
        }
    });
});
