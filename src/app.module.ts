import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendMailService } from './send-mail/send-mail.service';
import { SendMailController } from './send-mail/send-mail.controller';
import { SendMailModule } from './send-mail/send-mail.module';

@Module({
  imports: [SendMailModule],
  controllers: [AppController, SendMailController],
  providers: [AppService, SendMailService],
})
export class AppModule {}
