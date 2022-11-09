import ProductLists from "../Components/ProductLists/ProductLists";
import Slider from "../Components/Slider/Slider";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Components/ProductLists/productSlice";
import { useEffect } from "react";
import PaginationComponent from "../Components/Pagination";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";
import Row from "react-bootstrap/esm/Row";
import SkeletonSlide from "../Components/SkeletonCard/SkeletonSlide";
const Home = () => {
  const sliderProduct = useSelector((state) => state.product.items.slide);
  const productList = useSelector((state) => state.product.items.products);
  const search = useSelector((state) => state.product.search);
  const dispatch = useDispatch();
  const paginationData = useSelector((state) => state.product.paginationData);
  const skeletonArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const searchResult = productList.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      {sliderProduct.length !== 0 ? (
        <Slider sliderItem={sliderProduct} />
      ) : (
        <SkeletonSlide />
      )}
      <Container>
        {productList.length !== 0 ? (
          <>
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
          </>
        ) : (
          <Row>
            <Skeleton
              width={300}
              height={30}
              style={{ textAlign: "center", marginTop: "50px" }}
            />
            {skeletonArr.map((item, index) => (
              <SkeletonCard key={index} />
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
