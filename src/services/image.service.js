import axios from "axios";

export default class ImageService {
  static async addImage(formData) {
    return axios.post("http://localhost:5000/api/image/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
