/**
 * TALYX Content Renderer System
 * Renders parsed MD content into the web application interface
 * Author: TALYX Development Team
 * Date: 2025-07-21
 */

class ContentRenderer {
    constructor(containerId = 'main-content') {
        this.container = document.getElementById(containerId);
        this.currentContent = null;
        this.audioController = window.AudioController || null;
        this.vocabularyCards = new Map();
    }

    /**
     * Render complete story content in web app format
     * @param {Object} content - Parsed content from ContentLoader
     * @param {Object} options - Rendering options
     */
    renderStory(content, options = {}) {
        if (!content || !content.metadata) {
            throw new Error('Invalid content structure');
        }

        this.currentContent = content;
        
        // Clear existing content
        if (this.container) {
            this.container.innerHTML = '';
        }

        // Render story header
        this.renderStoryHeader(content.metadata);
        
        // Render learning objectives
        this.renderLearningObjectives(content.metadata);
        
        // Render story sections
        content.sections.forEach((section, index) => {
            this.renderStorySection(section, index + 1);
        });
        
        // Render vocabulary panel
        this.renderVocabularyPanel(content);
        
        // Render progress tracking
        this.renderProgressTracker(content);

        // Initialize interactive features
        this.initializeInteractiveFeatures();
    }

    /**
     * Render story header with metadata
     */
    renderStoryHeader(metadata) {
        const headerHTML = `
            <div class="story-header">
                <div class="story-meta">
                    <span class="series-badge">${metadata.series || 'Story Series'}</span>
                    <span class="level-badge level-${metadata.level?.toLowerCase().replace('-', '')}">${metadata.level || 'A1'}</span>
                    <span class="time-badge">⏱️ ${metadata.estimated_time || '15 minutes'}</span>
                </div>
                <h1 class="story-title">${metadata.title || 'Untitled Story'}</h1>
                <p class="story-subtitle">${metadata.series || 'Detective Marie'} • Chapter ${metadata.chapter || '1'}</p>
            </div>
        `;
        
        if (this.container) {
            this.container.insertAdjacentHTML('beforeend', headerHTML);
        }
    }

    /**
     * Render learning objectives section
     */
    renderLearningObjectives(metadata) {
        if (!metadata.learning_objectives) return;

        const objectivesHTML = `
            <div class="learning-objectives">
                <h3>🎯 Learning Objectives</h3>
                <ul>
                    ${metadata.learning_objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
        `;
        
        if (this.container) {
            this.container.insertAdjacentHTML('beforeend', objectivesHTML);
        }
    }

    /**
     * Render individual story section with bilingual content
     */
    renderStorySection(section, sectionNumber) {
        const sectionId = `section-${sectionNumber}`;
        
        const sectionHTML = `
            <div class="story-section" id="${sectionId}">
                <h2 class="section-title">
                    <span class="section-number">${sectionNumber}.</span>
                    ${section.title}
                </h2>
                
                <div class="bilingual-content">
                    <div class="content-french" data-lang="french">
                        <div class="language-label">🇫🇷 Français</div>
                        <p class="story-text" data-audio-lang="fr">
                            ${this.addAudioControls(section.french, 'fr')}
                        </p>
                    </div>
                    
                    <div class="content-english" data-lang="english">
                        <div class="language-label">🇬🇧 English</div>
                        <p class="story-text" data-audio-lang="en">
                            ${this.addAudioControls(section.english, 'en')}
                        </p>
                    </div>
                </div>
                
                ${section.vocabulary.length > 0 ? this.renderSectionVocabulary(section.vocabulary, sectionNumber) : ''}
            </div>
        `;
        
        if (this.container) {
            this.container.insertAdjacentHTML('beforeend', sectionHTML);
        }
    }

