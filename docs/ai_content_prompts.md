# AI Content Generation Prompts

## Story Chapter Generation Prompt

### Primary Prompt for Story Creation

```
You are an expert French language curriculum designer creating CEFR-aligned story content. Create a story chapter that follows this exact structure:

**REQUIREMENTS:**
- Level: [A1/A2/B1/B2/C1] - strictly adhere to CEFR vocabulary and grammar complexity
- Language Pair: French (target) + Slovak (native) 
- Story Arc: [specify theme - apartment hunting, restaurant visit, job interview, etc.]
- Chapter Number: [X] in sequence
- Estimated Duration: 15-20 minutes

**CONTENT STRUCTURE TO GENERATE:**

1. **Story Scenario (2-3 sentences in English)**
   - Real-world situation relevant to language learners
   - Clear learning objectives
   - Cultural context appropriate for French-speaking countries

2. **Main Story Content (4-6 sections)**
   - Each section: 2-3 sentences in French
   - Immediately followed by Slovak translation
   - Natural dialogue integration where appropriate
   - Progressive difficulty within the chapter
   - Use vocabulary from specified level only

3. **Vocabulary Integration (6-8 new words)**
   - Introduce vocabulary naturally within story context
   - Provide phonetic pronunciation /IPA/
   - Include 2 example sentences per word
   - Add memory aids or cognates where helpful
   - Reference system: [VOCAB_XXX_keyword]

4. **Grammar Focus (1-2 concepts)**
   - Grammar naturally demonstrated in story
   - Clear explanation in English
   - Examples from the story text
   - Practice patterns provided
   - Reference system: [GRAMMAR_XXX_concept]

5. **Cultural Integration**
   - Authentic cultural details woven into story
   - Explain cultural norms relevant to the scenario
   - Help learners understand French-speaking contexts

**EXAMPLE INPUT:**
- Level: A1
- Story Arc: First day at university
- Chapter: 2
- New Grammar: Present tense of "être" and "avoir"
- New Vocabulary: university-related terms (6-8 words)
- Cultural Focus: French university registration process

**OUTPUT REQUIREMENTS:**
- Follow bilingual format exactly (French text, then Slovak translation)
- Include vocabulary reference tags [VOCAB_XXX_keyword]
- Include grammar reference tags [GRAMMAR_XXX_concept]
- Maintain appropriate CEFR level complexity
- Ensure story has clear beginning, development, and conclusion
- Include realistic dialogue that learners can practice
```

### Grammar Concept Generation Prompt

```
You are a French grammar specialist creating CEFR-aligned grammar explanations. Create a comprehensive grammar concept following this structure:

**REQUIREMENTS:**
- Level: [A1/A2/B1/B2/C1] - appropriate complexity for level
- Language Pair: French explanations with Slovak comparisons
- Reference ID: [GRAMMAR_XXX_concept_name]

**CONTENT TO GENERATE:**

1. **Concept Introduction (2-3 sentences)**
   - Clear definition of the grammar concept
   - Why it's important for French learners
   - How it differs from Slovak grammar patterns

2. **Rule Explanation**
   - Step-by-step breakdown of the rule
   - Exception cases clearly noted
   - Comparison to Slovak equivalent structures

3. **Examples from Context**
   - 5-6 examples with French + Slovak translations
   - Examples progress from simple to more complex
   - Real-world usage situations

4. **Practice Patterns**
   - 3-4 sentence patterns for students to practice
   - Template structures: "Subject + [grammar concept] + object"
   - Guided practice with prompts

5. **Common Mistakes**
   - Typical errors Slovak speakers make with this concept
   - Explanation of why these errors occur
   - Tips for avoiding mistakes

**EXAMPLE INPUT:**
- Level: A1
- Concept: Present tense of irregular verbs (être, avoir, aller)
- Reference: [GRAMMAR_002_irregular_present]
- Context: Daily routines and descriptions

**OUTPUT REQUIREMENTS:**
- Include phonetic pronunciation for key examples
- Provide memory aids or patterns where helpful
- Ensure examples are culturally appropriate
- Connect to previously learned concepts where relevant
```

### Vocabulary Theme Generation Prompt

