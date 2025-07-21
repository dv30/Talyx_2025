# TALYX Local Development Server Solutions

## 🚨 CORS Issue Fix - Multiple Solutions

The content integration demo requires a local HTTP server to work properly due to browser CORS restrictions when loading local files.

---

## 🥇 **SOLUTION 1: Python HTTP Server** ⭐ *Recommended*

### Quick Start:
1. **Double-click:** `start_server.bat` (created in project root)
2. **Browser:** Open `http://localhost:8000/content_integration_demo.html`
3. **Testing:** All content loading will work perfectly

### Manual Start:
```cmd
cd "C:\Users\maria\OneDrive\Documents\Projekt-Francuzsky_jazyk\LinguaStory_2025\Talyx"
python -m http.server 8000
```

### Access URLs:
- **Demo:** http://localhost:8000/content_integration_demo.html
- **Testing Dashboard:** http://localhost:8000/content_testing_dashboard.html
- **Existing Prototype:** http://localhost:8000/prototype/index_sidebar.html

---

## 🥈 **SOLUTION 2: Alternative Content Loading Method**

If you prefer not to use a server, I can modify the content loader to use an alternative approach:

### Option A: Embedded Content
- Embed MD content directly in JavaScript files
- No server required, works with file:// protocol
- Requires content conversion step

### Option B: File Input API
- User selects MD files via file dialog
- Browser native file reading
- Manual file selection required

---

## 🥉 **SOLUTION 3: Browser CORS Bypass** ⚠️ *Temporary Only*

### Chrome with CORS Disabled:
```cmd
chrome.exe --user-data-dir="C:/chrome-dev-session" --disable-web-security --disable-features=VizDisplayCompositor
```

### Firefox with CORS Disabled:
1. Type `about:config` in address bar
2. Set `security.fileuri.strict_origin_policy` to `false`
3. Restart browser

**⚠️ Warning:** Only use for development, restore settings after testing

---

## 🔧 **SOLUTION 4: Node.js Alternative**

If Node.js is available:
```cmd
npx http-server -p 8000 -c-1
```

---

## ✅ **RECOMMENDED WORKFLOW:**

1. **Use start_server.bat** for easiest setup
2. **Access http://localhost:8000/content_integration_demo.html**
3. **Test all Detective Marie stories** with full functionality
4. **Development:** Use http://localhost:8000/content_testing_dashboard.html

---

## 🎯 **IMMEDIATE ACTION:**

**Double-click:** `start_server.bat`  
**Then open:** http://localhost:8000/content_integration_demo.html  
**Result:** ✅ All content loading will work perfectly!

---

## 📞 **If Issues Persist:**

1. **Check port 8000:** Make sure nothing else is using it
2. **Firewall:** Allow Python through Windows firewall if prompted
3. **Alternative port:** Modify start_server.bat to use port 3000 or 8080
4. **Request embedded content solution:** I can modify the loader to work without server

---

**Status:** Multiple solutions provided - Python server is recommended and ready to use!
