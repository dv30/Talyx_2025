/**
 * TALYX Audio Controller Module
 * Created: 2025-07-21 for chunk logging testing
 * Purpose: Centralized audio control for vocabulary and story content
 */

class TalyxAudioController {
    constructor() {
        this.isPlaying = false;
        this.currentUtterance = null;
        this.defaultVoice = null;
        this.initializeVoices();
    }

    /**
     * Initialize speech synthesis voices
     */
    initializeVoices() {
        if ('speechSynthesis' in window) {
            // Wait for voices to load
            speechSynthesis.onvoiceschanged = () => {
                const voices = speechSynthesis.getVoices();
                // Prefer French voice
                this.defaultVoice = voices.find(voice => 
                    voice.lang.startsWith('fr') || voice.lang === 'fr-FR'
                ) || voices[0];
            };
        }
    }

    /**
     * Play text with specified language and speed
     * @param {string} text - Text to speak
     * @param {string} lang - Language code (default: 'fr-FR')
     * @param {number} rate - Speech rate (default: 1.0)
     * @param {Function} onEnd - Callback when speech ends
     */
    speak(text, lang = 'fr-FR', rate = 1.0, onEnd = null) {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // Stop any current speech
        this.stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        
        if (this.defaultVoice) {
            utterance.voice = this.defaultVoice;
        }

        utterance.onstart = () => {
            this.isPlaying = true;
        };

        utterance.onend = () => {
            this.isPlaying = false;
            this.currentUtterance = null;
            if (onEnd) onEnd();
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.isPlaying = false;
            this.currentUtterance = null;
        };

        this.currentUtterance = utterance;
        speechSynthesis.speak(utterance);
    }

    /**
     * Stop current speech
     */
    stop() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        this.isPlaying = false;
        this.currentUtterance = null;
    }

    /**
     * Check if currently playing
     * @returns {boolean}
     */
    isCurrentlyPlaying() {
        return this.isPlaying;
    }
}

// Global instance
const talyxAudio = new TalyxAudioController();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TalyxAudioController;
}