```
You are a French vocabulary specialist creating themed word collections for CEFR-aligned learning. Create a vocabulary theme following this structure:

**REQUIREMENTS:**
- Level: [A1/A2/B1/B2/C1] - vocabulary appropriate for level
- Theme: [restaurant, family, travel, work, etc.]
- Word Count: 8-12 words per theme
- Reference System: [VOCAB_XXX_keyword]

**CONTENT TO GENERATE:**

1. **Theme Introduction (2 sentences)**
   - Explain the theme's relevance to daily French life
   - Learning objectives for this vocabulary set

2. **Core Vocabulary (8-12 words)**
   For each word provide:
   - French word with IPA pronunciation
   - Slovak translation
   - Word type (noun m/f, verb, adjective, etc.)
   - Example sentence in French + Slovak translation
   - Related words or word family
   - Memory aid or learning tip

3. **Contextual Usage**
   - 2-3 realistic scenarios where this vocabulary appears
   - Common phrases or expressions using these words
   - Cultural notes about usage differences

4. **Word Relationships**
   - Group related words (synonyms, antonyms, word families)
   - Show connections between words in the theme
   - Progression from basic to more advanced vocabulary

5. **Integration Notes**
   - Which story chapters will use this vocabulary
   - Spaced repetition schedule suggestions
   - Cross-references to grammar concepts

**EXAMPLE INPUT:**
- Level: A1
- Theme: Family relationships
- Focus: Immediate family members and basic descriptions
- Cultural Context: French family structures

**OUTPUT REQUIREMENTS:**
- Include gender markers for all nouns
- Provide realistic, culturally appropriate examples
- Ensure vocabulary matches CEFR level complexity
- Include pronunciation guides for difficult words
- Connect to real-world usage situations
```

### Exercise Generation Prompt

```
You are a French language assessment specialist creating interactive exercises. Create varied exercises following this structure:

**REQUIREMENTS:**
- Level: [A1/A2/B1/B2/C1] - appropriate difficulty
- Exercise Types: Mix of recognition, production, and application
- Story Integration: Based on specific story chapter content
- Assessment Focus: [vocabulary, grammar, comprehension, production]

**CONTENT TO GENERATE:**

1. **Exercise Set Overview (2 sentences)**
   - Learning objectives for the exercise set
   - How exercises connect to story content

2. **Exercise 1: Vocabulary Recognition**
   - Multiple choice or matching format
   - 5-6 questions using story vocabulary
   - Include distractors at appropriate level
   - Clear answer key with explanations

3. **Exercise 2: Grammar Application**
   - Fill-in-the-blank or transformation exercises
   - Focus on grammar concepts from story
   - Progressive difficulty within exercise
   - Examples using story context

4. **Exercise 3: Reading Comprehension**
   - Questions about story content
   - Mix of factual and inferential questions
   - Answer in French (appropriate to level)
   - Cultural understanding questions included

5. **Exercise 4: Production Practice**
   - Role-play or dialogue completion
   - Using story situation as context
   - Guided production with scaffolding
   - Self-assessment criteria provided

6. **Exercise 5: Integration Challenge**
   - Combines vocabulary + grammar + cultural knowledge
   - Real-world application task
   - Creative or communicative focus
   - Extension activity for advanced learners

**EXAMPLE INPUT:**
- Level: A1
- Story: Chapter 1 - Apartment hunting
- Vocabulary Focus: Housing terms, location prepositions
- Grammar Focus: Present tense, basic questions
- Cultural Focus: French real estate processes

**OUTPUT REQUIREMENTS:**
- Vary exercise types to maintain engagement
- Include clear instructions in English and French
- Provide immediate feedback options
- Ensure exercises test understanding, not memory
- Connect exercises to real-world application
```

## Prompt Usage Guidelines

### For Story Generation:
1. **Input Specification:** Always specify level, theme, chapter number, and cultural context
2. **Quality Control:** Review generated content for CEFR appropriateness and cultural accuracy
3. **Template Alignment:** Ensure all generated content fits the established template structure
4. **Cross-Reference Integration:** Manually add reference tags after generation

### For Grammar Content:
1. **Progression Logic:** Ensure grammar concepts build logically from previous chapters
2. **Slovak Comparison:** Always include contrastive analysis with Slovak grammar
3. **Example Quality:** Verify examples are natural and culturally appropriate
4. **Practice Integration:** Connect grammar exercises to story scenarios

### For Vocabulary Development:
1. **Theme Coherence:** Ensure all vocabulary genuinely relates to the theme
2. **Level Appropriateness:** Verify complexity matches CEFR level requirements
3. **Cultural Authenticity:** Check that usage examples reflect real French contexts
4. **Spaced Repetition:** Plan vocabulary reappearance across multiple chapters

### For Exercise Creation:
1. **Variety Balance:** Mix recognition, production, and application exercises
2. **Difficulty Progression:** Start with easier recognition, progress to production
3. **Story Integration:** Always connect exercises to story content and context
4. **Assessment Validity:** Ensure exercises test the intended learning objectives
