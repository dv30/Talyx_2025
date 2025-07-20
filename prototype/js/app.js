// TALYX - Development Enhanced JavaScript

class TalyxApp {
    constructor() {
        this.devMode = true;
        this.progress = parseInt(localStorage.getItem('talyx-progress')) || 35;
        this.userInteractions = JSON.parse(localStorage.getItem('talyx-interactions')) || {};
        this.currentLanguageMode = localStorage.getItem('talyx-language-mode') || 'both';
        
        this.init();
    }
    
    init() {
        // Set initial dev mode
        document.body.classList.toggle('dev-mode', this.devMode);
        
        // Initialize progress
        this.updateProgress(this.progress);
        
        // Initialize language mode
        this.setLanguageMode(this.currentLanguageMode);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize tooltips
        this.initializeTooltips();
        
        console.log('🎯 TALYX Development Mode Initialized');
        console.log(`📊 Current Progress: ${this.progress}%`);
        console.log(`🗣️ Language Mode: ${this.currentLanguageMode}`);
    }
    
    setupEventListeners() {
        // Development controls
        document.getElementById('dev-toggle').addEventListener('click', () => this.toggleDevMode());
        document.getElementById('save-progress').addEventListener('click', () => this.saveProgress());
        document.getElementById('reset-progress').addEventListener('click', () => this.resetProgress());
        
        // Language toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.textContent.toLowerCase().includes('both') ? 'both' :
                           e.target.textContent.toLowerCase().includes('french') ? 'french' : 'english';
                this.toggleLanguage(mode);
            });
        });
        
        // Interactive vocabulary and grammar highlighting
        document.querySelectorAll('.vocab-highlight, .grammar-highlight').forEach(element => {
            element.addEventListener('click', (e) => this.handleHighlightClick(e));
        });
        
        // Development section editing
        document.querySelectorAll('[data-edit]').forEach(element => {
            element.addEventListener('click', (e) => this.handleSectionEdit(e));
        });
        
        // Auto-save progress on interaction
        this.setupAutoProgress();
    }
    
    toggleDevMode() {
        this.devMode = !this.devMode;
        document.body.classList.toggle('dev-mode', this.devMode);
        
        const btn = document.getElementById('dev-toggle');
        btn.textContent = `🔧 Dev Mode: ${this.devMode ? 'ON' : 'OFF'}`;
        
        // Save dev mode preference
        localStorage.setItem('talyx-dev-mode', this.devMode);
        
        console.log(`🔧 Development Mode: ${this.devMode ? 'ON' : 'OFF'}`);
    }
    
    toggleLanguage(mode) {
        const englishTexts = document.querySelectorAll('.english-text');
        const buttons = document.querySelectorAll('.toggle-btn');
        
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to correct button
        const activeBtn = Array.from(buttons).find(btn => 
            btn.textContent.toLowerCase().includes(mode) || 
            (mode === 'both' && btn.textContent.toLowerCase().includes('both'))
        );
        if (activeBtn) activeBtn.classList.add('active');
        
        switch(mode) {
            case 'both':
                englishTexts.forEach(text => {
                    text.style.display = 'block';
                    text.classList.remove('hidden');
                });
                break;
            case 'french':
                englishTexts.forEach(text => {
                    text.style.display = 'none';
                });
                break;
            case 'english':
                englishTexts.forEach(text => {
                    text.style.display = 'block';
                    text.classList.add('hidden');
                });
                break;
        }
        
        this.currentLanguageMode = mode;
        localStorage.setItem('talyx-language-mode', mode);
        
        // Increase progress slightly for language interaction
        this.updateProgress(this.progress + 2);
        
        console.log(`🗣️ Language Mode: ${mode}`);
    }    
    handleHighlightClick(e) {
        const element = e.target;
        const word = element.getAttribute('data-word') || element.textContent;
        
        // Visual feedback
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
        
        // Track interaction
        this.userInteractions[word] = (this.userInteractions[word] || 0) + 1;
        localStorage.setItem('talyx-interactions', JSON.stringify(this.userInteractions));
        
        // Update progress
        this.updateProgress(this.progress + 1);
        
        console.log(`📝 Vocabulary interaction: "${word}" (${this.userInteractions[word]} times)`);
        
        // Prevent event bubbling to section edit
        e.stopPropagation();
    }
    
    handleSectionEdit(e) {
        if (!this.devMode) return;
        
        const element = e.currentTarget;
        const editId = element.getAttribute('data-edit');
        
        console.log(`✏️ Section Edit Request: ${editId}`);
        
        // Visual feedback for developers
        element.style.borderColor = '#10B981';
        setTimeout(() => {
            element.style.borderColor = '#6366F1';
        }, 1000);
        
        // In a real application, this would open an edit modal or interface
        // For now, we'll just log the edit request
        this.showEditNotification(editId);
    }
    
    showEditNotification(editId) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'save-confirmation show';
        notification.textContent = `Edit Request: ${editId}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 1500);
    }
    
    updateProgress(newProgress) {
        this.progress = Math.min(Math.max(newProgress, 0), 100);
        
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = this.progress + '%';
            progressFill.classList.add('updating');
            setTimeout(() => {
                progressFill.classList.remove('updating');
            }, 300);
        }
        
        if (progressText) {
            progressText.textContent = this.progress + '% Complete';
        }
        
        // Save to localStorage
        localStorage.setItem('talyx-progress', this.progress);
        
        console.log(`📊 Progress Updated: ${this.progress}%`);
    }
    
    saveProgress() {
        const data = {
            progress: this.progress,
            interactions: this.userInteractions,
            languageMode: this.currentLanguageMode,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('talyx-save-data', JSON.stringify(data));
        
        // Show confirmation
        const notification = document.createElement('div');
        notification.className = 'save-confirmation show';
        notification.textContent = '💾 Progress Saved Successfully!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
        
        console.log('💾 Progress saved:', data);
    }
    
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress?')) {
            this.progress = 0;
            this.userInteractions = {};
            this.currentLanguageMode = 'both';
            
            localStorage.removeItem('talyx-progress');
            localStorage.removeItem('talyx-interactions');
            localStorage.removeItem('talyx-language-mode');
            localStorage.removeItem('talyx-save-data');
            
            this.updateProgress(0);
            this.setLanguageMode('both');
            
            console.log('🔄 Progress reset successfully');
        }
    }    
    setLanguageMode(mode) {
        // Update UI to match saved language mode
        const englishTexts = document.querySelectorAll('.english-text');
        const buttons = document.querySelectorAll('.toggle-btn');
        
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Find and activate correct button
        const activeBtn = Array.from(buttons).find(btn => {
            const text = btn.textContent.toLowerCase();
            return (mode === 'both' && text.includes('both')) ||
                   (mode === 'french' && text.includes('french') && !text.includes('both')) ||
                   (mode === 'english' && text.includes('english'));
        });
        
        if (activeBtn) activeBtn.classList.add('active');
        
        // Apply language mode
        switch(mode) {
            case 'both':
                englishTexts.forEach(text => {
                    text.style.display = 'block';
                    text.classList.remove('hidden');
                });
                break;
            case 'french':
                englishTexts.forEach(text => {
                    text.style.display = 'none';
                });
                break;
            case 'english':
                englishTexts.forEach(text => {
                    text.style.display = 'block';
                    text.classList.add('hidden');
                });
                break;
        }
        
        this.currentLanguageMode = mode;
    }
    
    setupAutoProgress() {
        // Simulate reading progress over time
        let readingTimer = setInterval(() => {
            if (this.progress < 100) {
                this.updateProgress(this.progress + 1);
            } else {
                clearInterval(readingTimer);
                console.log('📚 Chapter completed!');
            }
        }, 45000); // Every 45 seconds
        
        // Track scroll progress
        let scrollProgress = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > scrollProgress + 10) {
                scrollProgress = scrollPercent;
                this.updateProgress(this.progress + 1);
            }
        });
    }
    
    initializeTooltips() {
        // Enhanced tooltip behavior for development
        document.querySelectorAll('[data-edit]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.devMode) {
                    const tooltip = element.querySelector('.edit-tooltip');
                    if (tooltip) {
                        tooltip.style.opacity = '1';
                    }
                }
            });
            
            element.addEventListener('mouseleave', () => {
                const tooltip = element.querySelector('.edit-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                }
            });
        });
    }
    
    // Public API for external access
    getProgress() {
        return this.progress;
    }
    
    getInteractions() {
        return this.userInteractions;
    }
    
    exportData() {
        return {
            progress: this.progress,
            interactions: this.userInteractions,
            languageMode: this.currentLanguageMode,
            timestamp: new Date().toISOString()
        };
    }
}

// Global functions for backward compatibility
function toggleLanguage(mode) {
    if (window.talyxApp) {
        window.talyxApp.toggleLanguage(mode);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.talyxApp = new TalyxApp();
    
    // Load saved dev mode preference
    const savedDevMode = localStorage.getItem('talyx-dev-mode');
    if (savedDevMode !== null) {
        window.talyxApp.devMode = savedDevMode === 'true';
        document.body.classList.toggle('dev-mode', window.talyxApp.devMode);
        document.getElementById('dev-toggle').textContent = 
            `🔧 Dev Mode: ${window.talyxApp.devMode ? 'ON' : 'OFF'}`;
    }
    
    console.log('🚀 TALYX Application Ready');
    console.log('📝 Available commands: talyxApp.getProgress(), talyxApp.exportData()');
});