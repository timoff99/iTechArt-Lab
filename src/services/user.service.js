import api from "./api.service.js";

export default class UserService {
  static async getUser() {
    return api.get("user/get-user");
  }
}
