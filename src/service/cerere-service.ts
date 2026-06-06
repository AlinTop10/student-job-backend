import { Cerere } from "../models/cereri_model";
import ApiError from "../exceptions/api-error";
import claimTokenService from "../service/claim-token-service";


class CerereService {
  async create(data: any) {
    const {
      idUser,
      detalii,
      nr_persoane,
      ora,
      plata,
      moneda,
      preferinta_gender
    } = data;

    if (!idUser || !detalii || !nr_persoane || !ora || !plata) {
      throw ApiError.BadRequest("Completează toate câmpurile obligatorii.");
    }

    if (Number(nr_persoane) < 1) {
      throw ApiError.BadRequest("Numărul de persoane trebuie să fie cel puțin 1.");
    }

    if (Number(plata) <= 0) {
      throw ApiError.BadRequest("Plata trebuie să fie mai mare decât 0.");
    }

    const cerere = await Cerere.create({
      idUser,
      detalii,
      nr_persoane,
      ora,
      plata,
      moneda: moneda || "RON",
      preferinta_gender: preferinta_gender || "ORICARE",
      statusCerere: "OPEN"
    });

    const claimToken = await claimTokenService.createToken(cerere.idCerere);

    const claimLink = `${process.env.CLIENT_URL}/claim/${claimToken.token}`;

    return {
      cerere,
      claimToken,
      claimLink
    };
  }
}

export default new CerereService();