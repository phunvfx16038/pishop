import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import PaginationComponent from "../Components/Pagination";
import ProductLists from "../Components/ProductLists/ProductLists";

const Men = ({ menProd }) => {
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);

  const searchResult = menProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Container>
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
      </Container>
    </div>
  );
};

export default Men;
