const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, '../src/components/AIAssistant/AIAssistant.tsx');
const oldPath = path.join(__dirname, '../src/components/AIAssistant/AIAssistant_OLD.tsx');

let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// Extract imports
const imports = tsxContent.substring(0, tsxContent.indexOf('// TODO: restore'));

// Extract old component
const oldComponentStart = tsxContent.indexOf('const AIAssistant_OLD: React.FC = () => {');
const oldComponent = tsxContent.substring(oldComponentStart, tsxContent.lastIndexOf('export default AIAssistant;'));

// Create AIAssistant_OLD.tsx
const oldFileContent = imports + oldComponent + 'export default AIAssistant_OLD;\n';
fs.writeFileSync(oldPath, oldFileContent);

// Remove old component and block comments from AIAssistant.tsx
let newTsxContent = tsxContent.substring(0, tsxContent.indexOf('/*\nconst AIAssistant_OLD'));
// Remove the lingering '*/' or '/*\n' if any, actually just slice cleanly
const exportIndex = tsxContent.indexOf('export default AIAssistant;');
newTsxContent = tsxContent.substring(0, tsxContent.indexOf('/*\nconst AIAssistant_OLD')) + 'export default AIAssistant;\n';
fs.writeFileSync(tsxPath, newTsxContent);

console.log('Fixed parse error');
