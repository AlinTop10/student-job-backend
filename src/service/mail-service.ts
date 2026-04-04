import nodemailer from 'nodemailer';


export class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 
            port: 
            secure: false,
            auth: {
                
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        console.log(`Sending mail to ${to} with link: ${link}`);
    }
}

export default new MailService(); 