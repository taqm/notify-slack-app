import { AppConfig } from './config';
import { ClientInfoRepository } from './ClientInfo';

export type Registry = {
  appConfig: AppConfig;
  clientInfoRepository: ClientInfoRepository;
};

declare global {
  export namespace Express {
    export interface Request {
      registry: Registry;
    }
  }
}

