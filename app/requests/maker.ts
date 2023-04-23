import { LoginFields } from "../login/page";
import RemoteRepository from "../services/network/RemoteRepository";
import { SignupMakerFields } from "../signup-maker/page";
import { ServerResponse, MakerType } from "./type";

export default abstract class MakerRequests {
  static async createMakerAccount(
    payload: SignupMakerFields
  ): Promise<ServerResponse<MakerType | null>> {
    try {
      const response: ServerResponse<MakerType | null> =
        await RemoteRepository.ns.post("/auth/maker", payload, {});
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

  static async loginMaker(
    payload: LoginFields
  ): Promise<ServerResponse<MakerType | null>> {
    try {
      const response: ServerResponse<MakerType | null> =
        await RemoteRepository.ns.post("/maker/login", payload, {});
      return response;
    } catch (err: any) {
      const pay = {
        message: err.message,
        success: false,
        errors: null,
        body: null,
      };
      return pay;
    }
  }
}
