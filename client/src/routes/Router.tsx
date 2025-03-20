
import { Route, Routes } from "react-router";
import App from "../App";
import ProductPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="/product" element={<ProductPage/>} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />
      </Route>
    </Routes>
  )
}

export default Router
