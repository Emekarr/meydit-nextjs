import NetworkService from ".";

export default abstract class RemoteRepository {
  public static ns = new NetworkService("http://127.0.0.1:3333/api/v1");
}
