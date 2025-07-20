/**
 * TALYX - Sidebar Navigation JavaScript
 * Handles sidebar toggle, language switching, and interactive features
 */

// Global state
let sidebarOpen = false;
let currentLanguage = 'french';
let highlightsEnabled = true;

// DOM elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mainContent = document.getElementById('main-content');
const sidebarToggle = document.querySelector('.sidebar-toggle');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserPreferences();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('TALYX Sidebar Version - Initializing...');
    
    // Set initial language
    toggleLanguage('french');
    
    // Set initial highlight state
    updateHighlightState();
    
    // Initialize vocabulary cards
    initializeVocabularyCards();
    
    console.log('Application initialized successfully');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Sidebar navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            if (section) {
                navigateToSection(section);
            }
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024 && sidebarOpen) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                toggleSidebar();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}
/**
 * Toggle sidebar open/closed
 */
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    
    // Update classes
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    sidebarToggle.classList.toggle('active');
    
    // On desktop, shift content
    if (window.innerWidth > 1024) {
        mainContent.classList.toggle('sidebar-open');
    }
    
    console.log('Sidebar toggled:', sidebarOpen ? 'open' : 'closed');
}

/**
 * Navigate to different section
 */
function navigateToSection(section) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024 && sidebarOpen) {
        toggleSidebar();
    }
    
    // Here you would implement section switching logic
    console.log('Navigating to section:', section);
    
    // For demo purposes, just show an alert
    if (section !== 'story') {
        alert(`Navigation to ${section} section - Coming soon!`);
    }
}

/**
 * Toggle language display
 */
