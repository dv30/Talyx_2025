/**
 * Story Audio Component for Talyx
 * Handles paragraph-level audio playback
 */

class StoryAudioComponent {
    constructor() {
        this.currentParagraph = null;
        this.audioController = window.talyxAudio;
    }

    /**
     * Add audio controls to story paragraphs
     */
    initialize() {
        const storyParagraphs = document.querySelectorAll('.story-paragraph');
        storyParagraphs.forEach((paragraph, index) => {
            this.addAudioControls(paragraph, index);
        });
    }

    /**
     * Add audio controls to a paragraph
     */
    addAudioControls(paragraph, index) {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'paragraph-audio-controls';
        controlsDiv.innerHTML = `
            <button class="audio-btn" onclick="storyAudio.playParagraph(${index}, 'fr')">🔊 FR</button>
            <button class="audio-btn" onclick="storyAudio.playParagraph(${index}, 'en')">🔊 EN</button>
            <button class="audio-btn slow" onclick="storyAudio.playParagraphSlow(${index}, 'fr')">🐌 Slow FR</button>
        `;
        
        paragraph.appendChild(controlsDiv);
    }

    /**
     * Play paragraph in specified language
     */
    playParagraph(index, language) {
        const paragraph = document.querySelectorAll('.story-paragraph')[index];
        const text = paragraph.getAttribute(`data-${language}`);
        
        if (text) {
            const lang = language === 'fr' ? 'fr-FR' : 'en-US';
            this.audioController.speak(text, lang, 1.0);
        }
    }

    /**
     * Play paragraph slowly
     */
    playParagraphSlow(index, language) {
        const paragraph = document.querySelectorAll('.story-paragraph')[index];
        const text = paragraph.getAttribute(`data-${language}`);
        
        if (text) {
            const lang = language === 'fr' ? 'fr-FR' : 'en-US';
            this.audioController.speak(text, lang, 0.7);
        }
    }
}

// Global instance
const storyAudio = new StoryAudioComponent();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    storyAudio.initialize();
});
