export const appConfig = {
  SlackToken: process.env.SLACK_TOKEN ?? '',
  Port: process.env.PORT ?? '3000',
  ApiBaseUrl: process.env.BASE_URL ?? '',
};

export type AppConfig = typeof appConfig;
