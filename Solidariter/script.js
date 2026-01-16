        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Custom donation amount handling
        const donationAmounts = document.querySelectorAll('input[name="donationAmount"]');
        const customAmountInput = document.getElementById('customAmount');
        
        donationAmounts.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'custom') {
                    customAmountInput.style.display = 'block';
                    customAmountInput.focus();
                } else {
                    customAmountInput.style.display = 'none';
                }
            });
        });
        
        // Form submission
        const donationForm = document.getElementById('donationForm');
        const successModal = document.getElementById('successModal');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('donorName').value;
            const email = document.getElementById('donorEmail').value;
            const cause = document.getElementById('causeSelect').value;
            const message = document.getElementById('donorMessage').value;
            
            let amount;
            const selectedAmount = document.querySelector('input[name="donationAmount"]:checked').value;
            
            if (selectedAmount === 'custom') {
                amount = customAmountInput.value;
                if (!amount || amount <= 0) {
                    alert('Veuillez saisir un montant valide.');
                    return;
                }
            } else {
                amount = selectedAmount;
            }
            
            // In a real application, you would send this data to a server
            console.log('Donation submitted:', { name, email, cause, amount, message });
            
            // Show success modal
            successModal.style.display = 'flex';
            
            // Reset form
            donationForm.reset();
            customAmountInput.style.display = 'none';
        });
        
        // Close modal functionality
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                successModal.style.display = 'none';
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update statistics with animation
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16); // 60fps
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start).toLocaleString();
                }
            }, 16);
        }
        
        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statItems = entry.target.querySelectorAll('.stat-number');
                    
                    statItems.forEach(item => {
                        const target = parseInt(item.textContent.replace(/,/g, ''));
                        animateCounter(item, target, 1500);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.getElementById('impact'));