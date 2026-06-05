import fs from 'fs';
import path from 'path';

const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.resolve(
      process.cwd(),
      'docs/openapi/openapi.json',
    ),
    'utf-8',
  ),
);

export { swaggerDocument };