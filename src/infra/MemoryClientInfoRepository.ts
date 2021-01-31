import { v4 as uuidv4 } from 'uuid';
import { ClientInfo, ClientInfoRepository } from '../ClientInfo';

const store: Record<string, ClientInfo> = {};
export class MemoryClientInfoRepository implements ClientInfoRepository {

  async get(clientId: string): Promise<ClientInfo | null> {
    return store[clientId] ?? null;
  }

  async remove(clientId: string) {
    delete store[clientId];
  }

  async containsByUserId(userId: string): Promise<boolean> {
    return Object.entries(store).some(([_, info]) => (
      userId === userId
    ));
  }

  async getByUserId(userId: string): Promise<ClientInfo | null> {
    return Object.entries(store)
      .map(([_, info]) => info)
      .find((info) => info.userId === userId) ?? null;
  }

  async save(draft: Pick<ClientInfo, 'userId' | 'channelId'>): Promise<ClientInfo> {
    const info = {
      ...draft,
      clientId: uuidv4(),
      apiKey: uuidv4(),
    };
    store[info.clientId] = info;
    return info;
  }
}
