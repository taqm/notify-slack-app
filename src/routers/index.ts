import { Router } from 'express';

import { cliRouter } from './cli';
import { cmdRouter } from './cmd';

export const router = Router();
router.use('/cmd', cmdRouter);
router.use('/cli', cliRouter);
