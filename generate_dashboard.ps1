# Talyx Dashboard Generator - PowerShell Script
# Usage: ./generate_dashboard.ps1

Write-Host "🚀 Talyx Development Dashboard Generator" -ForegroundColor Green
Write-Host "======================================="

# Check if Node.js is available
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if log directory exists
if (!(Test-Path "progress/logs")) {
    Write-Host "⚠️ No logs directory found. Creating..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "progress/logs" -Force
}

# Generate dashboard
Write-Host "📊 Generating dashboard from log files..." -ForegroundColor Blue
node scripts/generate_dashboard.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dashboard generated successfully!" -ForegroundColor Green
    
    # Ask if user wants to open dashboard
    $open = Read-Host "Would you like to open the dashboard? (y/n)"
    if ($open -eq "y" -or $open -eq "Y") {
        Start-Process "dashboard/development_dashboard.html"
    }
    
    Write-Host ""
    Write-Host "📁 Files generated:" -ForegroundColor Cyan
    Write-Host "  - dashboard/development_dashboard.html (template)"
    Write-Host "  - dashboard/generated_dashboard.html (from logs)"
    Write-Host ""
    Write-Host "🔄 To auto-regenerate on changes, run:" -ForegroundColor Yellow
    Write-Host "  npm run watch"
    
} else {
    Write-Host "❌ Dashboard generation failed!" -ForegroundColor Red
}
