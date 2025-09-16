

document.addEventListener('DOMContentLoaded', () => {
    
    // Get all the sections and all the menu links
    const sections = document.querySelectorAll('section[data-id]');

    // Initialize AOS
    AOS.init({
      duration: 1000, // animation duration (ms)
      once: true      // whether animation should happen only once
    });






document.querySelectorAll('a.page-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Check if this is a cross-page link (starts with /)
        if (href.startsWith('/')) {
            // Let cross-page navigation happen normally
            return;
        }
        
        // Only prevent default for same-page hash links
        e.preventDefault();
        
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        // Make sure target exists on current page
        if (!target) {
            console.warn('Target element not found:', targetId);
            return;
        }
        
        const navbar = document.querySelector('.navbar');
        const navbarCollapse = document.getElementById('navbarCollapse');
        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        
        // If mobile menu is open, hide it first
        if (navbarCollapse && navbarCollapse.classList.contains('show') && collapseInstance) {
            collapseInstance.hide();
            // Wait for the menu to finish collapsing before scrolling
            navbarCollapse.addEventListener('hidden.bs.collapse', () => {
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navbarHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, { once: true });
        } else {
            // Desktop or already collapsed
            const navbarHeight = navbar.offsetHeight;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

});

/********************************************
 * Contact form
 *******************************************/
  const form = document.querySelector("form[name='registration']");
  const successMessage = document.getElementById("form-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent normal form submission

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      form.reset();
      successMessage.classList.remove("d-none");

      // Scroll to the success message
      window.scrollTo({ top: successMessage.offsetTop - 100, behavior: 'smooth' });

      // Hide the message after 10 seconds (10000ms)
      setTimeout(() => {
        successMessage.classList.add("d-none");
      }, 10000);
    })
    .catch((error) => {
      alert("Oops! Something went wrong. Please try again later.");
      console.error(error);
    });
  });