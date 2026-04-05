  // Reveal sections on scroll
  const sections = document.querySelectorAll('section');
    
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
  });
  
  // Initialize EmailJS
  (function () {
    emailjs.init("Iz8IMSNwl3vbmaye9"); // Your EmailJS public key
  })();
  
  // Connect "Order Now" buttons to the order form
  document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
      // Get the brownie type from the button's data attribute
      const brownieType = this.getAttribute('data-brownie');
      
      // Scroll to the order section
      document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
      
      // Set the brownie type in the select dropdown
      document.getElementById('item').value = brownieType;
    });
  });
  
  // Handle form submission with file upload
  document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const status = document.getElementById("order-status");
    const thankYouBox = document.getElementById("thank-you-box");
    const form = this;
    
    // Validate file upload
    const fileInput = document.getElementById('payment-proof');
    if (fileInput.files.length === 0) {
      status.textContent = "❌ Please upload proof of payment";
      return;
    }
    
    status.textContent = "Sending order...";
    
    // Create a FormData object to handle the file upload
    const formData = new FormData(form);
    
    // Prepare the EmailJS parameters
    const templateParams = {
      user_name: formData.get('user_name'),
      user_contact: formData.get('user_contact'),
      user_item: formData.get('user_item'),
      user_quantity: formData.get('user_quantity'),
      user_email: formData.get('user_email'),
      // Note: The file itself will be handled separately
    };
    
    // Send the email
    emailjs.send("service_9zq9kj6", "template_7o1lokd", templateParams)
      .then(() => {
        // Show the thank you message
        thankYouBox.style.display = "block";
        
        // Hide the form fields
        Array.from(form.elements).forEach(element => {
          if (element.type !== "submit") {
            element.parentElement.style.display = "none";
          }
        });
        
        // Hide the submit button
        form.querySelector('button[type="submit"]').style.display = "none";
        
        // Clear the status message
        status.textContent = "";
        
        // Reset the form data (behind the scenes)
        form.reset();
        
        // Scroll to the thank you message
        thankYouBox.scrollIntoView({ behavior: 'smooth' });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        status.textContent = "❌ Something went wrong. Please try again or message me on WhatsApp.";
      });
  });
  
  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.getElementById('payment-proof').addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
