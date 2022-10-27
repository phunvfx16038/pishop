import { Container } from "reactstrap";
import ProductLists from "../Components/ProductLists/ProductLists";
import { useSelector } from "react-redux";
import PaginationComponent from "../Components/Pagination";

const Women = ({ womenProd }) => {
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);

  const searchResult = womenProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Container>
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
      </Container>
    </div>
  );
};

export default Women;
