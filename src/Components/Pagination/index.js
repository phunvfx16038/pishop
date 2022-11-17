import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getOrderPagination } from "../../reduxTK/orders/OrderSlice";
import { getProductPagination } from "../../reduxTK/products/productSlice";
import { getUserPagination } from "../../reduxTK/user/userSlice";

const PaginationComponent = ({ products, type }) => {
  let items = [];
  const dispatch = useDispatch();
  const productPaginationData = useSelector(
    (state) => state.product.paginationData
  );
  const userPaginationData = useSelector((state) => state.user.paginationData);
  const orderPaginationData = useSelector(
    (state) => state.order.paginationData
  );
  const paginationData =
    type === "product"
      ? productPaginationData
      : type === "user"
      ? userPaginationData
      : type === "order"
      ? orderPaginationData
      : {};
  // Change page
  const paginate = (pageNumber) => {
    if (type === "product") {
      dispatch(
        getProductPagination({
          ...productPaginationData,
          active: pageNumber,
          currentPage: pageNumber,
        })
      );
    }
    if (type === "user") {
      dispatch(
        getUserPagination({
          ...userPaginationData,
          active: pageNumber,
          currentPage: pageNumber,
        })
      );
    }
    if (type === "order") {
      dispatch(
        getOrderPagination({
          ...orderPaginationData,
          active: pageNumber,
          currentPage: pageNumber,
        })
      );
    }
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
