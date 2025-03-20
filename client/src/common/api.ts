export const baseURL = "https://fakestoreapi.com";

const api = {
  fetchProducts: {
    url: "/products",
    method: "get",
  },
  fetchCategories: {
    url: "/products/categories",
    method: "get",
  },
  fetchProductByCategory:{
    url: "/products/category/:category",
    method: "get",
  },
  fetchProductById:{
    url: "/products",
    method: "get",
  }
};

export default api;
