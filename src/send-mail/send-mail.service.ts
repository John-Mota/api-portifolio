import * as moment from 'moment-timezone';

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';

@Injectable()
export class SendMailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport(
            smtpTransport({
              host: 'smtp-mail.outlook.com',
              port: 587,
              secure: false,
              auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
              },
            })
          );
          
    }

    async sendEmail(name: string, email: string, suggestion: string): Promise<void> {
        // Para detectar o fuso horário do cliente, você pode usar algo assim:
        const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Para criar um momento com o fuso horário do cliente:
        const now = moment().tz(clientTimeZone);

        // Agora você pode formatar a data e hora com base no fuso horário:
        const formattedDate = now.format('DD/MM/YY');
        const formattedTime = now.format('HH:mm');

        const emailBody = `
            <h2>Sugestão do Portifólio</h2>
            <p>Remetente: ${name}</p>
            <p>Email: ${email}</p>
            <div>
                <p>Sugestão:</p>
                <p>${suggestion}</p>
            </div>
            <p>Data: ${formattedDate}</p>
            <p>Hora: ${formattedTime}</p>
        `
        const mailOptions = {
            from: 'api-portifolio@hotmail.com',
            to: 'johnmarcos71@gmail.com',
            subject: `Suggestion from ${name} (${email})`,
            html: emailBody
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            throw new Error('Falha ao enviar e-mail: ' + error.message);
        }
    }
}
