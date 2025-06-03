import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from './database-connection';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.getOrThrow<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
        });
        return drizzle(pool, {
          schema: {},
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class DatabaseModule {}
