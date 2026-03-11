document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dark/Light Mode Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    
    // Force Dark Mode by default since the user prefers Deep Purple
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        // Ensure localStorage is set so it doesn't flicker
        localStorage.setItem('theme', 'dark');
    }
    
    // Ensure Initial Icon is Correct
    if (themeIcon) {
        if (savedTheme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Toggle Event
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let targetTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            
            if (themeIcon) {
                if (targetTheme === 'light') {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 4. Background Animation Setup (Shooting Stars & Twinkling Stars)
    const bgContainer = document.getElementById('bg-animation');
    if (bgContainer) {
        // Create twinkling stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            bgContainer.appendChild(star);
        }

        // Create shooting stars periodically
        setInterval(() => {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            shootingStar.style.top = `${Math.random() * 50}vh`; // Start from upper half
            shootingStar.style.animationDuration = `${Math.random() * 2 + 1}s`;
            bgContainer.appendChild(shootingStar);
            
            // Remove after animation completes
            setTimeout(() => {
                shootingStar.remove();
            }, 3000);
        }, 2000);
    }

    // 5. Playground Logic
    const runBtn = document.getElementById('run-code');
    const codeArea = document.getElementById('html-code');
    const previewFrame = document.getElementById('preview-frame');
    
    if (runBtn && codeArea && previewFrame) {
        runBtn.addEventListener('click', () => {
            const code = codeArea.value;
            const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
            
            if (code.trim() === '') {
                previewDoc.open();
                previewDoc.write('<body style="font-family: sans-serif; padding: 20px; color: red;">Error: Kodi është bosh. Ju lutem shkruani pak kod HTML.</body>');
                previewDoc.close();
                return;
            }
            
            // Simple validation: check if it looks like HTML (contains at least one basic tag)
            const hasHTMLTags = /<[a-z][\s\S]*>/i.test(code);
            
            if (!hasHTMLTags && code.trim().length > 0) {
                previewDoc.open();
                previewDoc.write('<body style="font-family: sans-serif; padding: 20px; background-color: #ffeaea; color: #cc0000; border: 1px solid #cc0000; border-radius: 8px; margin: 10px;"><h2><span style="font-size: 24px;">⚠️</span> Kujdes!</h2><p>Duket se kodi që keni shkruar nuk është HTML i vlefshëm.</p><p style="font-size: 14px; color: #666;">Sigurohuni që të përdorni etiketa HTML (psh. <code>&lt;h1&gt;Tekst&lt;/h1&gt;</code>).</p></body>');
                previewDoc.close();
                return;
            }
            
            // Valid code, run it
            previewDoc.open();
            previewDoc.write(code);
            previewDoc.close();
        });
        
        // Run once on load if there's default code
        if (codeArea.value.trim() !== '') {
            runBtn.click();
        }
    }

    // 6. Quiz Logic
    const quizOptions = document.querySelectorAll('.quiz-option');
    const checkAnswersBtn = document.getElementById('check-answers');
    
    // Handle option selection
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Find parent question container
            const questionContainer = this.closest('.quiz-options');
            
            // Remove selected class from all options in this question
            questionContainer.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
                opt.classList.remove('correct');
                opt.classList.remove('incorrect');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    
    // Handle answer checking
    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener('click', () => {
            const questions = document.querySelectorAll('.quiz-question');
            
            questions.forEach(question => {
                const selectedOption = question.querySelector('.quiz-option.selected');
                const feedback = question.querySelector('.quiz-feedback');
                
                if (!selectedOption) {
                    feedback.textContent = "Ju lutem zgjidhni një përgjigje.";
                    feedback.className = 'quiz-feedback error';
                    return;
                }
                
                const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    selectedOption.classList.add('correct');
                    feedback.textContent = "Saktë! 🎉";
                    feedback.className = 'quiz-feedback success';
                } else {
                    selectedOption.classList.add('incorrect');
                    feedback.textContent = "E gabuar. Provoni përsëri.";
                    feedback.className = 'quiz-feedback error';
                    
                    // Highlight correct answer
                    const correctOption = question.querySelector('.quiz-option[data-correct="true"]');
                    if (correctOption) {
                        correctOption.classList.add('correct');
                    }
                }
            });
        });
    }

    // Set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        }
    });

});
