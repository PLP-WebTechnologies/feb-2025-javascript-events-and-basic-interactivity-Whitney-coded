// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Event Handling 🎈

  // Button click: change text and color
  const colorButton = document.getElementById('colorButton');
  colorButton.addEventListener('click', () => {
    const changed = colorButton.classList.toggle('changed');
    colorButton.textContent = changed ? 'Color Changed!' : 'Click me to change color';
  });

  // Hover effects on div
  const hoverBox = document.getElementById('hoverBox');
  hoverBox.addEventListener('mouseover', () => {
    hoverBox.classList.add('hovered');
  });
  hoverBox.addEventListener('mouseout', () => {
    hoverBox.classList.remove('hovered');
  });

  // Keypress detection - display pressed key
  const keyPressDisplay = document.getElementById('keyPressDisplay');
  window.addEventListener('keydown', (event) => {
    keyPressDisplay.textContent = `You pressed: ${event.key}`;
  });

  // Bonus: secret action on double-click or long press
  const secretButton = document.getElementById('secretButton');
  let longPressTimer;

  // Double click action
  secretButton.addEventListener('dblclick', () => {
    alert('Secret double-click action triggered! 🎉');
  });

  // Long press detection (press > 800ms)
  secretButton.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => {
      alert('Secret long press action triggered! 🤫');
    }, 800);
  });
  secretButton.addEventListener('mouseup', () => {
    clearTimeout(longPressTimer);
  });
  secretButton.addEventListener('mouseleave', () => {
    clearTimeout(longPressTimer);
  });

  // 2. Interactive Elements 🎮

  // Image Gallery / Slideshow
  const images = document.querySelectorAll('.gallery-image');
  let currentImageIndex = 0;
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  });

  // Initialize gallery
  showImage(currentImageIndex);

  // Tabs
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;

      // Remove active from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activate clicked tab and content
      button.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Bonus: Add animation to tabs content (fade in)
  tabContents.forEach(content => {
    content.style.transition = 'opacity 0.5s ease';
  });

  // 3. Form Validation 📋

  const form = document.getElementById('signupForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Helper function to validate email format
  function isValidEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Real-time feedback while typing
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Name is required.';
    } else {
      nameError.textContent = '';
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required.';
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email.';
    } else {
      emailError.textContent = '';
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters.';
    } else {
      passwordError.textContent = '';
    }
  });

  // On form submit validate all fields
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Name is required.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    if (passwordInput.value.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters.';
      valid = false;
    } else {
      passwordError.textContent = '';
    }

    if (valid) {
      alert('Form submitted successfully!');
      form.reset();
      // Clear errors
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
    }
  });
});
