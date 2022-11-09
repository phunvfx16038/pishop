import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import PaginationComponent from "../Components/Pagination";
import ProductLists from "../Components/ProductLists/ProductLists";
import { getAllProducts } from "../Components/ProductLists/productSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";
import Row from "react-bootstrap/esm/Row";
const Men = () => {
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.items.products);
  const menProd = productList.filter((product) => {
    return product.categories === "men";
  });
  const searchResult = menProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });
  const skeletonArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Container>
        {menProd.length !== 0 ? (
          <>
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Sản phẩm cho nam
            </h2>
            <ProductLists
              products={search !== "" ? searchResult : menProd}
              paginationData={paginationData}
            />
            <PaginationComponent
              products={search !== "" ? searchResult : menProd}
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

export default Men;
