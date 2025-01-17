// Function to fetch intros from the server
function fetchIntros() {
    fetch('/get-intros')
        .then(response => response.json())
        .then(data => {
            const intros = data.intros;
            let introHtml = '';

            // Loop through intros and build the HTML
            intros.forEach(intro => {
                introHtml += `
                    <div class="intro-item">
                        <p><strong>Introduction:</strong> ${intro.introduction}</p>
                        <p><strong>Status:</strong> ${intro.status}</p>
                        <button class="approve-btn" data-id="${intro._id}">Approve</button>
                        <button class="reject-btn" data-id="${intro._id}">Reject</button>
                    </div>
                    <hr>
                `;
            });

            // Insert the intros into the intro-list div
            document.getElementById("intro-list").innerHTML = introHtml;
        })
        .catch(error => console.error('Error fetching intros:', error));
}

// Fetch intros on page load
window.onload = function() {
    fetchIntros();
}

// Function to approve an intro
function approveIntro(introId) {
    fetch('/approve-intro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: introId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Introduction Approved');
            fetchIntros(); // Refresh the list
        }
    })
    .catch(error => console.error('Error approving intro:', error));
}

// Function to reject an intro
function rejectIntro(introId) {
    fetch('/reject-intro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: introId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Introduction Rejected');
            fetchIntros(); // Refresh the list
        }
    })
    .catch(error => console.error('Error rejecting intro:', error));
}

// Event delegation for approve/reject buttons
document.getElementById("intro-list").addEventListener("click", function(event) {
    const button = event.target;

    if (button.classList.contains("approve-btn")) {
        const introId = button.getAttribute("data-id");
        approveIntro(introId);
    }

    if (button.classList.contains("reject-btn")) {
        const introId = button.getAttribute("data-id");
        rejectIntro(introId);
    }
});
