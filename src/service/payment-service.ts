import Stripe from "stripe";
import ApiError from "../exceptions/api-error";
import claimService from "./claim-service";
import { Cerere } from "../models/cereri_model";
import { CerereClaim } from "../models/cerere_claims";
import { sequelize } from "../db";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class PaymentService {
  async createCheckoutSession(token: string, studentData: any) {
    const claimData = await claimService.getByToken(token);

    if (!claimData.available) {
      throw ApiError.BadRequest("Această lucrare nu mai este disponibilă.");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Taxă acces lucrare Studwork",
              description: `Acces pentru cererea #${claimData.cerere.idCerere}`,
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],

      metadata: {
        claimToken: token,
        idCerere: String(claimData.cerere.idCerere),
        nume_student: studentData.nume_student,
        email_student: studentData.email_student,
        telefon_student: studentData.telefon_student,
      },

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/claim/${token}`,
    });

    return {
      url: session.url,
    };
  }

  async confirmPayment(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      throw ApiError.BadRequest("Plata nu este confirmată.");
    }

    const metadata = session.metadata;

    if (!metadata) {
      throw ApiError.BadRequest("Lipsesc datele plății.");
    }

    const idCerere = Number(metadata.idCerere);

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
          nume_student: metadata.nume_student,
          email_student: metadata.email_student,
          telefon_student: metadata.telefon_student,
        },
        { transaction }
      );

      cerere.statusCerere = "RESERVED";
      await cerere.save({ transaction });

      return {
        message: "Lucrarea a fost rezervată cu succes.",
        cerere,
        claim,
      };
    });
  }
}

export default new PaymentService();