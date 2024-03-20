import Address from 'nodemailer/lib/mailer'
export type SendEmailDto={
    from?:string,
    to:string,
    subject:string,
    html:string,
    text?:string,
    placeholderReplacement?:Record<string,string>
}