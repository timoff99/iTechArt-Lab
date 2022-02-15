import api from "./api.service.js";

export default class CookBookService {
  static async addCookBook(cookbookData) {
    return api.post("cookbook/create", cookbookData);
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
  static async updateCookBookViews(_id) {
    return api.put("cookbook/update-views", { _id });
  }
  static async deleteCookBook() {
    await api.delete("cookbook/delete", { _id });
  }
}
