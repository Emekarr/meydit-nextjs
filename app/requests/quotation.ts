import { JobFields } from "../dashboard/page";
import { QuotationFields } from "../reuseables/jobTitle/JobTile";
import RemoteRepository from "../services/network/RemoteRepository";
import { JobType, QuotationType, ServerResponse } from "./type";

export default abstract class QuotationRequests {
  static async createQuotation(
    payload: QuotationFields
  ): Promise<ServerResponse<QuotationType | null>> {
    try {
      const response: ServerResponse<QuotationType | null> =
        await RemoteRepository.ns.post("/quotation", payload, {});
      return response;
    } catch (err: any) {
      return {
        message: err.message,
        success: false,
        errors: null,
        body: null,
      };
    }
  }

  static async fetchJobs(
    lastID: string,
    limit: number,
    state: string | null,
    postCode: string | null,
    type: string | null
  ) {
    try {
      const response: ServerResponse<JobType[] | null> =
        await RemoteRepository.ns.get(
          `/job?id=${lastID}&limit=${limit}&postcode=${postCode}&state=${state}&type=${type}&`,
          {}
        );
      return response;
    } catch (err: any) {
      return {
        message: err.message,
        success: false,
        errors: null,
        body: null,
      };
    }
  }
}
