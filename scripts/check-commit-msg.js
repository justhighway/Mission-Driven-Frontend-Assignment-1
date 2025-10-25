import fs from 'fs';
import path from 'path';

const msgFilePath = process.argv[2];
if (!msgFilePath) {
  console.error('ERROR: No commit message file path provided.');
  process.exit(1);
}

try {
  const fullPath = path.resolve(process.cwd(), msgFilePath);
  const message = fs.readFileSync(fullPath, 'utf8').trim();

  const commitRegex =
    /^(feat|fix|style|refactor|docs|chore|test|ci|perf)(\([a-z-]+\))?: .+/;

  if (!commitRegex.test(message)) {
    console.error(
      `\n` +
        '----------------------------------------------------\n' +
        'ERROR: 잘못된 커밋 메시지 형식입니다.\n' +
        '  유형: feat, fix, style, refactor, docs, chore, test, ci, perf\n' +
        '\n' +
        '----------------------------------------------------\n'
    );
    process.exit(1);
  }
  process.exit(0);
} catch (e) {
  console.error(`ERROR: Cannot read commit message file at ${msgFilePath}`);
  console.error(e);
  process.exit(1);
}
