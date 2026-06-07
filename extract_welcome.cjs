const fs = require('fs');

const path = 'C:\\Users\\anura\\.gemini\\antigravity-ide\\brain\\c9991026-299f-4e9d-9021-a6db6f16c951\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

const history = [];

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  try {
    const data = JSON.parse(lines[i]);
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'write_to_file' || call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') {
          if (call.args.TargetFile && call.args.TargetFile.includes('WelcomeWindow.tsx')) {
            history.push({ step: data.step_index, file: 'WelcomeWindow.tsx', args: call.args });
          }
          if (call.args.TargetFile && call.args.TargetFile.includes('WelcomeWindow.module.css')) {
            history.push({ step: data.step_index, file: 'WelcomeWindow.module.css', args: call.args });
          }
        }
      }
    }
  } catch(e) {}
}

fs.writeFileSync('extracted_history.json', JSON.stringify(history, null, 2));
console.log('Extraction complete');
