import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendMailService } from './send-mail.service';

@Controller('send-mail')
export class SendMailController {
    constructor(private readonly sendEmailService: SendMailService) {}
    @Post()
    async sendEmail(@Body() data: any) {
        const { name, email, suggestion } = data;

        try {
            await this.sendEmailService.sendEmail(name, email, suggestion);
            return { message: 'E-mail enviado com sucesso!' };
        } catch (error){
            return { message: 'Falha ao enviar e-mail.' + error.message };
        }
    }
}
