import { useEffect } from "react";
import { Container } from "reactstrap";
import ProductLists from "../Components/ProductLists/ProductLists";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../Components/Pagination";
import { getAllProducts } from "../Components/ProductLists/productSlice";
import Row from "react-bootstrap/esm/Row";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";

const Women = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);
  const productList = useSelector((state) => state.product.items.products);
  const womenProd = productList.filter((product) => {
    return product.categories === "women";
  });
  const searchResult = womenProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });
  const skeletonArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Container>
        {womenProd.length !== 0 ? (
          <>
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Sản phẩm dành cho nữ
            </h2>
            <ProductLists
              products={search !== "" ? searchResult : womenProd}
              paginationData={paginationData}
            />
            <PaginationComponent
              products={search !== "" ? searchResult : womenProd}
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

export default Women;
