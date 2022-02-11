import api from "./api.service.js";

export default class CookBookService {
  static async addCookBook(title, description, image, recipes) {
    return api.post("cookbook/create", { title, description, image, recipes });
  }
  static async getAllCookBooks() {
    return api.get("cookbook/get-all");
  }
  static async getUserCookBooks() {
    return api.get("cookbook/get-user-cookbooks");
  }
  static async getCookBook(_id) {
    return api.request({
      method: "GET",
      url: "cookbook/get",
      params: { _id },
    });
  }
  static async updateCookBook(_id) {
    return api.put("cookbook/update", { _id });
  }
  static async deleteCookBook() {
    await api.delete("cookbook/delete", { _id });
  }
}
