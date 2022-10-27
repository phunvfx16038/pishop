import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPagination } from "../ProductLists/productSlice";

const PaginationComponent = ({ products }) => {
  let items = [];
  const dispatch = useDispatch();
  const paginationData = useSelector((state) => state.product.paginationData);
  // Change page
  const paginate = (pageNumber) => {
    dispatch(
      getPagination({
        ...paginationData,
        active: pageNumber,
        currentPage: pageNumber,
      })
    );
  };

  for (
    let number = 1;
    number <= Math.ceil(products.length / paginationData.productPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        onClick={() => paginate(number)}
        key={number}
        active={number === paginationData.active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
    </div>
  );
};

export default PaginationComponent;
