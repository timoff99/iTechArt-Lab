import api from "./api.service.js";

export default class ImageService {
  static async addImage(formData) {
    return api.post("image/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
