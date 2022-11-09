import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import PaginationComponent from "../Components/Pagination";
import ProductLists from "../Components/ProductLists/ProductLists";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";
import Row from "react-bootstrap/esm/Row";
import { getAllProducts } from "../Components/ProductLists/productSlice";
const Girls = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.items.products);
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);
  const skeletonArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const girlsProd = productList.filter((product) => {
    return product.categories === "girl";
  });
  const searchResult = girlsProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div>
      <Container>
        {girlsProd.length !== 0 ? (
          <>
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Sản phẩm cho bé gái
            </h2>
            <ProductLists
              products={search !== "" ? searchResult : girlsProd}
              paginationData={paginationData}
            />
            <PaginationComponent
              products={search !== "" ? searchResult : girlsProd}
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

export default Girls;
