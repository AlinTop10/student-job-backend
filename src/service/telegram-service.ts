import axios from "axios";

class TelegramService {
  private async sendMessage(chatId: string, text: string, replyMarkup?: any) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken || !chatId) {
      console.log("Telegram nu este configurat în .env");
      return;
    }

    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: replyMarkup,
    });
  }

  private formatCerereMessage(cerere: any, claimLink: string) {
    const dataCerere = new Date(cerere.ora);

    const dataFormatata = dataCerere.toLocaleString("ro-RO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return `
📌 <b>CERERE NOUĂ</b>

📝 <b>Detalii:</b> ${cerere.detalii}
📍 <b>Locație:</b> ${cerere.locatie}
👥 <b>Persoane:</b> ${cerere.nr_persoane}
🕒 <b>Când:</b> ${dataFormatata}
💰 <b>Plată:</b> ${cerere.plata} ${cerere.moneda}
🙋 <b>Preferință:</b> ${cerere.preferinta_gender}

✅ <b>Ia lucrarea aici:</b>
${claimLink}
`;
  }

  async sendPublicCerereMessage(cerere: any, claimLink: string) {
    const publicChatId = process.env.TELEGRAM_PUBLIC_CHAT_ID;

    if (!publicChatId) {
      console.log("TELEGRAM_PUBLIC_CHAT_ID lipsește în .env");
      return;
    }

    const message = this.formatCerereMessage(cerere, claimLink);

    await this.sendMessage(publicChatId, message);
  }

  async sendAdminReviewMessage(cerere: any, claimLink: string) {
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (!adminChatId) {
      console.log("TELEGRAM_ADMIN_CHAT_ID lipsește în .env");
      return;
    }

    const message = `
🛡️ <b>CERERE PENTRU APROBARE</b>

${this.formatCerereMessage(cerere, claimLink)}

📌 <b>Status:</b> Așteaptă aprobarea adminului.
`;

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: "✅ Postează",
            callback_data: `publish_${cerere.idCerere}`,
          },
        ],
      ],
    };

    await this.sendMessage(adminChatId, message, keyboard);
  }

  async answerCallbackQuery(callbackQueryId: string, text: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      console.log("TELEGRAM_BOT_TOKEN lipsește.");
      return;
    }

    await axios.post(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
      callback_query_id: callbackQueryId,
      text,
      show_alert: false,
    });
  }
}

export default new TelegramService();