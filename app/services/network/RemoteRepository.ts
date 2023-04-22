import NetworkService from ".";

export default abstract class RemoteRepository {
  public static ns = new NetworkService("https://api.bluemize.com/api/v1");
}
