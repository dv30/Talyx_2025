#!/usr/bin/env node

/**
 * Talyx Development Dashboard Generator
 * Reads chunk logging files and generates visual dashboard
 */

const fs = require('fs');
const path = require('path');

class DashboardGenerator {
    constructor(logsPath = './progress/logs') {
        this.logsPath = logsPath;
        this.sessions = [];
    }

    /**
     * Parse all log files in the logs directory
     */
    parseLogFiles() {
        const logFiles = fs.readdirSync(this.logsPath)
            .filter(file => file.endsWith('.md'))
            .sort();

        logFiles.forEach(file => {
            const filePath = path.join(this.logsPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const session = this.parseSession(content, file);
            if (session) {
                this.sessions.push(session);
            }
        });
    }

    /**
     * Parse individual session log file
     */
    parseSession(content, filename) {
        const lines = content.split('\\n');
        
        // Extract metadata
        const dateMatch = filename.match(/log_(\\d{4}-\\d{2}-\\d{2})_(\\d{4})\\.md/);
        if (!dateMatch) return null;

        const session = {
            date: dateMatch[1],
            time: dateMatch[2],
            filename: filename,
            chunks: [],
            totalChunks: 0,
            completed: 0,
            interrupted: 0,
            failed: 0
        };

        // Extract session title
        const titleLine = lines.find(line => line.startsWith('# 📅'));
        if (titleLine) {
            session.title = titleLine.replace(/# 📅.*? - /, '');
        }

        // Parse chunks
        let currentChunk = null;
        lines.forEach(line => {
            // Chunk start
            if (line.includes('CHUNK_START') || line.includes('_START:')) {
                const chunkMatch = line.match(/## ⏳ (.+?)_START: (.+?) - (.+)/);
                if (chunkMatch) {
                    currentChunk = {
                        id: chunkMatch[1],
                        time: chunkMatch[2],
                        title: chunkMatch[3],
                        status: 'started'
                    };
                }
            }
            
            // Chunk end - success
            else if (line.includes('_END:') && line.includes('SUCCESS')) {
                if (currentChunk) {
                    currentChunk.status = 'completed';
                    session.chunks.push(currentChunk);
                    session.completed++;
                    currentChunk = null;
                }
            }
            
            // Chunk interrupted
            else if (line.includes('INTERRUPTED')) {
                if (currentChunk) {
                    currentChunk.status = 'interrupted';
                    session.chunks.push(currentChunk);
                    session.interrupted++;
                    currentChunk = null;
                }
            }
        });

        session.totalChunks = session.chunks.length;
        session.successRate = session.totalChunks > 0 ? 
            Math.round((session.completed / session.totalChunks) * 100) : 0;

        return session;
    }

    /**
     * Generate HTML dashboard
     */
    generateHTML() {
        const totalSessions = this.sessions.length;
        const totalChunks = this.sessions.reduce((sum, s) => sum + s.totalChunks, 0);
        const totalCompleted = this.sessions.reduce((sum, s) => sum + s.completed, 0);
        const totalInterrupted = this.sessions.reduce((sum, s) => sum + s.interrupted, 0);
        const overallSuccessRate = totalChunks > 0 ? 
            Math.round((totalCompleted / totalChunks) * 100) : 0;

        let sessionCards = '';
        this.sessions.forEach(session => {
            let chunkTimeline = '';
            session.chunks.forEach(chunk => {
                const statusClass = chunk.status === 'completed' ? 'success' : 
                                  chunk.status === 'interrupted' ? 'interrupted' : 'failed';
                const statusIcon = chunk.status === 'completed' ? '✅' : 
                                 chunk.status === 'interrupted' ? '⚠️' : '❌';
                
                chunkTimeline += `<div class="chunk ${statusClass}">${chunk.id}: ${chunk.title} ${statusIcon}</div>`;
            });

            sessionCards += `
                <div class="session-card">
                    <h3>📅 Session: ${session.date} @ ${session.time} - ${session.title}</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${session.successRate}%"></div>
                    </div>
                    <p><strong>Status:</strong> ${session.completed}/${session.totalChunks} chunks completed</p>
                    
                    <div class="chunk-timeline">
                        ${chunkTimeline}
                    </div>
                    
                    <p><strong>Success Rate:</strong> ${session.successRate}%</p>
                </div>
            `;
        });

        // Read template and inject data
        const templatePath = './dashboard/development_dashboard.html';
        let html = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders
        html = html.replace('"totalSessions">2<', `"totalSessions">${totalSessions}<`);
        html = html.replace('"totalChunks">9<', `"totalChunks">${totalChunks}<`);
        html = html.replace('"successRate">89%<', `"successRate">${overallSuccessRate}%<`);
        html = html.replace('"recoveryNeeded">1<', `"recoveryNeeded">${totalInterrupted}<`);

        // Replace session cards (this would need more sophisticated templating in real implementation)
        
        return html;
    }

    /**
     * Generate and save dashboard
     */
    generate() {
        console.log('🔍 Scanning log files...');
        this.parseLogFiles();
        
        console.log(`📊 Found ${this.sessions.length} development sessions`);
        
        const html = this.generateHTML();
        const outputPath = './dashboard/generated_dashboard.html';
        
        fs.writeFileSync(outputPath, html);
        console.log(`✅ Dashboard generated: ${outputPath}`);
        
        // Print summary
        console.log('\\n📈 Summary:');
        this.sessions.forEach(session => {
            console.log(`  ${session.date} ${session.time}: ${session.completed}/${session.totalChunks} chunks (${session.successRate}%)`);
        });
    }
}

// CLI usage
if (require.main === module) {
    const generator = new DashboardGenerator();
    generator.generate();
}

module.exports = DashboardGenerator;
