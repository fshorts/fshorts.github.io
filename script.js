document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scroll for CTA Button ---
    const ctaButton = document.querySelector('.cta-button[href="#hero"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('#hero').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Form Handling (Using mailto:) ---
    const form = document.getElementById('preregister-form');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('form-message');
    const recipientEmail = 'your-business-email@example.com'; // <<<--- IMPORTANT: SET YOUR EMAIL HERE

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const userEmail = emailInput.value.trim();

            // Basic validation
            if (!userEmail || !validateEmail(userEmail)) {
                displayMessage('Please enter a valid email address.', 'error');
                return;
            }

            // --- Create the mailto link ---
            const subject = encodeURIComponent('fshorts App Pre-registration Request');
            const body = encodeURIComponent(
`Hello fshorts Team,

Please add my email address to the pre-registration list for the fshorts app launch notifications.

My email: ${userEmail}

Thank you!`
            ); // encodeURIComponent handles spaces, newlines etc.

            const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

            // Display feedback message
            displayMessage('Opening your email client...', 'info'); // Using 'info' class, you might want to style this

            // Attempt to open the mail client
            // Use a slight delay to allow the message to be seen
            setTimeout(() => {
                 try {
                    window.location.href = mailtoLink;
                    // Clear message after successful attempt to open mail client
                     // Note: We don't know if the user actually *sent* the email
                    clearMessage();
                 } catch (error) {
                    console.error("Failed to open mail client:", error);
                    displayMessage('Could not open email client. Please manually send an email.', 'error');
                 }
                 // Optionally clear the input field after attempting
                 // emailInput.value = '';
            }, 500); // 0.5 second delay


        });
    }

    function displayMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        // Add 'info' class handling alongside 'success' and 'error'
        formMessage.className = type; // 'success', 'error', or 'info'
    }

    function clearMessage() {
        if (!formMessage) return;
        formMessage.textContent = '';
        formMessage.className = '';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    // --- Scroll Animation Logic (Remains the same) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target); // Optional
                }
                // Optional: Remove class if scrolling back up
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        }, {
            threshold: 0.1
            // rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
        console.log("Intersection Observer not supported, animations disabled or shown by default.");
    }

}); // End DOMContentLoaded