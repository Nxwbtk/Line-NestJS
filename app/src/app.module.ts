import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config available to all modules without importing
    }),
    TypeOrmModule.forRoot(dataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
