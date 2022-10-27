import axios from "axios";
import { baseUrl } from "../Data/Url";
const productApi = {
  getSlider: () => {
    axios.get(baseUrl + "products?limit=3").then((res) => {
      const items = res.data.products;
      return items;
    });
  },
};

export default productApi;
