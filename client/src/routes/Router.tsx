
import { Route, Routes } from "react-router";
import App from "../App";
import ProductPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="" element={<ProductPage/>} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default Router
