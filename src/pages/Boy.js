import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "reactstrap";
import ProductLists from "../Components/ProductLists/ProductLists";
import PaginationComponent from "../Components/Pagination/index";
import { getAllProducts } from "../Components/ProductLists/productSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";
import Row from "react-bootstrap/esm/Row";
const Boy = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);
  const productList = useSelector((state) => state.product.items.products);
  const skeletonArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const boyProd = productList.filter((product) => {
    return product.categories === "boy";
  });
  const searchResult = boyProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div>
      <Container>
        {boyProd.length !== 0 ? (
          <>
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Sản phẩm cho bé trai
            </h2>
            <ProductLists
              products={search !== "" ? searchResult : boyProd}
              paginationData={paginationData}
            />
            <PaginationComponent
              products={search !== "" ? searchResult : boyProd}
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

export default Boy;
