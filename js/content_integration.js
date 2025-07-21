/**
 * TALYX Content Integration System
 * Bridges content loading with existing web app features
 * Author: TALYX Development Team
 * Date: 2025-07-21
 */

class ContentIntegration {
    constructor() {
        this.contentLoader = null;
        this.contentRenderer = null;
        this.existingAppFeatures = {
            sidebar: null,
            languageToggle: null,
            audioControls: null,
            progressTracking: null
        };
        this.isIntegrated = false;
    }

    /**
     * Initialize integration with existing app features
     */
    async initializeIntegration() {
        try {
            // Initialize content loading system
            this.contentLoader = new ContentLoader();
            this.contentRenderer = new ContentRenderer('main-content');
            
            // Connect with existing app features
            this.connectSidebarNavigation();
            this.enhanceLanguageToggle();
            this.upgradeAudioControls();
            this.integrateProgressTracking();
            
            // Set up content loading in sidebar
            this.setupSidebarContentLoading();
            
            this.isIntegrated = true;
            console.log('✅ Content integration completed successfully');
            
            return true;
        } catch (error) {
            console.error('❌ Content integration failed:', error);
            return false;
        }
    }

    /**
     * Connect with existing sidebar navigation
     */
    connectSidebarNavigation() {
        // Enhance existing sidebar with content loading capabilities
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        // Add dynamic content section to sidebar
        const contentSection = document.createElement('div');
        contentSection.className = 'nav-section dynamic-content-section';
        contentSection.innerHTML = `
            <h3>📚 Dynamic Content</h3>
            <div class="content-loader-controls">
                <select id="sidebar-level-select" class="sidebar-select">
                    <option value="A1">A1 Level</option>
                    <option value="A2">A2 Level</option>
                    <option value="B1">B1 Level</option>
                </select>
                <button class="nav-item content-load-btn" onclick="contentIntegration.loadFromSidebar()">
                    🔄 Load Content
                </button>
            </div>
            <div id="sidebar-content-list" class="sidebar-content-list">
                <!-- Dynamic content list will appear here -->
            </div>
        `;

        // Insert after existing nav sections
        const existingSections = sidebar.querySelectorAll('.nav-section');
        if (existingSections.length > 0) {
            existingSections[existingSections.length - 1].after(contentSection);
        } else {
            sidebar.querySelector('.sidebar-content')?.appendChild(contentSection);
        }
    }

