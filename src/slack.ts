import { WebClient } from '@slack/web-api';
const SLACK_TOKEN = process.env.SLACK_TOKEN;
export const slackWebClient = new WebClient(SLACK_TOKEN);
