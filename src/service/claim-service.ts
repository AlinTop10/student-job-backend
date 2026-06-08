import ApiError from "../exceptions/api-error";
import { ClaimToken } from "../models/claim_tokens";
import { Cerere } from "../models/cereri_model";

class ClaimService {
    async getByToken(token: string) {
        const claimToken = await ClaimToken.findOne({
            where: { token }
        });

        if (!claimToken) {
            throw ApiError.BadRequest("Linkul nu este valid.");
        }

        if (claimToken.expires_at && new Date(claimToken.expires_at) < new Date()) {
            throw ApiError.BadRequest("Linkul a expirat.");
        }

        const cerere = await Cerere.findOne({
            where: { idCerere: claimToken.idCerere }
        });

        if (!cerere) {
            throw ApiError.BadRequest("Cererea nu există.");
        }

        return {
            cerere,
            available: cerere.statusCerere === "OPEN"
        };
    }
}

export default new ClaimService();