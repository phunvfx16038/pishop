import ProductLists from "../Components/ProductLists/ProductLists";
import Slider from "../Components/Slider/Slider";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Components/ProductLists/productSlice";
import { useEffect } from "react";
import PaginationComponent from "../Components/Pagination";
const Home = ({ productList }) => {
  const sliderProduct = useSelector((state) => state.product.items.slide);
  const search = useSelector((state) => state.product.search);
  const dispatch = useDispatch();
  const paginationData = useSelector((state) => state.product.paginationData);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const searchResult = productList.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Slider sliderItem={sliderProduct} />
      <Container>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Danh sách sản phẩm
        </h2>
        <ProductLists
          products={search !== "" ? searchResult : productList}
          paginationData={paginationData}
        />
        <PaginationComponent
          products={search !== "" ? searchResult : productList}
        />
      </Container>
    </div>
  );
};

export default Home;
