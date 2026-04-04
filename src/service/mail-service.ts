export class MailService {
    async sendActivationMail(to: string, link: string) {
        console.log(`Sending mail to ${to} with link: ${link}`);
    }
}

export default new MailService(); 