# Universal Session Ending Prompt

**INSTRUCTION:** Use this prompt when chat is getting long and you need to end the session properly.

---

## SESSION END PROTOCOL

**Project:** Talyx 2025 Language Learning Application

**Action Required:** Prepare for session handoff and ensure continuity.

### Execute Session Closing Protocol:

1. **Get Current Time** using Desktop Commander `Get-Date` command
2. **Update Project Status Files** with accurate timestamps and current progress:
   - Update `progress\checkpoint.md` with current session accomplishments
   - Update `README.md` with latest project status
   - Note any incomplete operations or next immediate steps
3. **Execute Git Zero Risk Workflow - Step 3:**
   - Check Git status: `git status`
   - If changes exist, commit them: `git add .; git commit -m "Completed: [session accomplishments]"`
   - Push to remote: `git push origin main`
   - Verify clean status: `git status` (should show "working tree clean")
4. **Document Current Task State:**
   - What was completed in this session
   - What operation was in progress (if any)
   - What should be the next priority in the following session
5. **Verify File Integrity:**
   - Confirm all files were created/updated successfully
   - Note any files that need attention in next session
6. **Provide Session Summary:**
   - Brief summary of session accomplishments
   - Confirmation that all progress has been saved AND committed to Git
   - Next session starting point clearly documented

### Session End Confirmation:
Confirm that:
- [ ] All work has been saved with accurate timestamps
- [ ] Project status files are updated
- [ ] Git Zero Risk Workflow executed (all changes committed and pushed)
- [ ] Git status shows "working tree clean"
- [ ] Next session can continue seamlessly using the continuation prompt
- [ ] No work will be lost in transition

**File Location for Continuation:** 
`C:\Users\maria\OneDrive\Documents\Projekt-Francuzsky_jazyk\LinguaStory_2025\Talyx\docs\chat_continuation_prompt.md`

---

**Usage:** Copy and paste this entire prompt when you need to end a chat session cleanly.

---

## QUICK VERSION (Copy This):

**SESSION END PROTOCOL - Execute Now:**

1. Use Desktop Commander `Get-Date` to get current time
2. Update `progress\checkpoint.md` with session accomplishments and timestamp  
3. Update `README.md` with current project status and timestamp
4. **Execute Git Zero Risk Workflow:**
   - `git status` (check current state)
   - `git add .; git commit -m "Completed: [session achievements]"` (if changes exist)
   - `git push origin main` (backup to cloud)
   - `git status` (verify clean state)
5. Document any incomplete operations or next steps
6. Confirm all files saved and committed successfully
7. Provide session summary and next session starting point

**Project:** Talyx 2025 - Language Learning Application
**Location:** `C:\Users\maria\OneDrive\Documents\Projekt-Francuzsky_jazyk\LinguaStory_2025\Talyx`
**Continuation Prompt:** `docs\chat_continuation_prompt.md`

---

**Created:** 2025-07-20 13:46 (UTC+2)
**Updated:** 2025-07-20 21:40 (UTC+2) - Added Git Zero Risk Workflow
**Purpose:** Universal session ending for clean project handoffs

---

## GIT ZERO RISK WORKFLOW

**Integrated into session management for maximum safety:**

### Workflow Steps:
1. **Before major operation:** `git add .; git commit -m "Checkpoint: before [operation]"`
2. **After completing section:** `git add .; git commit -m "Completed: [specific achievement]"`  
3. **At session end:** `git push origin main`

### Session End Git Commands:
```powershell
Set-Location "C:\Users\maria\OneDrive\Documents\Projekt-Francuzsky_jazyk\LinguaStory_2025\Talyx"
git status
git add .
git commit -m "Completed: [session achievements]"
git push origin main
git status
```

**Result:** Zero risk of work loss, complete version history, cloud backup