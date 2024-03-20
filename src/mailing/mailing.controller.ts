import { Controller, Get, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { SendEmailDto } from './mailing.interface';

@Controller('mailing')
export class MailingController {
    constructor(private readonly mailService:MailingService){}
    @Post('')     
    async sendMailConfirmation (){
            const dto:SendEmailDto = {
                from: 'yossrahashassi20@gmail.com',
                to: 'yossrahas@gmail.com',
                subject: 'Confirm your account',
                html: `<div>
                    <h1>Confirmation email</h1>
                    <h2>Good morning</h2>
                    <p>To activate your account, click this link:</p>
                    <a href="http://localhost:3000/confirm/">Click here!</a>
                </div>`
            }
            return await this.mailService.sendEmail(dto)
        }
    }
