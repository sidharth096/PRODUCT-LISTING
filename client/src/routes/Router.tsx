
import { Route, Routes } from "react-router";
import App from "../App";
import ProductPage from "../pages/ProductPage";
import SearchPage from "../pages/SearchPage";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="/product" element={<ProductPage/>} />
        <Route path="/search" element={<SearchPage/>} />
      </Route>
    </Routes>
  )
}

export default Router
