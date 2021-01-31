export type ClientInfo = {
  clientId: string;
  apiKey: string;
  userId: string;
  channelId: string;
};

export type ClientInfoRepository = {
  get(clientId: string): Promise<ClientInfo | null>;
  remove(clientId: string): Promise<void>;
  getByUserId(userId: string): Promise<ClientInfo | null>;
  containsByUserId(userId: string): Promise<boolean>;
  save(draft: Pick<ClientInfo, 'userId' | 'channelId'>): Promise<ClientInfo>;
};
