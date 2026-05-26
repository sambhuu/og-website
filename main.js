/* ==========================================================================
   ⚙️ OG STUDIO MARKETING SITE INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       📊 ROI PROFIT CALCULATOR LOGIC
       ========================================== */
    const jobsSlider = document.getElementById('jobs-slider');
    const profitSlider = document.getElementById('profit-slider');
    
    const jobsVal = document.getElementById('jobs-val');
    const profitVal = document.getElementById('profit-val');
    
    const timeSavedVal = document.getElementById('time-saved-val');
    const paperSavedVal = document.getElementById('paper-saved-val');
    const dailyProfitVal = document.getElementById('daily-profit-val');
    const monthlyProfitVal = document.getElementById('monthly-profit-val');
    const paybackDaysVal = document.getElementById('payback-days-val');

    function updateCalculator() {
        const jobs = parseInt(jobsSlider.value, 10);
        const profitPerJob = parseInt(profitSlider.value, 10);
        
        // 1. Update slider text values
        jobsVal.textContent = jobs;
        profitVal.textContent = `₹${profitPerJob}`;
        
        // 2. Calculate Time Saved (10 minutes saved per customer)
        const totalMinutesSaved = jobs * 10;
        if (totalMinutesSaved >= 60) {
            const hours = Math.floor(totalMinutesSaved / 60);
            const mins = totalMinutesSaved % 60;
            timeSavedVal.textContent = mins > 0 ? `${hours} Hr ${mins} Mins` : `${hours} Hours`;
        } else {
            timeSavedVal.textContent = `${totalMinutesSaved} Minutes`;
        }
        
        // 3. Calculate Ruined Paper & Ink Saved Daily (₹2.40 saved per card in alignment + ink saver)
        const paperSaved = jobs * 2.40;
        paperSavedVal.textContent = `₹${paperSaved.toFixed(0)} / Day`;

        // 4. Calculate Extra Daily Profit (Assume VLE serves 3 extra customers with saved time + paper savings)
        const extraDailyProfit = (3 * profitPerJob) + paperSaved;
        dailyProfitVal.textContent = `₹${extraDailyProfit.toFixed(0)} / Day`;
        
        // 5. Calculate Extra Monthly Net Profit (25 working days)
        const extraMonthlyProfit = extraDailyProfit * 25;
        monthlyProfitVal.textContent = `₹${Math.round(extraMonthlyProfit).toLocaleString('en-IN')} / Mo`;
        
        // 6. Calculate payback period in days for Super-Saver Yearly Plan (₹1,299)
        const paybackDays = 1299 / extraDailyProfit;
        if (paybackDays <= 1) {
            paybackDaysVal.textContent = `${(paybackDays * 24).toFixed(0)} Hours! ⚡`;
        } else {
            paybackDaysVal.textContent = `${paybackDays.toFixed(1)} Days! 😍`;
        }
    }

    if (jobsSlider && profitSlider) {
        jobsSlider.addEventListener('input', updateCalculator);
        profitSlider.addEventListener('input', updateCalculator);
        // Run initial calculation
        updateCalculator();
    }


    /* ==========================================
       💬 SMOOTH FAQ ACCORDION LOGIC
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            // Check if active
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items for a clean accordion effect
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                // Smoothly set height based on content size
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });


    /* ==========================================
       ✨ SMOOTH ANCHOR LINK SCROLLING
       ========================================== */
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll with offset for sticky header
                const headerHeight = 76;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
