// Initialize Lucide Icons
lucide.createIcons();

/* ==========================================
   CURSOR GLOW FOLLOWER
   ========================================== */
const cursorGlow = document.getElementById('cursor-glow');

if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    // Offset by half of cursor size (150px) to center it
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================
   MOBILE NAVIGATION TOGGLE
   ========================================== */
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change menu icon between menu and x
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons({
      attrs: {
        'data-lucide': icon.getAttribute('data-lucide')
      },
      nameAttr: 'data-lucide'
    });
  });

  // Close mobile menu when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  });
}

/* ==========================================
   TYPEWRITER EFFECT
   ========================================== */
const typewriterElement = document.getElementById('typewriter');
const words = [
  "intelligent AI systems",
  "immersive web experiences",
  "pixel-perfect interfaces",
  "full stack applications"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; // faster deletion
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100; // standard writing
  }

  // Word complete
  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1500; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Pause before typing next word
  }

  setTimeout(type, typeSpeed);
}

if (typewriterElement) {
  setTimeout(type, 1000);
}

/* ==========================================
   SCROLLSPY (ACTIVE NAV STATE)
   ========================================== */
const sections = document.querySelectorAll('section');

const observerOptions = {
  root: null,
  rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle of screen
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeSectionId = entry.target.getAttribute('id');
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

/* ==========================================
   SKILLS PROGRESS BARS ANIMATION
   ========================================== */
const skillsGrid = document.querySelector('.skills-grid');

if (skillsGrid) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillsGrid.classList.add('animate-bars');
        skillsObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.15 });

  skillsObserver.observe(skillsGrid);
}

/* ==========================================
   INTERACTIVE TERMINAL SIMULATOR
   ========================================== */
const terminalBody = document.getElementById('terminal-body');

const terminalLogs = [
  { prompt: true, text: "git status" },
  { output: true, text: "On branch main\nYour branch is up-to-date with 'origin/main'.\n\nnothing to commit, working tree clean" },
  { prompt: true, text: "ping -c 3 api.aether.labs" },
  { output: true, text: "PING api.aether.labs (104.244.42.1) 56(84) bytes of data.\n64 bytes from 104.244.42.1: icmp_seq=1 ttl=56 time=12.4 ms\n64 bytes from 104.244.42.1: icmp_seq=2 ttl=56 time=11.8 ms\n\n--- api.aether.labs ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss, time 1002ms\nrtt min/avg/max/mdev = 11.821/12.112/12.404/0.291 ms" },
  { prompt: true, text: "echo 'Success'" },
  { output: true, text: "Success" }
];

let logIndex = 0;

function appendTerminalLog() {
  if (logIndex >= terminalLogs.length || !terminalBody) return;
  
  const log = terminalLogs[logIndex];
  
  // Remove cursor temporarily
  const cursorRow = terminalBody.querySelector('.terminal-row:last-child');
  if (cursorRow) cursorRow.remove();
  
  const newRow = document.createElement('div');
  newRow.className = 'terminal-row';
  
  if (log.prompt) {
    newRow.innerHTML = `<span class="terminal-prompt">~</span> <span class="terminal-command">${log.text}</span>`;
  } else {
    newRow.className = 'terminal-row terminal-output';
    newRow.innerHTML = `<pre>${log.text}</pre>`;
  }
  
  terminalBody.appendChild(newRow);
  
  // Re-add cursor row
  const cursorNewRow = document.createElement('div');
  cursorNewRow.className = 'terminal-row';
  cursorNewRow.innerHTML = `<span class="terminal-prompt">~</span> <span class="terminal-cursor">█</span>`;
  terminalBody.appendChild(cursorNewRow);
  
  // Scroll to bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
  
  logIndex++;
  
  // Wait before next log
  setTimeout(appendTerminalLog, log.prompt ? 1500 : 800);
}

// Start adding terminal logs 3.5 seconds after page loads
if (terminalBody) {
  setTimeout(appendTerminalLog, 3500);
}

/* ==========================================
   CONTACT FORM SUBMISSION SIMULATOR
   ========================================== */
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formFeedback = document.getElementById('form-feedback');

if (contactForm && submitBtn && formFeedback) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable inputs & button
    submitBtn.disabled = true;
    const btnSpan = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    
    const originalBtnText = btnSpan.textContent;
    btnSpan.textContent = 'Sending Message...';
    btnIcon.setAttribute('data-lucide', 'loader');
    lucide.createIcons();
    
    // Simulate API request
    setTimeout(() => {
      // Re-enable
      submitBtn.disabled = false;
      btnSpan.textContent = originalBtnText;
      btnIcon.setAttribute('data-lucide', 'arrow-right');
      lucide.createIcons();
      
      // Show feedback
      formFeedback.classList.remove('hidden', 'error');
      formFeedback.classList.add('success');
      formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
      
      // Clear form
      contactForm.reset();
      
      // Hide feedback after 5 seconds
      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 5000);
      
    }, 1800);
  });
}
