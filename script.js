const words = ["Python Developer","AI Engineer", "Machine Learning Engineer", "Data Scientist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const textElement = document.getElementById("typewriter-text");

function typeEffect() {
  const currentWord = words[wordIndex];
  
  // Determine if we are adding or removing characters
  if (isDeleting) {
    // Erase character
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Type character
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  // Default typing speed
  let typeSpeed = isDeleting ? 50 : 100; 

  // Rule 1: Word is fully typed
  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1500; // Pause at the end of the word
    isDeleting = true;
  } 
  // Rule 2: Word is fully erased
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Move to next word (loops back)
    typeSpeed = 500; // Short pause before starting next word
  }

  // Recursively call the function with the dynamic speed
  setTimeout(typeEffect, typeSpeed);
}

// Start the effect on page load
document.addEventListener("DOMContentLoaded", typeEffect);


document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    // Toggles the drop-down menu panel when mobile navbar bars are clicked
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
        
        // Optional decoration: Animate hamburger bars to a close cross indicator
        menuToggle.classList.toggle("is-active");
    });
    
    // Close mobile drop-down when user clicks a nav link item
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const educationSection = document.getElementById("education");
    const pipelineProgress = document.getElementById("pipeline-progress-bar");
    const pipelineNodes = document.querySelectorAll(".pipeline-node");

    function processPipelineTracking() {
        if (!educationSection || !pipelineProgress) return;

        const rect = educationSection.getBoundingClientRect();
        const topDistance = rect.top;
        const totalHeight = rect.height;
        const screenHeight = window.innerHeight;

        // Measures scrolling penetration deep into the element area bounds
        let viewportTrigger = (screenHeight * 0.75) - topDistance;
        let fillRatio = (viewportTrigger / (totalHeight * 0.5)) * 100;
        
        // Pin limits safely to scale allocations
        fillRatio = Math.max(0, Math.min(fillRatio, 100));
        
        // Extend the beam length width percentage directly
        pipelineProgress.style.width = `${fillRatio}%`;

        // Iterates steps checking milestones status tags
        pipelineNodes.forEach((node, index) => {
            // Calculates percentage mapping check windows (e.g. at 10%, 45%, 80%)
            const segmentTarget = (index / (pipelineNodes.length - 1)) * 75 + 10;
            
            if (fillRatio >= segmentTarget) {
                node.classList.add("revealed");
            } else {
                node.classList.remove("revealed");
            }
        });
    }

    // Bind reactive layout calculation performance hooks
    window.addEventListener("scroll", processPipelineTracking);
    window.addEventListener("resize", processPipelineTracking);
    
    // Initial verification bootstrap loop
    setTimeout(processPipelineTracking, 150);
});


const skillsSection = document.querySelector('.dynamic-mat-trigger');

const matObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsSection.classList.add('unfolded');
            skillsSection.classList.remove('folded-exit');
        } else {
            if (skillsSection.classList.contains('unfolded')) {
                skillsSection.classList.add('folded-exit');
                skillsSection.classList.remove('unfolded');
            }
        }
    });
}, {
    threshold: 0.2
});

matObserver.observe(skillsSection);



document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("projects");
    const grid = section.querySelector(".projects-grid");
    const cards = section.querySelectorAll(".project-card");

    const setupDeckDistribution = () => {
        if (section.classList.contains("deal-cards")) return;
        
        const gridRect = grid.getBoundingClientRect();
        const centerX = gridRect.width / 2;
        
        cards.forEach((card, index) => {
            const cardWidth = card.offsetWidth;
            const cardLeft = card.offsetLeft;
            const targetX = cardLeft + (cardWidth / 2);
            const offsetX = centerX - targetX;
            
            let offsetY = 120; 
            let rotateDeg = (index - (cards.length - 1) / 2) * 5; 
            
            card.style.setProperty("--deal-x", `${offsetX}px`);
            card.style.setProperty("--deal-y", `${offsetY}px`);
            card.style.setProperty("--deal-r", `${rotateDeg}deg`);
        });
    };

    setupDeckDistribution();
    window.addEventListener("resize", setupDeckDistribution);

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add("deal-cards");
            } else {
                if (entry.boundingClientRect.top > 0) {
                    section.classList.remove("deal-cards");
                }
            }
        });
    }, {
        threshold: 0.12
    });

    cardObserver.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
    const emailCard = document.getElementById("email-card");
    const phoneCard = document.getElementById("phone-card");

    const setupSecureAction = (card, targetValue, displayValue) => {
        const textElement = card.querySelector(".masked-text");
        const statusPill = card.querySelector(".copy-status-pill");

        card.addEventListener("mouseenter", () => {
            textElement.textContent = displayValue;
        });

        card.addEventListener("mouseleave", () => {
            if (!statusPill.classList.contains("reveal")) {
                textElement.textContent = "Click to copy";
            }
        });

        card.addEventListener("click", () => {
            navigator.clipboard.writeText(targetValue).then(() => {
                statusPill.classList.add("reveal");
                textElement.textContent = "Copied to clipboard!";
                
                setTimeout(() => {
                    statusPill.classList.remove("reveal");
                    textElement.textContent = displayValue;
                }, 2500);
            });
        });
    };

    if (emailCard) {
        const email = emailCard.getAttribute("data-secure-email");
        setupSecureAction(emailCard, email, email);
    }

    if (phoneCard) {
        const phoneRaw = phoneCard.getAttribute("data-secure-phone");
        const phoneDisplay = phoneCard.getAttribute("data-display-phone");
        setupSecureAction(phoneCard, phoneRaw, phoneDisplay);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");
    const links = navLinks.querySelectorAll("a");

    const toggleMenu = () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    };

    menuToggle.addEventListener("click", toggleMenu);

    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    });
});