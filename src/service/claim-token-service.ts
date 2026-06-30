import * as uuid from "uuid";
import { ClaimToken } from "../models/claim_tokens";
import ApiError from "../exceptions/api-error";

class ClaimTokenService {
  async createToken(idCerere: number) {
    const token = uuid.v4();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // token valabil 7 zile

    const claimToken = await ClaimToken.create({
      idCerere,
      token,
      expires_at: expiresAt
    });

    return claimToken;
  }

  async findByToken(token: string) {
    return await ClaimToken.findOne({
      where: { token }
    });
  }

  async findByCerereId(idCerere: number) {
    return await ClaimToken.findOne({
      where: { idCerere }
    });
  }

  async getByCerereId(idCerere: number) {
    const token = await ClaimToken.findOne({
      where: { idCerere },
    });

    if (!token) {
      throw ApiError.BadRequest("Tokenul cererii nu există.");
    }

    return token;
  }
}

export default new ClaimTokenService();