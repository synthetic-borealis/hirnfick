import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

function isDirectory(filePath: string): boolean {
  const fileStats = fs.lstatSync(filePath);
  return fileStats.isDirectory();
}

type ForTreePredicate = (file: string) => Promise<void>;

async function forTree(basePath: string, predicate: ForTreePredicate): Promise<void> {
  const files = await fsPromises.readdir(basePath);
  const fileTransformers: Promise<void>[] = [];
  const subdirectoryIterators: Promise<void>[] = [];
  files.forEach((file) => {
    const filePath = path.join(basePath, file);
    if (isDirectory(filePath)) {
      subdirectoryIterators.push(forTree(filePath, predicate));
    } else {
      fileTransformers.push(predicate(filePath));
    }
  });
  await Promise.all([...subdirectoryIterators, ...fileTransformers]);
}

console.log('Generating Deno friendly TypeScript files');

const SRC_PATH = './src';
const DENO_PATH = './deno';
const importLineEndRegex = /(?<=\S)';$/gm;

try {
  if (fs.existsSync(DENO_PATH) && isDirectory((DENO_PATH))) {
    fs.rmSync(DENO_PATH, { recursive: true });
  }
  await fsPromises.cp(SRC_PATH, DENO_PATH, { recursive: true });
  await forTree(DENO_PATH, async (filePath) => {
    const fileContent = await fsPromises.readFile(filePath, 'utf8');
    const transformedFileContent = fileContent.replace(importLineEndRegex, '.ts\';');
    await fsPromises.writeFile(filePath, transformedFileContent);
  });
} catch (error) {
  console.error(error);
  process.exit(-1);
}
console.log('Success!');
