import { Global, Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';

@Global()
@Module({
  imports: [
    // MailerModule.forRootAsync({
    //   // imports: [ConfigModule], // import module if not enabled globally
    //   useFactory: async (config: ConfigService) => ({
    //     // transport: config.get("MAIL_TRANSPORT"),
    //     // or

    //     transport: {
    //       host: config.get('EMAIL_HOST'),
    //       secure: false,
    //       auth: {
    //         user: config.get('EMAIL_NOREPLY_USER'),
    //         pass: config.get('EMAIL_NOREPLAY_PWD'),
    //       },
    //     },
    //     defaults: {
    //       from: `"No Reply" <${config.get('EMAIL_NOREPLAY_USER')}>`,
    //     },
    //     template: {
    //       dir: join(__dirname, 'templates'),
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
