---
title: "Daily Development Log with Chunk Tracking"
date: {{DATE}}
time: {{TIME}}
author: Marian
project: "{{PROJECT_NAME}}"
session_type: "development"
---

# 📅 Log: {{DATE}} @ {{TIME}}

## 🕒 Session Time: {{START_TIME}}–{{END_TIME}}
### 🎯 Goal: {{SESSION_GOAL}}

---

## 📝 CHUNK_PLAN: {{PLAN_TIME}} - {{SESSION_TITLE}}
### Planned Chunks:
1. **CHUNK_A:** {{CHUNK_A_DESCRIPTION}} ({{CHUNK_A_FILES}})
2. **CHUNK_B:** {{CHUNK_B_DESCRIPTION}} ({{CHUNK_B_FILES}})
3. **CHUNK_C:** {{CHUNK_C_DESCRIPTION}} ({{CHUNK_C_FILES}})
4. **CHUNK_D:** {{CHUNK_D_DESCRIPTION}} ({{CHUNK_D_FILES}})

**Estimated Duration:** {{ESTIMATED_DURATION}}
**Risk Level:** {{RISK_LEVEL}} ({{RISK_DESCRIPTION}})

---

## 🔄 CHUNK EXECUTION LOG

### ⏳ CHUNK_A_START: {{CHUNK_A_START_TIME}} - {{CHUNK_A_TITLE}}
- **Target:** {{CHUNK_A_TARGET_FILES}}
- **Action:** {{CHUNK_A_ACTION_DESCRIPTION}}
- **Prerequisites:** {{CHUNK_A_PREREQUISITES}}

### ✅ CHUNK_A_END: {{CHUNK_A_END_TIME}} - {{CHUNK_A_RESULT}}
- **Status:** {{CHUNK_A_STATUS}} (SUCCESS|FAILED|PARTIAL|INTERRUPTED)
- **Git:** `{{CHUNK_A_GIT_HASH}}` - "{{CHUNK_A_GIT_MESSAGE}}"
- **Files:** {{CHUNK_A_FILES_MODIFIED}}
- **Duration:** {{CHUNK_A_DURATION}} minutes
- **Next:** CHUNK_B

---

### ⏳ CHUNK_B_START: {{CHUNK_B_START_TIME}} - {{CHUNK_B_TITLE}}
- **Target:** {{CHUNK_B_TARGET_FILES}}
- **Action:** {{CHUNK_B_ACTION_DESCRIPTION}}
- **Dependencies:** {{CHUNK_B_DEPENDENCIES}}

### ✅ CHUNK_B_END: {{CHUNK_B_END_TIME}} - {{CHUNK_B_RESULT}}
- **Status:** {{CHUNK_B_STATUS}}
- **Git:** `{{CHUNK_B_GIT_HASH}}` - "{{CHUNK_B_GIT_MESSAGE}}"
- **Files:** {{CHUNK_B_FILES_MODIFIED}}
- **Duration:** {{CHUNK_B_DURATION}} minutes
- **Next:** CHUNK_C

---

### ⏳ CHUNK_C_START: {{CHUNK_C_START_TIME}} - {{CHUNK_C_TITLE}}
- **Target:** {{CHUNK_C_TARGET_FILES}}
- **Action:** {{CHUNK_C_ACTION_DESCRIPTION}}

### ⚠️ CHUNK_C_INTERRUPTED: {{INTERRUPTION_TIME}} - {{INTERRUPTION_REASON}}
- **Status:** {{CHUNK_C_STATUS}} - needs verification
- **Files:** {{CHUNK_C_FILES_ATTEMPTED}}
- **Last operation:** {{LAST_OPERATION_DESCRIPTION}}
- **Recovery needed:** {{RECOVERY_INSTRUCTIONS}}

---

## 🧠 Session Analysis
### ✅ Completed Successfully:
- {{COMPLETED_CHUNKS_SUMMARY}}

### ⚠️ Needs Recovery:
- {{INCOMPLETE_CHUNKS_SUMMARY}}

### 🚀 Next Session Priorities:
- {{NEXT_SESSION_PRIORITIES}}

---

## 🔧 Tools Used
- {{TOOLS_LIST}}

## 🖋 Session Notes
- **What worked well:** {{SUCCESS_NOTES}}
- **Challenges encountered:** {{CHALLENGE_NOTES}}
- **Improvements for next time:** {{IMPROVEMENT_NOTES}}

---

**Session Status:** {{SESSION_STATUS}} (COMPLETE|INTERRUPTED|PARTIAL)
**Recovery Required:** {{RECOVERY_REQUIRED}} (YES|NO)
**Next Session Start Point:** {{NEXT_START_POINT}}
