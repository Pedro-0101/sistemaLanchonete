import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join } from 'path';

import { RegisterRoutes } from './routes/routes';

const app = express();

const swaggerDocument = JSON.parse(
  readFileSync(join(__dirname, 'swagger', 'swagger.json'), 'utf-8'),
) as Record<string, unknown>;

app.use(express.json());

RegisterRoutes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Docs disponiveis em http://localhost:${PORT}/api-docs`);
});
