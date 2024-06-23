import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GptService } from './gpt/gpt.service';
import { GptController } from './gpt/gpt.controller';
import { Message } from './gpt/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [Message],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [GptController],
  providers: [GptService],
})
export class AppModule {}