# Enhanced Recovery Protocol for Chat Continuation

## 🚨 EMERGENCY CHUNK RECOVERY WORKFLOW

### **Step 1: Immediate Recovery Assessment**
```
1. Get current timestamp: Desktop Commander `Get-Date`
2. Locate today's log: `progress/logs/log_YYYY-MM-DD_HHMM.md`
3. Parse chunk status: Scan for incomplete chunk patterns
4. Verify file states: Check modifications vs logged operations
5. Generate recovery report: Clear status of all planned chunks
```

### **Step 2: Chunk Status Detection Patterns**

**COMPLETED CHUNK (Safe to skip):**
```markdown
## ⏳ CHUNK_A_START: 11:15 - Adding audio controls
## ✅ CHUNK_A_END: 11:22 - Audio integration successful
```

**INTERRUPTED CHUNK (Needs verification):**
```markdown
## ⏳ CHUNK_B_START: 11:23 - Testing mobile audio
## ⚠️ CHUNK_B_INTERRUPTED: 11:31 - Chat terminated
```

**PLANNED BUT NOT STARTED:**
```markdown
## 📝 CHUNK_PLAN: Contains CHUNK_C but no CHUNK_C_START found
```

### **Step 3: Automatic File State Verification**

For each incomplete chunk, Claude automatically checks:
```powershell
# Check file modification times vs chunk start times
Get-ChildItem {{CHUNK_TARGET_FILES}} | Select Name,LastWriteTime

# Check Git commits since chunk start
git log --oneline --since="{{CHUNK_START_TIME}}"

# Verify file existence for attempted creations
Test-Path {{CHUNK_NEW_FILES}}
```

### **Step 4: Recovery Status Reporting**

**Claude reports in this exact format:**
```markdown
🔍 RECOVERY ANALYSIS COMPLETE:

SESSION: {{DATE}} {{TIME}} - {{SESSION_GOAL}}
CHUNKS PLANNED: {{TOTAL_CHUNKS}}

CHUNK RECOVERY STATUS:
├── CHUNK_A: ✅ COMPLETED (Git: {{COMMIT}})
├── CHUNK_B: ⚠️ NEEDS_VERIFICATION (Files modified, no commit)  
├── CHUNK_C: ❌ NOT_STARTED (No file changes detected)
└── CHUNK_D: ❌ NOT_STARTED (Not attempted)

🎯 RECOMMENDED ACTION: 
- Verify CHUNK_B completion status
- Continue from CHUNK_B or CHUNK_C based on findings
- Resume planned sequence: B → C → D
```

### **Step 5: Recovery Decision Matrix**

| Chunk Status | File Modified | Git Commit | Auto Action |
|-------------|---------------|------------|-------------|
| ✅ COMPLETED | Yes | Yes | Skip chunk |
| ⚠️ INTERRUPTED | Yes | No | Verify & commit |
| ⚠️ PARTIAL | Partial | No | Complete chunk |
| ❌ NOT_STARTED | No | No | Start chunk |

### **Step 6: Continuation Commands**

**Claude automatically executes:**
```markdown
1. **Time verification:** Get-Date 
2. **Log parsing:** Read today's log file
3. **Status analysis:** Check file states vs logged chunks  
4. **Recovery report:** Generate chunk completion status
5. **Next action:** Recommend continuation point
```

**If recovery needed:**
```markdown
6. **File verification:** Check incomplete chunk file states
7. **Git status:** Verify repository state vs logged commits
8. **User confirmation:** Wait for direction before proceeding
```

---

## 🎯 INTEGRATION WITH EXISTING CONTINUATION PROMPT

**Add this section to existing chat_continuation_prompt.md:**

```markdown
### 🚨 CHUNK RECOVERY CHECK (PRIORITY #1)

Before standard session initialization:

1. **Check for today's development log:**
   `progress/logs/log_{{TODAY}}_{{TIME}}.md`

2. **If log exists, scan for incomplete chunks:**
   - Look for CHUNK_START without matching CHUNK_END
   - Look for CHUNK_INTERRUPTED entries
   - Look for planned chunks that never started

3. **If incomplete chunks found:**
   - Run automatic file state verification
   - Generate recovery status report  
   - Recommend continuation strategy
   - WAIT for user confirmation before proceeding

4. **If no incomplete chunks:**
   - Proceed with standard session initialization
   - Note: Clean session start, no recovery needed
```

---

## 📋 RECOVERY PARSING LOGIC

**Claude uses these regex patterns to detect chunk states:**

```javascript
// Completed chunks
/## ⏳ CHUNK_([A-Z])_START:.*\n.*\n## ✅ CHUNK_\1_END:/g

// Interrupted chunks  
/## ⏳ CHUNK_([A-Z])_START:.*\n(?!.*## ✅ CHUNK_\1_END:)/g

// Planned but not started
/## 📝 CHUNK_PLAN:.*CHUNK_([A-Z]):.*(?!## ⏳ CHUNK_\1_START:)/g
```

**File verification commands:**
```powershell
# Get file modification times
$chunkFiles = @("{{TARGET_FILES}}")
$chunkStartTime = "{{CHUNK_START_TIME}}"
$chunkFiles | ForEach { 
    Get-Item $_ | Select Name, LastWriteTime, @{n='ModifiedAfterChunk';e={$_.LastWriteTime -gt $chunkStartTime}}
}
```

---

**Status:** Ready for integration with existing continuation prompt
**Testing:** Required on real development session
**Token Impact:** Estimated 15-25 additional tokens per recovery check
