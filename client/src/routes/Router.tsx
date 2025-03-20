
import { Route, Routes } from "react-router";
import App from "../App";
import ProductPage from "../pages/ProductListPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="/product" element={<ProductPage/>} />
      </Route>
    </Routes>
  )
}

export default Router
