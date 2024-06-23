import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class GptService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async generateResponse(user: string, message: string): Promise<string> {
    // const apiUrl = 'ссылка на чат'; // Используем модель gpt-4
    // const apiKey = 'ваш ключ к чату'; // Замените на ваш ключ API OpenAI

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: message,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = response.data.choices[0].text.trim();

      // Сохраняем ответ в базу данных
      await this.messageRepository.save({ user, message, response: responseData });

      return responseData;
    } catch (error) {
      console.error('Ошибка вызова API GPT:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}