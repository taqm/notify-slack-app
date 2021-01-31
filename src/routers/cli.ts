import { Router } from 'express';
import { slackWebClient } from '../slack';

export const cliRouter = Router();

cliRouter.post('/:clientId/message', async (req, res) => {
  const repos = req.registry.clientInfoRepository;

  const clientId = req.params.clientId;
  const apiKey = req.header('X-API-KEY') ?? '';
  const info = await repos.get(clientId);
  console.log(clientId, info, repos)

  if (info?.apiKey !== apiKey) {
    res.status(401).end();
    return;
  }

  await slackWebClient.chat.postMessage({
    channel: info.channelId,
    text: req.body.text,
  });

  res.status(200).end();
});
