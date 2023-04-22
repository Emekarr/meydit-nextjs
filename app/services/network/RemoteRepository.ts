import NetworkService from ".";

export default abstract class RemoteRepository {
  public static ns = new NetworkService("http://localhost:3333/api/v1");
}