function toggleLanguage(language) {
    currentLanguage = language;
    
    // Update body class
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    document.body.classList.add(`lang-${language}`);
    
    // Update button states
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[onclick="toggleLanguage('${language}')"]`).classList.add('active');
    
    console.log('Language changed to:', language);
    
    // Save preference
    localStorage.setItem('talyx-language', language);
}
/**
 * Toggle vocabulary/grammar highlights
 */
function toggleHighlights() {
    highlightsEnabled = !highlightsEnabled;
    
    // Update body class
    if (highlightsEnabled) {
        document.body.classList.remove('highlights-off');
    } else {
        document.body.classList.add('highlights-off');
    }
    
    // Update button state
    const highlightBtn = document.querySelector('[onclick="toggleHighlights()"]');
    highlightBtn.classList.toggle('active', highlightsEnabled);
    
    console.log('Highlights:', highlightsEnabled ? 'enabled' : 'disabled');
    
    // Save preference
    localStorage.setItem('talyx-highlights', highlightsEnabled);
}

/**
 * Toggle development mode
 */
function toggleDevMode() {
    const devBtn = document.querySelector('[onclick="toggleDevMode()"]');
    devBtn.classList.toggle('active');
    
    const isActive = devBtn.classList.contains('active');
    console.log('Development mode:', isActive ? 'enabled' : 'disabled');
    
    if (isActive) {
        alert('Development mode enabled - Edit tooltips now visible');
    } else {
        alert('Development mode disabled');
    }
}

/**
 * Save progress
 */
function saveProgress() {
    const progressData = {
        language: currentLanguage,
        highlights: highlightsEnabled,
        section: 'story',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('talyx-progress', JSON.stringify(progressData));
    
    // Visual feedback
    const saveBtn = document.querySelector('[onclick="saveProgress()"]');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '✓';
    saveBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.style.background = '';
    }, 1000);
    
    console.log('Progress saved');
}
/**
 * Initialize vocabulary cards
 */
function initializeVocabularyCards() {
    const vocabCards = document.querySelectorAll('.vocab-card');
    
    vocabCards.forEach(card => {
        const header = card.querySelector('.vocab-header');
        header.addEventListener('click', function() {
            card.classList.toggle('expanded');
            
            // Analytics logging
            const word = card.dataset.word;
            console.log('Vocabulary card toggled:', word);
        });
    });
}

/**
 * Handle window resize
 */
function handleResize() {
    // Close sidebar on desktop if it was opened in mobile mode
    if (window.innerWidth > 1024 && sidebarOpen) {
        mainContent.classList.add('sidebar-open');
        sidebarOverlay.classList.remove('active');
    } else if (window.innerWidth <= 1024) {
        mainContent.classList.remove('sidebar-open');
        if (sidebarOpen) {
            sidebarOverlay.classList.add('active');
        }
    }
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
    // Load language preference
    const savedLanguage = localStorage.getItem('talyx-language');
    if (savedLanguage) {
        toggleLanguage(savedLanguage);
    }
    
    // Load highlights preference
    const savedHighlights = localStorage.getItem('talyx-highlights');
    if (savedHighlights !== null) {
        highlightsEnabled = savedHighlights === 'true';
        updateHighlightState();
    }
    
    console.log('User preferences loaded');
}

/**
 * Update highlight state
 */
function updateHighlightState() {
    const highlightBtn = document.querySelector('[onclick="toggleHighlights()"]');
    if (highlightBtn) {
        highlightBtn.classList.toggle('active', highlightsEnabled);
    }
    
    if (highlightsEnabled) {
        document.body.classList.remove('highlights-off');
    } else {
        document.body.classList.add('highlights-off');
    }
}

// =================== AUDIO PRONUNCIATION FUNCTIONS ===================

let currentSpeech = null;

function playWordAudio(text, button) {
    // Stop any current speech
    if (currentSpeech) {
        speechSynthesis.cancel();
    }

    // Create new speech utterance for word
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    utterance.volume = 0.8;
    utterance.pitch = 1.0;

    // Visual feedback
    button.classList.add('playing');
    const feedback = button.closest('.vocab-card').querySelector('.audio-feedback');
    feedback.classList.remove('error');
    feedback.classList.add('show');
    feedback.textContent = 'Playing...';

    // Handle speech events
    utterance.onend = function() {
        button.classList.remove('playing');
        feedback.classList.remove('show');
        currentSpeech = null;
    };

    utterance.onerror = function() {
        button.classList.remove('playing');
        feedback.classList.add('error', 'show');
        feedback.textContent = 'Audio not available';
        setTimeout(() => feedback.classList.remove('show', 'error'), 2000);
        currentSpeech = null;
    };

    currentSpeech = utterance;
    speechSynthesis.speak(utterance);
}

function playSentenceAudio(text, button, rate = 1.0) {
    // Stop any current speech
    if (currentSpeech) {
        speechSynthesis.cancel();
    }

    // Create new speech utterance for sentence
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = rate;
    utterance.volume = 0.8;
    utterance.pitch = 1.0;

    // Visual feedback
    button.classList.add('playing');
    const feedback = button.closest('.vocab-card').querySelector('.audio-feedback');
    feedback.classList.remove('error');
    feedback.classList.add('show');
    feedback.textContent = rate < 0.8 ? 'Playing slowly...' : 'Playing...';

    // Handle speech events
    utterance.onend = function() {
        button.classList.remove('playing');
        feedback.classList.remove('show');
        currentSpeech = null;
    };

    utterance.onerror = function() {
        button.classList.remove('playing');
        feedback.classList.add('error', 'show');
        feedback.textContent = 'Audio not available';
        setTimeout(() => feedback.classList.remove('show', 'error'), 2000);
        currentSpeech = null;
    };

    currentSpeech = utterance;
    speechSynthesis.speak(utterance);
}

// Check if speech synthesis is available on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!('speechSynthesis' in window)) {
        // Create warning banner for unsupported browsers
        const warningBanner = document.createElement('div');
        warningBanner.style.cssText = `
            background: #e74c3c;
            color: white;
            padding: 12px 20px;
            text-align: center;
            font-size: 14px;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        warningBanner.innerHTML = '⚠️ Audio pronunciation not available in this browser. Please use Chrome, Firefox, or Safari for audio features.';
        document.body.insertBefore(warningBanner, document.body.firstChild);
        
        // Disable all audio buttons
        document.querySelectorAll('.audio-word-btn, .audio-sentence-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
    }
});

// Export functions for global access
window.toggleSidebar = toggleSidebar;
window.toggleLanguage = toggleLanguage;
window.toggleHighlights = toggleHighlights;
window.toggleDevMode = toggleDevMode;
window.saveProgress = saveProgress;
window.playWordAudio = playWordAudio;
window.playSentenceAudio = playSentenceAudio;