import { Injectable, Options } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import { SendEmailDto } from './mailing.interface';
import Mail from 'nodemailer/lib/mailer';
import { MailerOptions } from '@nestjs-modules/mailer';
@Injectable()
export class MailingService {
    constructor(private readonly configService:ConfigService){}
    Mailtransport(){
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // Use `true` for port 465, `false` for all other ports
        auth: {
          user:process.env.SMTP_USERNAME ,
          pass:process.env.SMTP_PASSWORD,
        }
        ,tls: {
            rejectUnauthorized: false
        }
      } );
      return transporter;
    }
    async sendEmail(dto:SendEmailDto){
        const {from,to,text,placeholderReplacement,subject,html}=dto
        const transport=this.Mailtransport();
       const options={
            from:from,
            to: to,
            subject: subject,
            html: html
        }
        try{
            return await transport.sendMail(options);
        }catch(error){
            throw new Error(error.message);
        }
        
    }
}
