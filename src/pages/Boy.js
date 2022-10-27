import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import ProductLists from "../Components/ProductLists/ProductLists";
import PaginationComponent from "../Components/Pagination/index";

const Boy = ({ boyProd }) => {
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);

  const searchResult = boyProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Container>
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
      </Container>
    </div>
  );
};

export default Boy;
