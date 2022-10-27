import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import PaginationComponent from "../Components/Pagination";
import ProductLists from "../Components/ProductLists/ProductLists";

const Girls = ({ girlsProd }) => {
  const search = useSelector((state) => state.product.search);
  const paginationData = useSelector((state) => state.product.paginationData);

  const searchResult = girlsProd.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Container>
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
      </Container>
    </div>
  );
};

export default Girls;
