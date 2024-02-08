export interface IEnvironment {
  app: IApp;
  database: IDatabase;
  jwt: IJWT;
  twilioAccountSid: string;
  twilioAuthToken: string;
}
interface IApp {
  name: string;
  version: string;
  env: string;
  port: number;
  apiPrefix: string;
}
interface IJWT {
  access_sercret: string;
  refresh_secret: string;
  access_expires: string;
}
interface IDatabase {
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
}

export default function environment(): IEnvironment {
  return {
    app: {
      name: process.env.APP_NAME ?? 'nest-js',
      version: process.env.APP_VERSION ?? '1.0.0',
      env: process.env.NODE_ENV ?? 'development',
      port: parseInt(process.env.APP_PORT ?? '3000'),
      apiPrefix: process.env.API_PREFIX ?? 'api',
    },
    database: {
      name: process.env.DB_DATABASE ?? 'postgres',
      type: process.env.DB_TYPE ?? 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME ?? 'admin',
      password: process.env.DB_PASSWORD ?? 'admin',
    },
    jwt: {
      access_sercret: process.env.JWT_SECRET ?? 'secret',
      refresh_secret: process.env.JWT_SECRET ?? 'secret',
      access_expires: process.env.JWT_ACCESS_EXPIRES ?? '1h',
    },
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? '',
  };
}
