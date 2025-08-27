import type { Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    ACCESS_SECRET: Secret;
    ACCESS_EXPIRES: StringValue;
    REFRESH_SECRET: Secret;
    REFRESH_EXPIRES: StringValue;
  }
}
