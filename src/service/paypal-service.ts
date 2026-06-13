import ApiError from "../exceptions/api-error";
import claimService from "./claim-service";
import { Cerere } from "../models/cereri_model";
import { CerereClaim } from "../models/cerere_claims";
import { sequelize } from "../db";

class PayPalService {
  private clientId = process.env.PAYPAL_CLIENT_ID!;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  private baseUrl = process.env.PAYPAL_BASE_URL!;

  private async getAccessToken() {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (!data.access_token) {
      throw ApiError.BadRequest("Nu s-a putut obține token PayPal.");
    }

    return data.access_token;
  }

  async createOrder(token: string, studentData: any) {
    const claimData = await claimService.getByToken(token);

    if (!claimData.available) {
      throw ApiError.BadRequest("Această lucrare nu mai este disponibilă.");
    }

    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: "1.00",
            },
            custom_id: JSON.stringify({
              token,
              idCerere: claimData.cerere.idCerere,
              ...studentData,
            }),
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.id) {
      throw ApiError.BadRequest("Nu s-a putut crea comanda PayPal.");
    }

    return data;
  }

  async captureOrder(orderID: string) {
  const accessToken = await this.getAccessToken();

  const response = await fetch(
    `${this.baseUrl}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (data.status !== "COMPLETED") {
    throw ApiError.BadRequest("Plata PayPal nu a fost finalizată.");
  }

  const customId = data.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id;

  if (!customId) {
    throw ApiError.BadRequest("Lipsesc datele comenzii PayPal.");
  }

  const parsedData = JSON.parse(customId);

  const {
    idCerere,
    nume_student,
    email_student,
    telefon_student
  } = parsedData;

  return await sequelize.transaction(async (transaction) => {
    const cerere = await Cerere.findOne({
      where: { idCerere },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!cerere) {
      throw ApiError.BadRequest("Cererea nu există.");
    }

    if (cerere.statusCerere !== "OPEN") {
      throw ApiError.BadRequest("Această lucrare este deja rezervată.");
    }

    const claim = await CerereClaim.create(
      {
        cerere_id: idCerere,
        nume_student,
        email_student,
        telefon_student,
      },
      { transaction }
    );

    cerere.statusCerere = "RESERVED";
    await cerere.save({ transaction });

    return {
      message: "Lucrarea a fost rezervată cu succes.",
      cerere,
      claim,
      paypal: data,
    };
  });
}
}

export default new PayPalService();