import axios from "axios";

class TelegramService {
  async sendMessage(text: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log("Telegram nu este configurat în .env");
      return;
    }

    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true
    });
  }

  
  async sendNewCerereMessage(cerere: any, claimLink: string) {
    const dataCerere = new Date(cerere.ora);

    const dataFormatata = dataCerere.toLocaleString("ro-RO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

     const message = `
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

    await this.sendMessage(message);
  }
}

export default new TelegramService();