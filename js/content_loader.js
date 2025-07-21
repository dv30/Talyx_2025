/**
 * TALYX Content Loader System
 * Loads and parses Markdown content files for dynamic web app integration
 * Author: TALYX Development Team
 * Date: 2025-07-21
 */

class ContentLoader {
    constructor() {
        this.contentCache = new Map();
        this.baseContentPath = './content/french/';
        this.loadedStories = [];
    }

    /**
     * Load and parse MD content file
     * @param {string} level - CEFR level (A1, A2, B1, B2, C1)
     * @param {string} filename - MD filename without extension
     * @returns {Promise<Object>} Parsed content object
     */
    async loadStory(level, filename) {
        const cacheKey = `${level}_${filename}`;
        
        if (this.contentCache.has(cacheKey)) {
            return this.contentCache.get(cacheKey);
        }

        try {
            const filePath = `${this.baseContentPath}${level}/stories/${filename}.md`;
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            
            const rawContent = await response.text();
            const parsedContent = this.parseMarkdownContent(rawContent);
            
            // Cache the parsed content
            this.contentCache.set(cacheKey, parsedContent);
            this.loadedStories.push({level, filename, ...parsedContent.metadata});
            
            return parsedContent;
            
        } catch (error) {
            console.error('Content loading error:', error);
            throw error;
        }
    }

    /**
     * Parse markdown content with YAML frontmatter
     * @param {string} rawContent - Raw markdown content
     * @returns {Object} Parsed content structure
     */
    parseMarkdownContent(rawContent) {
        const lines = rawContent.split('\n');
        const content = {
            metadata: {},
            sections: [],
            vocabulary: [],
            grammarFocus: []
        };

        let currentSection = 'frontmatter';
        let frontmatterLines = [];
        let currentStorySection = null;
        let currentLanguage = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // YAML frontmatter boundaries
            if (line === '---') {
                if (currentSection === 'frontmatter' && frontmatterLines.length > 0) {
                    content.metadata = this.parseYAMLFrontmatter(frontmatterLines);
                    currentSection = 'content';
                }
                continue;
            }

            // Collect frontmatter lines
            if (currentSection === 'frontmatter' && line !== '---') {
                frontmatterLines.push(line);
                continue;
            }

            // Parse content sections
            if (currentSection === 'content') {
                // Main story section headers (## 1. The Police Station)
                if (line.match(/^## \d+\./)) {
                    if (currentStorySection) {
                        content.sections.push(currentStorySection);
                    }
                    
                    currentStorySection = {
                        title: line.replace(/^## \d+\.\s*/, ''),
                        french: '',
                        english: '',
                        vocabulary: []
                    };
                    currentLanguage = null;
                    continue;
                }

                // Language section markers
                if (line === '**French:**') {
                    currentLanguage = 'french';
                    continue;
                }
                if (line === '**English:**') {
                    currentLanguage = 'english';
                    continue;
                }

                // Vocabulary focus sections
                if (line === '**Vocabulary Focus:**') {
                    currentLanguage = 'vocabulary';
                    continue;
                }

                // Content lines
                if (currentStorySection && currentLanguage && line.length > 0) {
                    if (currentLanguage === 'vocabulary') {
                        // Parse vocabulary items: - *commissariat de police* (police station)
                        const vocabMatch = line.match(/^-\s*\*([^*]+)\*\s*\(([^)]+)\)/);
                        if (vocabMatch) {
                            currentStorySection.vocabulary.push({
                                french: vocabMatch[1].trim(),
                                english: vocabMatch[2].trim()
                            });
                        }
                    } else {
                        // Add text content
                        if (currentStorySection[currentLanguage]) {
                            currentStorySection[currentLanguage] += ' ' + line;
                        } else {
                            currentStorySection[currentLanguage] = line;
                        }
                    }
                }
            }
        }

        // Add final section
        if (currentStorySection) {
            content.sections.push(currentStorySection);
        }

        return content;
    }

    /**
     * Parse YAML frontmatter into JavaScript object
     * @param {Array<string>} lines - YAML lines
     * @returns {Object} Parsed metadata
     */
    parseYAMLFrontmatter(lines) {
        const metadata = {};
        let currentKey = null;
        let currentArray = null;

        for (const line of lines) {
            // Simple key-value pairs
            const simpleMatch = line.match(/^([a-zA-Z_]+):\s*"?([^"]+)"?$/);
            if (simpleMatch) {
                metadata[simpleMatch[1]] = simpleMatch[2].replace(/"/g, '');
                currentKey = null;
                currentArray = null;
                continue;
            }

            // Array start
            const arrayMatch = line.match(/^([a-zA-Z_]+):$/);
            if (arrayMatch) {
                currentKey = arrayMatch[1];
                metadata[currentKey] = [];
                currentArray = metadata[currentKey];
                continue;
            }

            // Array items
            const arrayItemMatch = line.match(/^\s*-\s*"?([^"]+)"?$/);
            if (arrayItemMatch && currentArray) {
                currentArray.push(arrayItemMatch[1].replace(/"/g, ''));
                continue;
            }

            // Nested object items
            const nestedMatch = line.match(/^\s+([a-zA-Z_]+):\s*"?([^"]+)"?$/);
            if (nestedMatch && currentKey) {
                if (!metadata[currentKey] || Array.isArray(metadata[currentKey])) {
                    metadata[currentKey] = {};
                }
                metadata[currentKey][nestedMatch[1]] = nestedMatch[2].replace(/"/g, '');
            }
        }

        return metadata;
    }

    /**
     * Get all available stories from loaded content
     * @returns {Array} List of loaded stories with metadata
     */
    getAvailableStories() {
        return this.loadedStories;
    }

    /**
     * Clear content cache
     */
    clearCache() {
        this.contentCache.clear();
        this.loadedStories = [];
    }

    /**
     * Get cached content by key
     * @param {string} level - CEFR level  
     * @param {string} filename - Story filename
     * @returns {Object|null} Cached content or null
     */
    getCachedContent(level, filename) {
        const cacheKey = `${level}_${filename}`;
        return this.contentCache.get(cacheKey) || null;
    }
}

// Export for use in other modules
window.ContentLoader = ContentLoader;

// Debug helper
window.debugContentLoader = {
    showCache: () => {
        const loader = new ContentLoader();
        console.table(Array.from(loader.contentCache.entries()));
    },
    testLoad: async (level = 'A1', filename = 'detective_marie_03_mysterious_letter') => {
        const loader = new ContentLoader();
        try {
            const content = await loader.loadStory(level, filename);
            console.log('Loaded content:', content);
            return content;
        } catch (error) {
            console.error('Test load failed:', error);
        }
    }
};
