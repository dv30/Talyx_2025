# Talyx_2025 Project Instructions

## Task Management Guidelines
- **Break down complex tasks** into sequential, smaller operations
- **Work in smaller, manageable chunks**
- **Always ask for confirmation** before proceeding to the next chunk
- **Provide clear progress indicators** when working through multi-part tasks (e.g., "Step 2 of 5 completed")
- **Focus on one specific section** at a time rather than attempting full-scale changes
- **Use targeted operations** when working with MCP servers instead of bulk modifications
- **Pause between chunks** to allow for user feedback and direction changes

## Language Configuration
**Primary Working Language: English Only**

Claude should operate exclusively in English for all project-related activities, including:
- All responses and communications
- Code comments and documentation
- File naming and organization
- MCP server interactions
- Data processing and analysis
- Error messages and logs

**Communication Rules:**
- The user may communicate in Slovak or English
- Claude must always respond in English regardless of the input language
- If the user provides content in Slovak, Claude should acknowledge understanding but respond in English
- All project outputs, documentation, and deliverables must be in English

**Token Optimization:**
This configuration is implemented to optimize token usage by maintaining consistency in the working language while preserving the user's flexibility to communicate in their preferred language.

**Exception Handling:**
- If translation of Slovak terms is needed for context, provide brief English explanations
- Slovak proper nouns and technical terms can be preserved when necessary for accuracy
- Always prioritize clarity and project consistency over literal translation
## Time Management & Accurate Timestamping

**Desktop Commander Time Protocol:**
- **Use Desktop Commander MCP** for all timestamp requirements
- **Command:** `desktop-commander:start_process` with `Get-Date` for current system time
- **Format:** Include timezone (UTC+2 for Slovak system location)
- **Application:** All project files, progress tracking, and development logging

**Timestamp Standards:**
- **File Documentation:** Use system time from Desktop Commander
- **Progress Tracking:** Include accurate timestamps in checkpoint files
- **Chat Continuation:** Reference actual file modification times
- **Session Logging:** Record start/end times for development phases

**Implementation Process:**
1. **Session Start:** Query system time using Desktop Commander
2. **File Updates:** Include accurate timestamps in all documentation
3. **Progress Checkpoints:** Update with current system time
4. **Session End:** Record completion timestamps for continuity

**Recovery Benefits:**
- **Accurate Continuation:** Know exactly when work stopped
- **Progress Measurement:** Track actual development time
- **File Synchronization:** Match system timestamps with documentation
- **Multi-Session Coordination:** Seamless handoff between chat sessions

## Content Management Guidelines (Talyx-Specific)

**Template System Standards:**
- **Use established templates** for all content creation (story, grammar, vocabulary, exercise)
- **Maintain cross-reference integrity** using unique ID format ([VOCAB_001], [GRAMMAR_004], etc.)
- **Follow bilingual format** for all learning content (French/Slovak examples)
- **Include YAML metadata** in all markdown files for automated processing

**File Organization Protocol:**
- **Respect directory structure:** `/content/language/level/type/`
- **Use consistent naming:** `chapter_01_title.md`, `grammar_concept_name.md`
- **Update cross-references** when adding new content
- **Maintain spaced repetition links** across chapters
**Content Quality Standards:**
- **CEFR Alignment:** Ensure all content matches specified level (A1-C1)
- **Cultural Context:** Include French cultural information where relevant
- **Linguistic Accuracy:** Verify grammar explanations and vocabulary usage
- **Bilingual Consistency:** Maintain accurate Slovak translations

## MCP Operation Guidelines (Desktop Commander)

**File Operation Best Practices:**
- **Always use absolute paths** for reliability: `C:\Users\maria\OneDrive\Documents\...`
- **Chunk large files** into ≤30 line segments for optimal performance
- **Verify file creation** before proceeding to next operations
- **Use edit_block** for targeted changes rather than full rewrites

**Project Directory Management:**
- **Base Path:** `C:\Users\maria\OneDrive\Documents\Projekt-Francuzsky_jazyk\LinguaStory_2025\Talyx`
- **Template Path:** `/templates/` for markdown templates
- **Content Path:** `/content/french/[level]/` for learning materials
- **Progress Path:** `/progress/` for checkpoint and status files
- **Documentation Path:** `/docs/` for project documentation

**Recovery Protocol:**
- **Always update checkpoint.md** after completing major operations
- **Maintain README.md** as primary status reference
- **Use simple status indicators** to avoid chat length issues
- **Document current operation state** before complex multi-step processes

## Development Phase Management

**Phase Completion Checklist:**
- [ ] Update progress/checkpoint.md with current timestamp
- [ ] Update README.md project status section
- [ ] Verify all files created successfully
- [ ] Document next steps clearly
- [ ] Test any created templates or code snippets

**Multi-Session Continuity:**
- **Session Start:** Check README.md for current project status
- **Session End:** Update all progress tracking files
- **Interruption Recovery:** Use checkpoint.md for exact continuation point
- **File Verification:** Cross-check file creation with progress documentation
## Technical Specifications (Talyx-Specific)

**Technology Stack Requirements:**
- **Frontend:** HTML, CSS, Vanilla JavaScript only
- **Content Format:** Markdown with YAML metadata → JSON pipeline
- **Compliance:** GDPR-friendly by design (no unnecessary data collection)
- **Architecture:** Static site compatible, modular content system

**Markdown Processing Standards:**
- **Metadata Format:** YAML frontmatter for all content files
- **Cross-Reference System:** Use unique IDs for linking content
- **Bilingual Structure:** Consistent French/Slovak presentation
- **Template Compliance:** All content must follow established templates

## Linguistic Guidelines

**CEFR Framework Compliance:**
- **A1-A2:** 15-20 stories each (foundation building)
- **B1-B2:** 12-15 stories each (skill development)
- **C1:** 10-12 stories (mastery and nuance)

**Content Creation Standards:**
- **Spaced Repetition:** Vocabulary and grammar must recur across chapters
- **Contextual Learning:** Grammar and vocabulary integrated within stories
- **Cultural Integration:** Include real-world French scenarios and contexts
- **Progressive Difficulty:** Each level builds upon previous learning

**Quality Assurance Protocol:**
- **Linguistic Review:** Verify French grammar and vocabulary accuracy
- **Translation Accuracy:** Ensure Slovak translations are contextually appropriate
- **Cross-Reference Validation:** Check all ID references work correctly
- **Template Adherence:** Confirm all content follows established formats

---

**Last Updated:** 2025-07-20 13:15 (UTC+2)
**Version:** 1.0 - Initial comprehensive project guidelines
**Next Review:** Upon completion of next major development phase