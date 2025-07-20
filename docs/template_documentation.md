# Content Template Documentation

## Overview
This document explains the structure and usage of all Markdown templates used in the LinguaStory application. These templates ensure consistency across all learning content and enable automated processing.

## Template System Architecture

### 4 Core Template Types:
1. **Story Chapter Template** - Main learning content
2. **Grammar Concept Template** - Standalone grammar explanations  
3. **Vocabulary Theme Template** - Organized word groups
4. **Exercise Template** - Interactive practice activities

### Cross-Reference System:
All templates use unique ID references to link related content:
- `[VOCAB_001_seek]` - Vocabulary references
- `[GRAMMAR_004_prepositions_location]` - Grammar concept references
- `[EX_001_prepositions_location]` - Exercise references

## Template 1: Story Chapter

### Purpose
Primary learning vehicle combining narrative with language instruction.

### File Naming Convention
`chapter_XX_title.md` (e.g., `chapter_01_apartment_hunting.md`)

### Required Metadata Fields:
```yaml
title: "Chapter Title"
story_id: "unique_identifier"  
language_pair: "french_slovak"
level: "A1|A2|B1|B2|C1"
chapter_number: integer
story_arc: "thematic_grouping"
prerequisites: ["previous_concepts"]
introduces: ["new_concepts"] 
reinforces: ["review_concepts"]
```

### Content Structure:
1. **Introduction** - Learning objectives and context
2. **Main Story** - Bilingual narrative sections
3. **Vocabulary Section** - New and reinforced words
4. **Grammar Section** - Integrated grammar instruction
5. **Dialogue Practice** - Real-world conversations
6. **Exercises** - Immediate practice activities
7. **Spaced Repetition Links** - Cross-chapter connections
8. **Cultural Notes** - Contextual information
9. **Assessment Criteria** - Learning outcome checklist

### Bilingual Format Standard:
```markdown
#### Section 1: [Section Title]
**French:** [French text]
**Slovak:** [Slovak translation]

**Vocabulary Notes:**
- `word` (translation) - [VOCAB_ID_reference]

**Grammar Notes:**
- Concept explanation - [GRAMMAR_ID_reference]
```

## Template 2: Grammar Concept

### Purpose
Standalone, reusable grammar explanations that can be referenced from multiple stories.

### File Naming Convention
`grammar_concept_name.md` (e.g., `prepositions_location.md`)

### Required Metadata Fields:
```yaml
concept_id: "GRAMMAR_XXX_concept_name"
title: "Grammar Concept Title"
language: "target_language"
level: "A1|A2|B1|B2|C1"
category: "grammar_category"
subcategory: "specific_area"
prerequisites: ["required_concepts"]
related_concepts: ["connected_concepts"]
appears_in_stories: ["chapter_list"]
```

### Content Structure:
1. **Concept Overview** - What and why of the grammar point
2. **Core Rules** - Primary usage patterns with examples
3. **Common Patterns** - Typical constructions
4. **Common Mistakes** - Error prevention and correction
5. **Practice Patterns** - Drill structures
6. **Story Context Examples** - Usage from actual stories
7. **Progression Through Levels** - How concept develops
8. **Assessment Checklist** - Mastery indicators
9. **Cross-References** - Related content links

### Example Structure:
```markdown
#### 1. CONCEPT_NAME (translation)
**Usage:** When to use this concept
**Slovak equivalent:** translation

**Structure:** grammatical pattern
- example 1 (translation)
- example 2 (translation)

**Memory Rule:** mnemonic device
```

## Template 3: Vocabulary Theme

### Purpose
Organized vocabulary collections around specific topics or themes.

### File Naming Convention
`vocab_theme_name.md` (e.g., `housing_apartments.md`)

### Required Metadata Fields:
```yaml
theme_id: "VOCAB_THEME_theme_name"
title: "Theme Title"
language: "target_language"
level: "level_range"
category: "broad_category"
subcategory: "specific_area"
word_count: integer
target_lessons: integer
related_themes: ["connected_themes"]
appears_in_stories: ["chapter_list"]
cultural_context: "context_identifier"
```

### Content Structure:
1. **Theme Overview** - Purpose and application context
2. **Core Vocabulary** - Essential words with full details
3. **Advanced Vocabulary** - Higher-level extensions
4. **Grammar Connections** - How words work with grammar
5. **Cultural Context** - Real-world usage information
6. **Spaced Repetition Schedule** - Review timing
7. **Assessment & Usage** - Recognition vs. production goals
8. **Practice Activities** - Suggested exercises
9. **Cross-References** - Related content links

### Vocabulary Entry Format:
```markdown
#### 1. word /pronunciation/ (gender)
**Slovak:** translation
**English:** translation
**Context:** usage example from story
**Example Sentences:**
- example 1 (translation)
- example 2 (translation)
**Collocations:** common word combinations
**Memory Aid:** learning helper
```

## Template 4: Exercise

### Purpose
Interactive practice activities with auto-grading capabilities.

### File Naming Convention
`exercise_type_topic.md` (e.g., `fill_blank_prepositions.md`)

### Required Metadata Fields:
```yaml
exercise_id: "EX_XXX_exercise_name"
title: "Exercise Title"
language: "target_language"
level: "A1|A2|B1|B2|C1"
exercise_type: "exercise_format"
category: "content_category"
subcategory: "specific_area"
estimated_time: "duration"
target_concepts: ["concept_references"]
target_vocabulary: ["vocab_references"]
auto_gradable: boolean
feedback_immediate: boolean
```

### Exercise Types Available:
- `fill_in_blank` - Complete missing words/phrases
- `multiple_choice` - Select correct answer
- `translation` - Translate between languages
- `matching` - Connect related items
- `dialogue` - Complete conversations
- `listening` - Audio comprehension (future)

### Content Structure:
1. **Exercise Introduction** - Objectives and skills practiced
2. **Instructions** - Clear steps for students
3. **Exercise Content** - Questions with answers and explanations
4. **Performance Feedback** - Scoring levels and recommendations
5. **Common Mistakes Analysis** - Error patterns and corrections
6. **Extension Activities** - Additional practice options
7. **Technical Implementation Notes** - Programming requirements
8. **Accessibility Features** - Inclusive design elements

### Question Format:
```markdown
### Question 1
**Context:** Situation description
**Sentence:** "Text with _____ blank."
**Options:**
a) option 1
b) option 2
c) option 3

**Answer:** correct_option
**Explanation:** Why this answer is correct
**Slovak:** Translation for context
```