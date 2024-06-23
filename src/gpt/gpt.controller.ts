import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('generate')
  async generateResponse(
    @Body() requestBody: { user: string; message: string },
  ): Promise<string> {
    const { user, message } = requestBody;
    return this.gptService.generateResponse(user, message);
  }
}
