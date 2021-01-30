import { Router } from 'express';

export const router = Router();

const cmdRouter = Router();
router.use('/cmd', cmdRouter);

cmdRouter.all('/gen', async (req, res) => {
  res.json({
    method: req.method,
    body: req.body,
  });
});

