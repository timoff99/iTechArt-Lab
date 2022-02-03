import api from "./api.service.js";

export default class AuthService {
  static async signup(email, password) {
    const token = api.post("/signup ", { email, password });
    Cookie.set("token", token);
  }

  static async login(email, password) {
    const token = await api.post("/login", { email, password });
    Cookie.set("token", token);
  }

  static async logout() {
    return api.post("/logout");
  }
}
