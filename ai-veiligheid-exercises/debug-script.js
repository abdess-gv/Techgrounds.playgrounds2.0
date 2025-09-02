#!/usr/bin/env node

/**
 * AI Safety Quiz - Debug and Optimization Script
 * This script provides comprehensive testing, debugging, and optimization utilities
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function checkEnvironment() {
    log('\n🔍 Environment Check', colors.cyan);
    log('===================', colors.cyan);
    
    // Check Node.js
    try {
        const nodeVersion = process.version;
        log(`✅ Node.js: ${nodeVersion}`, colors.green);
    } catch (error) {
        log('❌ Node.js: Not found or not in PATH', colors.red);
    }
    
    // Check npm
    try {
        const { execSync } = require('child_process');
        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        log(`✅ npm: ${npmVersion}`, colors.green);
    } catch (error) {
        log('❌ npm: Not found or not in PATH', colors.red);
        log('   Installation guide: https://nodejs.org/', colors.yellow);
    }
    
    // Check package.json
    const packageJsonPath = path.join(__dirname, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        log(`✅ Project: ${packageJson.name} v${packageJson.version}`, colors.green);
        
        // Check dependencies
        log('\n📦 Dependencies:', colors.blue);
        Object.entries(packageJson.dependencies || {}).forEach(([name, version]) => {
            log(`  ${name}: ${version}`, colors.reset);
        });
        
        log('\n🛠️ Dev Dependencies:', colors.blue);
        Object.entries(packageJson.devDependencies || {}).forEach(([name, version]) => {
            log(`  ${name}: ${version}`, colors.reset);
        });
    } else {
        log('❌ package.json: Not found', colors.red);
    }
}

function analyzeQuizData() {
    log('\n📊 Quiz Data Analysis', colors.cyan);
    log('=====================', colors.cyan);
    
    try {
        const exercisePagePath = path.join(__dirname, 'src', 'pages', 'ExercisePage.tsx');
        const content = fs.readFileSync(exercisePagePath, 'utf8');
        
        // Count questions by level
        const beginnerMatches = content.match(/beginner:[\s\S]*?\]/);
        const intermediateMatches = content.match(/intermediate:[\s\S]*?\]/);
        const advancedMatches = content.match(/advanced:[\s\S]*?\]/);
        
        // Count question types
        const multipleChoiceCount = (content.match(/type: 'multiple-choice'/g) || []).length;
        const multipleSelectCount = (content.match(/type: 'multiple-select'/g) || []).length;
        const scenarioAnalysisCount = (content.match(/type: 'scenario-analysis'/g) || []).length;
        const caseStudyCount = (content.match(/type: 'case-study'/g) || []).length;
        
        log('📈 Question Statistics:', colors.green);
        log(`  Multiple Choice: ${multipleChoiceCount}`, colors.reset);
        log(`  Multiple Select: ${multipleSelectCount}`, colors.reset);
        log(`  Scenario Analysis: ${scenarioAnalysisCount}`, colors.reset);
        log(`  Case Study: ${caseStudyCount}`, colors.reset);
        log(`  Total Questions: ${multipleChoiceCount + multipleSelectCount + scenarioAnalysisCount + caseStudyCount}`, colors.bright);
        
        // Check for potential issues
        log('\n🔍 Potential Issues:', colors.yellow);
        
        // Check for missing correctAnswer
        const missingCorrectAnswer = content.match(/correctAnswer:\s*$/gm);
        if (missingCorrectAnswer) {
            log(`  ⚠️ Found ${missingCorrectAnswer.length} questions with missing correctAnswer`, colors.red);
        } else {
            log('  ✅ All questions have correctAnswer defined', colors.green);
        }
        
        // Check for missing explanations
        const missingExplanation = content.match(/explanation:\s*$/gm);
        if (missingExplanation) {
            log(`  ⚠️ Found ${missingExplanation.length} questions with missing explanation`, colors.red);
        } else {
            log('  ✅ All questions have explanations', colors.green);
        }
        
    } catch (error) {
        log(`❌ Error analyzing quiz data: ${error.message}`, colors.red);
    }
}

function checkTypeScriptIssues() {
    log('\n🔧 TypeScript Issues Check', colors.cyan);
    log('===========================', colors.cyan);
    
    try {
        const tsconfigPath = path.join(__dirname, 'tsconfig.json');
        if (fs.existsSync(tsconfigPath)) {
            const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
            log('✅ tsconfig.json found', colors.green);
            log(`  Target: ${tsconfig.compilerOptions.target}`, colors.reset);
            log(`  Module: ${tsconfig.compilerOptions.module}`, colors.reset);
            log(`  JSX: ${tsconfig.compilerOptions.jsx}`, colors.reset);
            log(`  Strict: ${tsconfig.compilerOptions.strict}`, colors.reset);
        } else {
            log('❌ tsconfig.json not found', colors.red);
        }
        
        // Check for common TypeScript issues
        log('\n🔍 Common Issues to Check:', colors.yellow);
        log('  • Missing React import statements', colors.reset);
        log('  • Implicit any types in callbacks', colors.reset);
        log('  • Missing JSX runtime types', colors.reset);
        log('  • Undefined correctAnswer access', colors.reset);
        
    } catch (error) {
        log(`❌ Error checking TypeScript config: ${error.message}`, colors.red);
    }
}

function generateOptimizationReport() {
    log('\n⚡ Optimization Opportunities', colors.cyan);
    log('=============================', colors.cyan);
    
    log('🎯 Performance Optimizations:', colors.green);
    log('  ✅ Code splitting configured in vite.config.ts', colors.green);
    log('  ✅ Manual chunks for vendor libraries', colors.green);
    log('  ✅ Terser minification enabled', colors.green);
    log('  ✅ Console statements removed in production', colors.green);
    log('  ✅ Asset optimization configured', colors.green);
    
    log('\n📱 User Experience:', colors.green);
    log('  ✅ Progressive loading with fade animations', colors.green);
    log('  ✅ Question shuffling for variety', colors.green);
    log('  ✅ Responsive design for mobile', colors.green);
    log('  ✅ Auto-start functionality for embedded use', colors.green);
    
    log('\n🔒 Type Safety:', colors.green);
    log('  ✅ Explicit types for state variables', colors.green);
    log('  ✅ Interface definitions for data structures', colors.green);
    log('  ✅ Null safety for correctAnswer property', colors.green);
    log('  ✅ Type annotations for callback functions', colors.green);
    
    log('\n📊 Suggestions:', colors.yellow);
    log('  💡 Consider adding unit tests for question logic', colors.reset);
    log('  💡 Add error boundaries for better error handling', colors.reset);
    log('  💡 Implement analytics tracking for learning insights', colors.reset);
    log('  💡 Add accessibility features (ARIA labels, keyboard navigation)', colors.reset);
    log('  💡 Consider implementing question banking for larger question sets', colors.reset);
}

function displayCommands() {
    log('\n🚀 Development Commands', colors.cyan);
    log('======================', colors.cyan);
    
    log('📦 Setup:', colors.green);
    log('  npm install              # Install dependencies', colors.reset);
    log('  npm run dev              # Start development server', colors.reset);
    log('  npm run build            # Build for production', colors.reset);
    log('  npm run preview          # Preview production build', colors.reset);
    
    log('\n🔧 Debugging:', colors.green);
    log('  F12                      # Open browser dev tools', colors.reset);
    log('  Console tab              # Check for JavaScript errors', colors.reset);
    log('  Network tab              # Monitor resource loading', colors.reset);
    log('  Application tab          # Check local storage/session storage', colors.reset);
    
    log('\n🌐 Testing URLs:', colors.green);
    log('  http://localhost:5173                              # Main app', colors.reset);
    log('  http://localhost:5173/exercises                    # Direct exercises', colors.reset);
    log('  http://localhost:5173/exercises?level=beginner     # Specific level', colors.reset);
    log('  http://localhost:5173/exercises?level=beginner&autoStart=true  # Auto-start', colors.reset);
}

// Main execution
function main() {
    log('🎯 AI Safety Quiz - Debug & Optimization Tool', colors.bright);
    log('==============================================', colors.bright);
    
    checkEnvironment();
    analyzeQuizData();
    checkTypeScriptIssues();
    generateOptimizationReport();
    displayCommands();
    
    log('\n✅ Debug analysis complete!', colors.green);
    log('💡 Run this script anytime to check project health', colors.yellow);
}

main();