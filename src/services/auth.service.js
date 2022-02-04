import api from "./api.service.js";

export default class AuthService {
  static async signup(email, password) {
    return api.post("/signup ", { email, password });
  }

  static async login(email, password) {
    return api.post("/login", { email, password });
  }

  static async logout() {
    await api.post("/logout");
  }
}
