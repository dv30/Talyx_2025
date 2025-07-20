# Project Time Management Note

## Time Handling Protocol

**Issue Identified:** Claude does not have access to real-time information and may provide incorrect timestamps.

**Solution for Future Sessions:**

### For Timestamp Accuracy:
1. **Use Desktop Commander** to get current system time: `Get-Date`
2. **Use file system timestamps** as reference when available  
3. **Include timezone information** (UTC+2 for Slovak location)
4. **Verify timestamps** before committing to project files

### Desktop Commander Time Command:
```
desktop-commander:start_process: Get-Date
```
Returns current system time in local format.

### Recommended Format:
```
Date: YYYY-MM-DD
Time: HH:MM (UTC+2)
Timezone: Central European Time
```

### For Chat Continuation:
- Rely on **file modification dates** rather than manually entered timestamps
- Use **relative time references** ("today", "this session") when exact time is uncertain
- **Cross-reference with system file timestamps** for accuracy

**Note:** This protocol ensures accurate project tracking and prevents confusion in multi-session development work.

---
**Created:** 2025-07-20 12:55 (UTC+2) - corrected after timestamp error identification