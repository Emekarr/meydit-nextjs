import { LoginFields } from "../login/page";
import RemoteRepository from "../services/network/RemoteRepository";
import { SignupFields } from "../signup/page";
import { ServerResponse, UserType } from "./type";

export default abstract class UserRequests {
  static async createAccount(
    payload: SignupFields
  ): Promise<ServerResponse<UserType | null>> {
    try {
      const response: ServerResponse<UserType | null> =
        await RemoteRepository.ns.post("/auth/user", payload, {});
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

  static async loginUser(
    payload: LoginFields
  ): Promise<ServerResponse<UserType | null>> {
    try {
      const response: ServerResponse<UserType | null> =
        await RemoteRepository.ns.post("/user/login", payload, {});
        console.log(response)
        console.log('resss')
      return response;
    } catch (err: any) {
      console.log('start')
      console.log(err)
      console.log(err.message)
      const pay = {
        message: err.message,
        success: false,
        errors: null,
        body: null,
      };
      console.log("here oo", pay)
      return pay;
    }
  }
}
