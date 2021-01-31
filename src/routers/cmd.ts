import { Router } from 'express';

import '../registory';
import {ClientInfo} from "../ClientInfo";
import {AppConfig} from "../config";

type SlackCommandRequest = {
  team_id: string;
  token: string;
  channel_id: string;
  user_id: string;
  trigger_id: string;
};

export const cmdRouter = Router();

const message = (info: ClientInfo, appConfig: AppConfig) => `
利用開始の準備が整いました。

client_id: ${info.clientId}
api_key: ${info.apiKey}

ターミナルで↓のコマンドを実行することでこのDMへメッセージを送ることができます。
\`\`\`
curl -X POST -s \\
  -H "X-API-KEY:${info.apiKey}" \\
  ${appConfig.ApiBaseUrl}/cli/${info.clientId}/message \\
  --data 'text=ここにテキストをどうぞ'
\`\`\`
`;

cmdRouter.post('/setup', async (req, res) => {
  const { appConfig, clientInfoRepository: repos } = req.registry;

  const body: SlackCommandRequest =  req.body;
  if (await repos.containsByUserId(body.user_id)) {
    res.send('既にキーが発行されています。忘れた場合は`/regenerate`を実行し再発行してください');
    return;
  }

  const info = await repos.save({
    userId: body.user_id,
    channelId: body.channel_id,
  });

  res.send(message(info, appConfig));
});

cmdRouter.post('/regenerate', async (req, res) => {
  const { appConfig, clientInfoRepository: repos } = req.registry;
  const body: SlackCommandRequest =  req.body;

  const oldInfo = await repos.getByUserId(body.user_id);
  if (!oldInfo) {
    res.send('まだ初期設定が完了していません。 `/setup` をお試しください');
    return;
  }

  await repos.remove(oldInfo.clientId);
  const info = await repos.save({
    userId: body.user_id,
    channelId: body.channel_id,
  });
  res.send(message(info, appConfig));
});