    /**
     * Add audio controls to text content
     */
    addAudioControls(text, language) {
        if (!text) return '';
        
        const audioId = `audio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        return `
            <span class="audio-text" data-audio-id="${audioId}" data-lang="${language}">
                ${text}
                <button class="audio-btn" 
                        data-audio-id="${audioId}" 
                        data-audio-lang="${language}" 
                        data-audio-text="${this.escapeForHTML(text)}"
                        onclick="playTextAudioFromData(this)" 
                        title="Play audio">
                    🔊
                </button>
            </span>
        `;
    }

    /**
     * Render section-specific vocabulary
     */
    renderSectionVocabulary(vocabulary, sectionNumber) {
        if (!vocabulary.length) return '';

        const vocabHTML = `
            <div class="section-vocabulary">
                <h4>📚 Key Vocabulary</h4>
                <div class="vocab-grid">
                    ${vocabulary.map((item, index) => {
                        const vocabId = `vocab-${sectionNumber}-${index}`;
                        this.vocabularyCards.set(vocabId, item);
                        
                        return `
                            <div class="vocab-card" data-vocab-id="${vocabId}">
                                <div class="vocab-french">
                                    ${item.french}
                                    <button class="vocab-audio-btn" 
                                            data-vocab-id="${vocabId}" 
                                            data-audio-lang="fr" 
                                            data-audio-text="${this.escapeForHTML(item.french)}"
                                            onclick="playVocabAudioFromData(this)"
                                            title="Play French pronunciation">
                                        🔊
                                    </button>
                                </div>
                                <div class="vocab-english">${item.english}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        return vocabHTML;
    }

    /**
     * Render vocabulary panel with all story vocabulary
     */
    renderVocabularyPanel(content) {
        const allVocabulary = this.extractAllVocabulary(content);
        
        if (allVocabulary.length === 0) return;

        const panelHTML = `
            <div class="vocabulary-panel">
                <h3>📖 Complete Vocabulary</h3>
                <div class="vocab-expansion-grid">
                    ${allVocabulary.map((item, index) => {
                        const vocabId = `main-vocab-${index}`;
                        
                        return `
                            <div class="expandable-vocab-card" data-vocab-id="${vocabId}">
                                <div class="vocab-header" onclick="toggleVocabCard('${vocabId}')">
                                    <span class="vocab-word">${item.french}</span>
                                    <span class="expand-indicator">▼</span>
                                    <button class="vocab-audio-btn" 
                                            data-vocab-id="${vocabId}" 
                                            data-audio-lang="fr" 
                                            data-audio-text="${this.escapeForHTML(item.french)}"
                                            onclick="playVocabAudioFromData(this)"
                                            title="Play pronunciation">
                                        🔊
                                    </button>
                                </div>
                                <div class="vocab-expansion">
                                    <div class="vocab-translation">${item.english}</div>
                                    <div class="vocab-section">📖 From: Section ${item.sectionNumber}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        if (this.container) {
            this.container.insertAdjacentHTML('beforeend', panelHTML);
        }
    }

    /**
     * Extract all vocabulary from story content
     */
    extractAllVocabulary(content) {
        const allVocab = [];
        
        content.sections.forEach((section, sectionIndex) => {
            section.vocabulary.forEach(vocab => {
                allVocab.push({
                    ...vocab,
                    sectionNumber: sectionIndex + 1,
                    sectionTitle: section.title
                });
            });
        });
        
        return allVocab;
    }

    /**
     * Render progress tracker
     */
    renderProgressTracker(content) {
        const progressHTML = `
            <div class="progress-tracker">
                <h3>📊 Reading Progress</h3>
                <div class="progress-sections">
                    ${content.sections.map((section, index) => `
                        <div class="progress-item" data-section="${index + 1}">
                            <span class="progress-number">${index + 1}</span>
                            <span class="progress-title">${section.title}</span>
                            <span class="progress-status">◯</span>
                        </div>
                    `).join('')}
                </div>
                <div class="progress-summary">
                    <span id="progress-count">0/${content.sections.length}</span> sections completed
                </div>
            </div>
        `;
        
        if (this.container) {
            this.container.insertAdjacentHTML('beforeend', progressHTML);
        }
    }

    /**
     * Initialize interactive features after rendering
     */
    initializeInteractiveFeatures() {
        // Initialize audio controls
        this.initializeAudioControls();
        
        // Initialize vocabulary card interactions
        this.initializeVocabularyCards();
        
        // Initialize progress tracking
        this.initializeProgressTracking();
        
        // Initialize language toggle compatibility
        this.initializeLanguageToggle();
    }

    /**
     * Initialize audio control functions
     */
    initializeAudioControls() {
        // Make audio functions globally available (legacy support)
        window.playTextAudio = (audioId, language, text) => {
            this.playAudio(text, language);
        };
        
        window.playVocabAudio = (vocabId, language, text) => {
            this.playAudio(text, language);
        };

        // New data-driven audio functions (fixes special character issues)
        window.playTextAudioFromData = (buttonElement) => {
            const text = buttonElement.getAttribute('data-audio-text');
            const language = buttonElement.getAttribute('data-audio-lang');
            this.playAudio(text, language);
        };

        window.playVocabAudioFromData = (buttonElement) => {
            const text = buttonElement.getAttribute('data-audio-text');
            const language = buttonElement.getAttribute('data-audio-lang');
            this.playAudio(text, language);
        };
    }

    /**
     * Play audio using Web Speech API
     */
    playAudio(text, language = 'fr') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech synthesis not supported');
        }
    }

    /**
     * Initialize vocabulary card interactions
     */
    initializeVocabularyCards() {
        window.toggleVocabCard = (vocabId) => {
            const card = document.querySelector(`[data-vocab-id="${vocabId}"]`);
            if (card) {
                card.classList.toggle('expanded');
                const indicator = card.querySelector('.expand-indicator');
                if (indicator) {
                    indicator.textContent = card.classList.contains('expanded') ? '▲' : '▼';
                }
            }
        };
    }

    /**
     * Initialize progress tracking
     */
    initializeProgressTracking() {
        // Track section visibility for progress
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.markSectionAsRead(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('.story-section').forEach(section => {
                observer.observe(section);
            });
        }
    }

    /**
     * Mark section as read and update progress
     */
    markSectionAsRead(sectionElement) {
        const sectionId = sectionElement.id;
        const sectionNumber = sectionId.replace('section-', '');
        const progressItem = document.querySelector(`[data-section="${sectionNumber}"]`);
        
        if (progressItem && !progressItem.classList.contains('completed')) {
            progressItem.classList.add('completed');
            progressItem.querySelector('.progress-status').textContent = '✓';
            
            this.updateProgressCount();
        }
    }

    /**
     * Update progress counter
     */
    updateProgressCount() {
        const completed = document.querySelectorAll('.progress-item.completed').length;
        const total = document.querySelectorAll('.progress-item').length;
        const counter = document.getElementById('progress-count');
        
        if (counter) {
            counter.textContent = `${completed}/${total}`;
        }
    }

    /**
     * Initialize compatibility with existing language toggle
     */
    initializeLanguageToggle() {
        // Ensure language toggle works with dynamically rendered content
        window.addEventListener('languageChanged', (event) => {
            this.handleLanguageChange(event.detail.language);
        });
    }

    /**
     * Handle language toggle changes
     */
    handleLanguageChange(selectedLanguage) {
        const frenchElements = document.querySelectorAll('[data-lang="french"]');
        const englishElements = document.querySelectorAll('[data-lang="english"]');
        
        switch (selectedLanguage) {
            case 'french':
                frenchElements.forEach(el => el.style.display = 'block');
                englishElements.forEach(el => el.style.display = 'none');
                break;
            case 'english':
                frenchElements.forEach(el => el.style.display = 'none');
                englishElements.forEach(el => el.style.display = 'block');
                break;
            case 'both':
            default:
                frenchElements.forEach(el => el.style.display = 'block');
                englishElements.forEach(el => el.style.display = 'block');
                break;
        }
    }

    /**
     * Escape text for HTML attribute usage
     */
    escapeForHTML(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * Escape text for JavaScript string usage (legacy - kept for compatibility)
     */
    escapeForJs(text) {
        if (!text) return '';
        return text.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, ' ');
    }

    /**
     * Clear all rendered content
     */
    clearContent() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.currentContent = null;
        this.vocabularyCards.clear();
    }

    /**
     * Get currently rendered content
     */
    getCurrentContent() {
        return this.currentContent;
    }
}

// Export for use in other modules
window.ContentRenderer = ContentRenderer;

// Debug helper
window.debugContentRenderer = {
    testRender: async () => {
        const loader = new ContentLoader();
        const renderer = new ContentRenderer();
        
        try {
            const content = await loader.loadStory('A1', 'detective_marie_03_mysterious_letter');
            renderer.renderStory(content);
            console.log('Content rendered successfully');
        } catch (error) {
            console.error('Render test failed:', error);
        }
    }
};
