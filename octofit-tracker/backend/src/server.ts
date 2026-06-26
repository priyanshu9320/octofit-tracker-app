import express from 'express';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
