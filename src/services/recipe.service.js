import api from "./api.service.js";

export default class RecipeService {
  static async addRecipe(recipesData) {
    return api.post("recipe/create", recipesData);
  }

  static async getAllRecipes() {
    return api.get("recipe/get-all");
  }
  static async getUserRecipes() {
    return api.get("recipe/get-user-recipes");
  }
  static async getRecipe(_id) {
    return api.request({
      method: "GET",
      url: "recipe/get",
      params: { _id },
    });
  }
  static async getRecipeWithoutCookBook() {
    return api.get("recipe/get-recipe-without-cookbook");
  }
  static async updateRecipeCookBookId(ids, cookbook_id) {
    return api.put("recipe/update-recipe-cookbookid", { ids, cookbook_id });
  }
  static async updateRecipe(_id) {
    return api.put("recipe/update", { _id });
  }
  static async updateRecipeViews(_id) {
    return api.put("recipe/update-views", { _id });
  }
  static async deleteRecipe(_id) {
    await api.delete("recipe", { _id });
  }
}
