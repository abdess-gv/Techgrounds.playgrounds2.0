# AI Safety Quiz - Testing & Debugging Guide

## 🎯 Overview
This guide provides comprehensive testing, debugging, and optimization procedures for the AI Safety Quiz application.

## 🔧 Environment Setup

### Prerequisites
1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

### Installation
```bash
cd d:\Techgrounds.playgrounds2.0\ai-veiligheid-exercises
npm install
```

## 🚀 Development Commands

### Basic Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run preview    # Preview production build
npm run debug      # Run comprehensive debug analysis
```

### Advanced Commands
```bash
npm run build:gh-pages  # Build for GitHub Pages deployment
npm run deploy          # Deploy to GitHub Pages
npm run test:quiz       # Run quiz-specific tests
```

## 🧪 Testing Procedures

### 1. **Environment Testing**
```bash
npm run debug
```
This script will check:
- Node.js and npm versions
- Dependencies status
- Quiz data integrity
- TypeScript configuration
- Performance optimizations

### 2. **Manual Testing Checklist**

#### **Level Selection**
- [ ] Can select beginner level
- [ ] Can select intermediate level  
- [ ] Can select advanced level
- [ ] Level selection animations work smoothly
- [ ] Auto-start works with URL parameters

#### **Quiz Functionality**
- [ ] Questions display correctly
- [ ] All question types render properly:
  - [ ] Multiple choice
  - [ ] Multiple select
  - [ ] Scenario analysis
  - [ ] Case study
- [ ] Answer selection works
- [ ] Navigation between questions
- [ ] Progress bar updates
- [ ] Completion screen appears
- [ ] Score calculation is accurate

#### **Question Types Testing**

**Multiple Choice:**
- [ ] Only one answer can be selected
- [ ] Selection highlights correctly
- [ ] Submit button enables/disables properly

**Multiple Select:**
- [ ] Multiple answers can be selected
- [ ] Deselection works
- [ ] Instructions show "multiple answers" hint

**Scenario Analysis:**
- [ ] Scenario details display
- [ ] Stakeholders list renders
- [ ] Considerations show properly
- [ ] Multiple correct answers supported

**Case Study:**
- [ ] Company background displays
- [ ] Challenge description clear
- [ ] Outcome expectations shown
- [ ] All case study sections formatted correctly

#### **User Experience**
- [ ] Smooth transitions between screens
- [ ] Mobile responsive design
- [ ] Accessibility features work
- [ ] Loading states appropriate
- [ ] Error handling graceful

### 3. **Browser Testing**

#### **Desktop Browsers**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### **Mobile Browsers**
- [ ] Mobile Chrome
- [ ] Mobile Safari
- [ ] Mobile Firefox

#### **Embedded Testing**
Test iframe embedding with different parameters:
```html
<!-- Basic embed -->
<iframe src="http://localhost:5173/exercises" width="800" height="600"></iframe>

<!-- Auto-start beginner -->
<iframe src="http://localhost:5173/exercises?level=beginner&autoStart=true" width="800" height="600"></iframe>

<!-- Direct intermediate level -->
<iframe src="http://localhost:5173/exercises?level=intermediate" width="800" height="600"></iframe>
```

## 🐛 Common Issues & Solutions

### **Node.js/npm Issues**
```bash
# Issue: npm/node not found
# Solution: Install Node.js from https://nodejs.org/

# Issue: Permission errors
# Solution: Run as administrator or use node version manager
```

### **TypeScript Issues**
```bash
# Issue: Cannot find module 'react'
# Solution: Check dependencies installation
npm install

# Issue: JSX element implicitly has type 'any'
# Solution: Ensure React import is correct
import React from 'react'
```

### **Build Issues**
```bash
# Issue: Build fails
# Solution: Clean and rebuild
rm -rf node_modules dist
npm install
npm run build

# Issue: Types not found
# Solution: Check TypeScript configuration
npx tsc --noEmit
```

### **Performance Issues**
```bash
# Issue: Slow loading
# Solution: Check bundle size
npm run build
# Check dist/ folder size

# Issue: Memory problems
# Solution: Restart development server
```

## 📊 Performance Monitoring

### **Bundle Analysis**
```bash
npm run build
# Check dist/ folder contents
# Main JavaScript bundle should be < 500KB
# CSS should be < 50KB
```

### **Load Time Testing**
1. Open browser DevTools
2. Go to Network tab
3. Load the application
4. Check total load time (should be < 3 seconds)

### **Memory Usage**
1. Open DevTools Performance tab
2. Record a full quiz session
3. Check for memory leaks
4. Verify smooth animations

## 🔒 Security Testing

### **Data Validation**
- [ ] No sensitive data in console logs
- [ ] No hardcoded credentials
- [ ] Proper input sanitization
- [ ] Safe iframe embedding

### **Cross-Origin Testing**
- [ ] CORS properly configured
- [ ] postMessage communication secure
- [ ] No XSS vulnerabilities

## 📱 Accessibility Testing

### **Keyboard Navigation**
- [ ] Tab navigation works
- [ ] Enter key submits answers
- [ ] Escape key for modals
- [ ] Arrow keys for options

### **Screen Reader Support**
- [ ] ARIA labels present
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] Form labels correct

### **Visual Accessibility**
- [ ] High contrast mode support
- [ ] Text scaling works
- [ ] Color blind friendly
- [ ] Focus indicators visible

## 🚨 Error Handling Testing

### **Network Errors**
- [ ] Offline behavior
- [ ] Slow connection handling
- [ ] Failed resource loading

### **User Errors**
- [ ] No answer selected
- [ ] Invalid level parameter
- [ ] Malformed URL parameters

### **System Errors**
- [ ] JavaScript errors
- [ ] CSS loading failures
- [ ] Font loading issues

## 📈 Optimization Validation

### **Code Splitting**
- [ ] Vendor bundles separate
- [ ] Dynamic imports working
- [ ] Chunk loading efficient

### **Asset Optimization**
- [ ] Images compressed
- [ ] Fonts subset
- [ ] CSS minified
- [ ] JavaScript minified

### **Caching Strategy**
- [ ] Static assets cached
- [ ] Version hashing works
- [ ] Cache invalidation proper

## 📝 Reporting Issues

When reporting issues, include:

1. **Environment Details**
   - Browser and version
   - Operating system
   - Screen resolution
   - Device type

2. **Steps to Reproduce**
   - Exact steps taken
   - Expected behavior
   - Actual behavior
   - Screenshots/videos

3. **Error Details**
   - Console error messages
   - Network failures
   - Performance metrics

4. **Quiz Context**
   - Question level
   - Question type
   - User selections
   - Progress in quiz

## 🎯 Success Criteria

### **Performance Targets**
- Page load time: < 3 seconds
- First contentful paint: < 1.5 seconds
- Quiz completion time: 15-20 minutes
- No memory leaks during session

### **Functionality Targets**
- 100% questions render correctly
- All answer types work properly
- Accurate scoring calculation
- Smooth user experience

### **Quality Targets**
- Zero TypeScript errors
- No console errors
- Accessible to screen readers
- Mobile responsive design

---

## 📞 Support

For technical issues or questions:
1. Run the debug script: `npm run debug`
2. Check console for error messages
3. Review this testing guide
4. Document issue with reproduction steps

Remember: Quality assurance is an ongoing process. Run these tests regularly during development and before releases.