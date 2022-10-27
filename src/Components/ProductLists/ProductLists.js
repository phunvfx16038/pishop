import Row from "react-bootstrap/Row";
import Product from "../Product/Product";

const ProductLists = ({ products, paginationData }) => {
  //get current product
  const indexOfLastProduct =
    paginationData.currentPage * paginationData.productPerPage;
  const indexOfFirstProduct =
    indexOfLastProduct - paginationData.productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <Row className="g-3 mt-2">
      {currentProducts.length === 0 ? (
        <div style={{ fontSize: "22px", margin: "10px 0" }}>
          Không có sản phẩm !
        </div>
      ) : (
        currentProducts.map((product) => (
          <Product product={product} key={product._id} />
        ))
      )}
    </Row>
  );
};

export default ProductLists;
