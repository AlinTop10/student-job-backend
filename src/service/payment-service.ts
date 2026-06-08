import Stripe from "stripe";
import ApiError from "../exceptions/api-error";
import claimService from "./claim-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class PaymentService {
  async createCheckoutSession(token: string) {
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
      },

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/claim/${token}`,
    });

    return {
      url: session.url,
    };
  }
}

export default new PaymentService();