    /**
     * Enhance existing language toggle to work with dynamic content
     */
    enhanceLanguageToggle() {
        // Override existing language toggle functions if they exist
        const originalToggleLanguage = window.toggleLanguage;
        
        window.toggleLanguage = (language) => {
            // Call original function if it exists
            if (originalToggleLanguage) {
                originalToggleLanguage(language);
            }
            
            // Apply to dynamic content
            if (this.contentRenderer) {
                this.contentRenderer.handleLanguageChange(language);
            }
            
            // Update toggle buttons
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[onclick="toggleLanguage('${language}')"]`)?.classList.add('active');
            
            // Emit custom event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language }
            }));
        };
    }

    /**
     * Upgrade audio controls to work with dynamic content
     */
    upgradeAudioControls() {
        // Enhanced speech synthesis with better error handling
        window.playTextAudio = (audioId, language, text) => {
            this.playEnhancedAudio(text, language, 'text');
        };
        
        window.playVocabAudio = (vocabId, language, text) => {
            this.playEnhancedAudio(text, language, 'vocabulary');
        };

        // New data-driven audio functions (fixes special character issues)
        window.playTextAudioFromData = (buttonElement) => {
            const text = this.decodeHTMLEntities(buttonElement.getAttribute('data-audio-text'));
            const language = buttonElement.getAttribute('data-audio-lang');
            this.playEnhancedAudio(text, language, 'text');
        };

        window.playVocabAudioFromData = (buttonElement) => {
            const text = this.decodeHTMLEntities(buttonElement.getAttribute('data-audio-text'));
            const language = buttonElement.getAttribute('data-audio-lang');
            this.playEnhancedAudio(text, language, 'vocabulary');
        };
    }

    /**
     * Play enhanced audio with better features
     */
    playEnhancedAudio(text, language = 'fr', type = 'text') {
        if (!('speechSynthesis' in window)) {
            this.showAudioFallback('Speech synthesis not supported in this browser');
            return;
        }

        // Cancel any existing speech
        speechSynthesis.cancel();

        try {
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Language and voice settings
            utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
            utterance.rate = type === 'vocabulary' ? 0.7 : 0.8;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Visual feedback
            const audioButtons = document.querySelectorAll('.audio-btn, .vocab-audio-btn');
            audioButtons.forEach(btn => btn.style.opacity = '0.6');

            utterance.onend = () => {
                audioButtons.forEach(btn => btn.style.opacity = '1.0');
            };

            utterance.onerror = (error) => {
                console.warn('Speech synthesis error:', error);
                audioButtons.forEach(btn => btn.style.opacity = '1.0');
                this.showAudioFallback('Audio playback failed');
            };

            speechSynthesis.speak(utterance);
            
        } catch (error) {
            console.error('Audio playback error:', error);
            this.showAudioFallback('Audio feature unavailable');
        }
    }

    /**
     * Show audio fallback message
     */
    showAudioFallback(message) {
        // Create temporary message
        const fallback = document.createElement('div');
        fallback.className = 'audio-fallback-message';
        fallback.textContent = message;
        fallback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff9800;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(fallback);
        setTimeout(() => fallback.remove(), 3000);
    }

    /**
     * Integrate progress tracking with existing systems
     */
    integrateProgressTracking() {
        // Enhanced progress tracking that persists
        const originalMarkSectionAsRead = this.contentRenderer?.markSectionAsRead;
        
        if (this.contentRenderer) {
            this.contentRenderer.markSectionAsRead = (sectionElement) => {
                // Call original function
                if (originalMarkSectionAsRead) {
                    originalMarkSectionAsRead.call(this.contentRenderer, sectionElement);
                }
                
                // Save progress to localStorage
                this.saveProgressToStorage(sectionElement);
                
                // Update sidebar progress indicator
                this.updateSidebarProgress();
            };
        }
    }

    /**
     * Save reading progress to localStorage
     */
    saveProgressToStorage(sectionElement) {
        try {
            const storyKey = this.getCurrentStoryKey();
            if (!storyKey) return;

            let progress = JSON.parse(localStorage.getItem('talyx_progress') || '{}');
            if (!progress[storyKey]) {
                progress[storyKey] = { sections: [], lastRead: null };
            }

            const sectionId = sectionElement.id;
            if (!progress[storyKey].sections.includes(sectionId)) {
                progress[storyKey].sections.push(sectionId);
                progress[storyKey].lastRead = new Date().toISOString();
                localStorage.setItem('talyx_progress', JSON.stringify(progress));
            }
        } catch (error) {
            console.warn('Could not save progress:', error);
        }
    }

    /**
     * Update sidebar progress indicators
     */
    updateSidebarProgress() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const progressSection = sidebar.querySelector('.progress-section');
        if (progressSection) {
            const completed = document.querySelectorAll('.progress-item.completed').length;
            const total = document.querySelectorAll('.progress-item').length;
            
            progressSection.innerHTML = `
                <h4>📊 Progress</h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(completed/total)*100}%"></div>
                </div>
                <p>${completed}/${total} sections completed</p>
            `;
        }
    }

    /**
     * Set up content loading controls in sidebar
     */
    setupSidebarContentLoading() {
        // Populate sidebar with available content
        this.loadAvailableContentInSidebar();
    }

    /**
     * Load available content list in sidebar
     */
    async loadAvailableContentInSidebar() {
        const contentList = document.getElementById('sidebar-content-list');
        if (!contentList) return;

        const availableStories = [
            { level: 'A1', filename: 'detective_marie_02_stolen_wallet', title: 'Chapter 2: Stolen Wallet' },
            { level: 'A1', filename: 'detective_marie_03_mysterious_letter', title: 'Chapter 3: Mysterious Letter' },
            { level: 'A2', filename: 'detective_marie_04_garden_mystery', title: 'Chapter 4: Garden Mystery' }
        ];

        contentList.innerHTML = availableStories.map(story => `
            <a href="#" class="nav-item content-item" 
               onclick="contentIntegration.loadStoryFromSidebar('${story.level}', '${story.filename}')">
                📖 ${story.title}
                <small>${story.level}</small>
            </a>
        `).join('');
    }

    /**
     * Load story from sidebar navigation
     */
    async loadStoryFromSidebar(level, filename) {
        try {
            const content = await this.contentLoader.loadStory(level, filename);
            this.contentRenderer.renderStory(content);
            
            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                const sidebarToggle = document.querySelector('.sidebar-toggle');
                if (sidebarToggle) sidebarToggle.click();
            }
            
            // Scroll to top of content
            document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Failed to load story from sidebar:', error);
            alert('Failed to load story. Please try again.');
        }
    }

    /**
     * Load content from sidebar controls
     */
    async loadFromSidebar() {
        const levelSelect = document.getElementById('sidebar-level-select');
        const level = levelSelect?.value || 'A1';
        
        // For demo, load the mysterious letter story
        await this.loadStoryFromSidebar(level, 'detective_marie_03_mysterious_letter');
    }

    /**
     * Get current story key for progress tracking
     */
    getCurrentStoryKey() {
        const currentContent = this.contentRenderer?.getCurrentContent();
        if (!currentContent?.metadata) return null;
        
        return `${currentContent.metadata.level}_${currentContent.metadata.title}`.replace(/\s+/g, '_').toLowerCase();
    }

    /**
     * Check if integration is ready
     */
    isReady() {
        return this.isIntegrated && this.contentLoader && this.contentRenderer;
    }

    /**
     * Get integration status
     */
    getStatus() {
        return {
            integrated: this.isIntegrated,
            contentLoader: !!this.contentLoader,
            contentRenderer: !!this.contentRenderer,
            features: {
                sidebar: !!document.getElementById('sidebar'),
                languageToggle: !!document.querySelector('.language-toggle'),
                audioControls: !!(typeof speechSynthesis !== 'undefined'),
                progressTracking: !!localStorage
            }
        };
    }

    /**
     * Decode HTML entities from data attributes
     */
    decodeHTMLEntities(text) {
        if (!text) return '';
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
}

// Create global integration instance
window.contentIntegration = new ContentIntegration();

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.ContentLoader && window.ContentRenderer) {
        window.contentIntegration.initializeIntegration();
    } else {
        // Wait for modules to load
        setTimeout(() => {
            window.contentIntegration.initializeIntegration();
        }, 500);
    }
});

// Debug helpers
window.debugIntegration = {
    status: () => window.contentIntegration.getStatus(),
    testLoad: (level = 'A1', filename = 'detective_marie_03_mysterious_letter') => {
        window.contentIntegration.loadStoryFromSidebar(level, filename);
    },
    testAudio: (text = 'Bonjour', language = 'fr') => {
        window.contentIntegration.playEnhancedAudio(text, language, 'test');
    }
};

// Add CSS for integration features
const integrationStyles = document.createElement('style');
integrationStyles.textContent = `
    .dynamic-content-section {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(255,255,255,0.1);
    }

    .content-loader-controls {
        margin-bottom: 15px;
    }

    .sidebar-select {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 4px;
        background: rgba(255,255,255,0.1);
        color: white;
        font-size: 14px;
    }

    .content-load-btn {
        width: 100%;
        text-align: center;
        background: rgba(102, 126, 234, 0.8) !important;
        margin-bottom: 10px;
    }

    .content-item {
        display: flex;
        flex-direction: column;
        padding: 8px 12px;
        border-radius: 4px;
        margin-bottom: 5px;
        background: rgba(255,255,255,0.05);
    }

    .content-item:hover {
        background: rgba(255,255,255,0.1);
    }

    .content-item small {
        opacity: 0.7;
        font-size: 11px;
        margin-top: 2px;
    }

    .progress-section {
        margin-top: 15px;
        padding: 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 6px;
    }

    .progress-bar {
        width: 100%;
        height: 6px;
        background: rgba(255,255,255,0.2);
        border-radius: 3px;
        overflow: hidden;
        margin: 8px 0;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #4CAF50, #8BC34A);
        transition: width 0.3s ease;
    }

    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(-10px); }
        20%, 80% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(integrationStyles);
