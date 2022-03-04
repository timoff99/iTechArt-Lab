import api from "./api.service.js";

export default class MailService {
  static async forgotPassword(to) {
    return api.post("mail/forgot-password", { to });
  }
}
