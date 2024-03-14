import express from 'express';
import petRouter from '../routes/petRouter';

const router = (app: express.Router) => {
  app.use(express.json(), petRouter);
};

export default router;
