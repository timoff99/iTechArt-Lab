import api from "./api.service.js";

export default class UserService {
  static async getUser() {
    return api.get("user/get-user");
  }
  static async updateUser(updatedFiled) {
    return api.put("user/update-user", { updatedFiled });
  }
  static async resetPass(newPassword, token) {
    return api.put("user/reset-password", newPassword, token);
  }
  static async updateUserCookBooks(_id) {
    return api.put("user/update-user-cookbooks", { _id });
  }
  static async updateUserRecipes(_id) {
    return api.put("user/update-user-recipes", { _id });
  }
  static async deleteUserCookBookId(_id) {
    return api.delete("user/delete-user-cookbook-id", { data: { _id } });
  }
  static async deleteUserRecipeId(_id) {
    return api.delete("user/delete-user-recipes-id", { data: { _id } });
  }
}
