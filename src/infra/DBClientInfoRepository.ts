import { v4 as uuidv4 } from 'uuid';
import { ClientInfo, ClientInfoRepository } from '../ClientInfo';

import { PrismaClient, ClientInfo as ModelClientInfo } from '@prisma/client';
const prisma = new PrismaClient()

const model2Domain = (src: ModelClientInfo): ClientInfo => {
  return {
    clientId: src.id,
    apiKey: src.apiKey,
    channelId: src.channelId ,
    userId: src.userId,
  };
};

export class DBClientInfoRepository implements ClientInfoRepository {

  async get(clientId: string): Promise<ClientInfo | null> {
    const found = await prisma.clientInfo.findUnique({
      where: { id: clientId },
    });
    if (!found) {
      return null;
    }
    return model2Domain(found);
  }

  async remove(clientId: string) {
    await prisma.clientInfo.delete({
      where: { id: clientId },
    });
  }

  async containsByUserId(userId: string): Promise<boolean> {
    const cnt = await prisma.clientInfo.count({
      where: { userId },
    });
    return cnt > 0;
  }

  async getByUserId(userId: string): Promise<ClientInfo | null> {
    const found = await prisma.clientInfo.findFirst({
      where: { userId },
    });
    if (!found) {
      return null;
    }

    return model2Domain(found);
  }

  async save(draft: Pick<ClientInfo, 'userId' | 'channelId'>): Promise<ClientInfo> {
    const info = {
      ...draft,
      clientId: uuidv4(),
      apiKey: uuidv4(),
    };
    await prisma.clientInfo.create({
      data: {
        id: info.clientId,
        userId: info.userId,
        channelId: info.channelId,
        apiKey: info.apiKey,
      },
    });
    return info;
  }
}
