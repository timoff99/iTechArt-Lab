import api from "./api.service.js";

export default class AuthService {
  static async signup(email, password) {
    return api.post("auth/signup ", { email, password });
  }

  static async login(email, password) {
    return api.post("auth/login", { email, password });
  }

  static async logout() {
    await api.post("auth/logout");
  }

  static async getUser() {
    await api.get("/user/get-user");
  }
}
