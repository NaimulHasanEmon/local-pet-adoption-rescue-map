#!/usr/bin/env node

/**
 * Security Check Script
 * Scans the codebase for potential exposed secrets and security issues
 */

const fs = require('fs');
const path = require('path');

// Define patterns for sensitive information
const SECRET_PATTERNS = {
  'MongoDB URI': /mongodb(\+srv)?:\/\/[^\s"']+/gi,
  'Firebase API Key': /AIza[0-9A-Za-z_-]{35}/g,
  'Firebase Config': /firebaseConfig\s*=\s*{[^}]+}/g,
  'Stripe Key': /sk_live_[0-9a-zA-Z]{24}|pk_live_[0-9a-zA-Z]{24}/g,
  'GitHub Token': /ghp_[0-9a-zA-Z]{36}/g,
  'Email Address': /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  'Phone Number': /\b(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/g,
  'JWT Secret': /jwt_secret\s*[:=]\s*['"][^'"]{32,}['"]/gi,
  'API Key': /api_key\s*[:=]\s*['"][^'"]{20,}['"]/gi,
  'Password': /password\s*[:=]\s*['"][^'"]{8,}['"]/gi
};

// Define patterns to exclude (false positives)
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /\.env/,
  /\.env\./,
  /package-lock\.json/,
  /yarn\.lock/,
  /\.css$/,  // Exclude CSS files to avoid false positives
  /\.scss$/,
  /\.less$/,
  /\.svg$/,
  /\.ico$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.woff$/,
  /\.woff2$/,
  /\.ttf$/,
  /\.eot$/,
  /mockData\.js$/,  // Exclude mock data files
  /seedData\.js$/,  // Exclude seeding files
  /test.*\.js$/,    // Exclude test files
  /README\.md$/,    // Exclude README files
  /TROUBLESHOOTING.*\.md$/,  // Exclude troubleshooting docs
  /SEEDING.*\.md$/,          // Exclude seeding docs
  /SECURITY.*\.md$/,         // Exclude security docs
  /docker-compose\.yml$/,    // Exclude Docker compose files
  /ecosystem\.config\.js$/,  // Exclude PM2 config files
  /env\.example$/,           // Exclude example environment files
  /\.env\.example$/,         // Exclude example environment files
  /src\/data\/mockData\.js$/, // Exclude client-side mock data
  /Footer\.jsx$/,            // Exclude footer component (business contact info)
  /Contact\.jsx$/,           // Exclude contact component (business contact info)
  /Login\.jsx$/,             // Exclude login component (form validation messages)
  /SignUp\.jsx$/,            // Exclude signup component (form validation messages)
  /About\.jsx$/,             // Exclude about component (business info)
  /Home\.jsx$/,              // Exclude home component (business info)
  /PetProfile\.jsx$/,        // Exclude pet profile component (form placeholders)
  /PetSubmission\.jsx$/,     // Exclude pet submission component (form placeholders)
  /firebase\.js$/             // Exclude Firebase config (uses env vars)
];

// Directories to scan
const SCAN_DIRECTORIES = [
  '../local_pet_adoption_rescue_map_client',
  '../local_pet_adoption_rescue_map_server'
];

// Function to check if file should be excluded
function shouldExcludeFile(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

// Function to scan a file for secrets
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];
    
    Object.entries(SECRET_PATTERNS).forEach(([type, pattern]) => {
      const matches = content.match(pattern);
      if (matches) {
        // Filter out false positives for phone numbers (CSS values, etc.)
        if (type === 'Phone Number') {
          const filteredMatches = matches.filter(match => {
            // Exclude common CSS values that might match phone pattern
            const cssValue = /^[0-9]{1,4}$/.test(match);
            const cssProperty = /^[0-9]+(px|em|rem|%|vh|vw)$/i.test(match);
            const rgbValue = /^[0-9]{1,3}$/.test(match) && content.includes('rgb') || content.includes('rgba');
            return !cssValue && !cssProperty && !rgbValue;
          });
          
          if (filteredMatches.length > 0) {
            findings.push({
              type,
              count: filteredMatches.length,
              examples: filteredMatches.slice(0, 3)
            });
          }
        } else {
          findings.push({
            type,
            count: matches.length,
            examples: matches.slice(0, 3)
          });
        }
      }
    });
    
    return findings;
  } catch (error) {
    return [{ type: 'Error reading file', count: 1, examples: [error.message] }];
  }
}

// Function to recursively scan directory
function scanDirectory(dirPath, baseDir = '') {
  const findings = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = path.join(baseDir, item);
      
      if (shouldExcludeFile(relativePath)) {
        continue;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findings.push(...scanDirectory(fullPath, relativePath));
      } else if (stat.isFile()) {
        const fileFindings = scanFile(fullPath);
        if (fileFindings.length > 0) {
          findings.push({
            file: relativePath,
            findings: fileFindings
          });
        }
      }
    }
  } catch (error) {
    console.log(`⚠️  Warning: Could not scan directory ${dirPath}: ${error.message}`);
  }
  
  return findings;
}

// Main execution
console.log('🔒 Security Check - Scanning for exposed secrets...\n');

let totalFindings = 0;
let totalFiles = 0;

SCAN_DIRECTORIES.forEach(dir => {
  console.log(`📁 Scanning: ${dir}`);
  const dirFindings = scanDirectory(path.resolve(dir));
  
  if (dirFindings.length === 0) {
    console.log('✅ No security issues found\n');
  } else {
    console.log(`❌ Found ${dirFindings.length} files with potential security issues:\n`);
    
    dirFindings.forEach(fileResult => {
      console.log(`📄 ${fileResult.file}:`);
      fileResult.findings.forEach(finding => {
        const severity = finding.type.includes('URI') || finding.type.includes('Key') || finding.type.includes('Secret') ? 'HIGH' : 'MEDIUM';
        console.log(`   ${severity} - ${finding.type} (${finding.count} matches)`);
        if (finding.examples.length > 0) {
          console.log(`      Examples: ${finding.examples.join(', ')}`);
        }
        totalFindings += finding.count;
      });
      totalFiles++;
      console.log('');
    });
  }
});

console.log('📊 Summary:');
console.log(`   Files scanned: ${totalFiles}`);
console.log(`   Total findings: ${totalFindings}`);

if (totalFindings === 0) {
  console.log('\n🎉 Security check passed! No sensitive information found.');
} else {
  console.log('\n🔧 Recommendations:');
  console.log('   1. Review all flagged items above');
  console.log('   2. Remove or replace real credentials with environment variables');
  console.log('   3. Use .env files for local development');
  console.log('   4. Ensure .env files are in .gitignore');
  console.log('   5. Run this check again before committing');
  
  console.log('\n📋 Pre-commit Checklist:');
  console.log('   [ ] All .env files are in .gitignore');
  console.log('   [ ] No hardcoded credentials in source code');
  console.log('   [ ] Example environment files are provided');
  console.log('   [ ] Database connection strings use environment variables');
  console.log('   [ ] API keys use environment variables');
  console.log('   [ ] Security check passes');
}

// Exit with error code if issues found
process.exit(totalFindings > 0 ? 1 : 0);
