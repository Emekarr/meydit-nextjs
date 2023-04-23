import { JobFields } from "../dashboard/page";
import RemoteRepository from "../services/network/RemoteRepository";
import { ServerResponse } from "./type";

export default abstract class JobRequests {
  static async createJob(
    payload: JobFields
  ): Promise<ServerResponse<JobFields | null>> {
    try {
      const payloadFormData: any = new FormData();
      Object.keys(payload).forEach((key: string) => {
        if (key === "images") {
          for (let i = 0; i < payload.images!.length; i++) {
            payloadFormData.append("images", payload.images![i]);
          }
        }
        payloadFormData.append(key, payload[key as keyof JobFields] as string);
      });
      const response: ServerResponse<JobFields | null> =
        await RemoteRepository.ns.post("/job", payloadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
