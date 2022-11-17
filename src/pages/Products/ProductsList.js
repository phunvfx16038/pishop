import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCartModal from "../../Components/Modals/AddCartModal";
import {
  getProducts,
  resetData,
  sortDown,
  sortUp,
} from "../../reduxTK/products/productSlice";
import { FaEdit, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
import PaginationComponent from "../../Components/Pagination";
const ProductsList = () => {
  const currentUser = useSelector((state) => state.auth.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(
    (state) => state.product.getProducts.products
  );
  const paginationData = useSelector((state) => state.product.paginationData);
  const [callModal, setCallModal] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [getId, setGetId] = useState(null);
  const [nameFile, setNameFile] = useState(null);

  const resetUpdated = {};

  //get last index of pagination
  const indexOfLastProduct =
    paginationData.currentPage * paginationData.productPerPage;

  //get first index of pagination
  const indexOfFirstProduct =
    indexOfLastProduct - paginationData.productPerPage;

  //current product of pagination
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleNavigate = (product) => {
    dispatch(resetData(resetUpdated));
    navigate(`/main/products/detail/${product._id}`, {
      state: {
        product,
      },
    });
  };
  const handleDeleteBtn = (id) => {
    setCallModal(true);
    setGetId(id);
    setNameFile("product");
  };

  const handleCreate = () => {
    dispatch(resetData(resetUpdated));
    navigate(`/main/products/newProduct`);
  };

  const handleClickCheckBox = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(productList.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleDeleteSelected = () => {
    setCallModal(true);
    setGetId(isCheck);
    setNameFile("manyProduct");
  };

  const handleSortUp = (type) => {
    dispatch(sortUp(type));
  };

  const handleSortDown = (type) => {
    dispatch(sortDown(type));
  };

  return (
    <div>
      <Row>
        <Col xs={12}>
          <Button
            onClick={handleCreate}
            style={{ width: "120px", marginTop: "20px" }}
          >
            New Product
          </Button>
          <Button
            onClick={handleDeleteSelected}
            style={{ margin: "20px 0 0 20px" }}
            variant="danger"
          >
            Delete Selected
          </Button>
          {currentProducts.length !== 0 ? (
            <>
              <Table striped>
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        type="checkbox"
                        onChange={handleSelectAll}
                        id="checkAll"
                        checked={isCheckAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Image</th>
                    <th>
                      Title
                      <span style={{ position: "relative", padding: "10px" }}>
                        <FaSortUp
                          onClick={() => handleSortUp("title")}
                          style={{
                            position: "absolute",
                            top: "25%",
                            left: "28%",
                          }}
                        />

                        <FaSortDown
                          onClick={() => handleSortDown("title")}
                          style={{
                            position: "absolute",
                            top: "40%",
                            left: "28%",
                          }}
                        />
                      </span>
                    </th>
                    <th>
                      Price
                      <span style={{ position: "relative", padding: "10px" }}>
                        <FaSortUp
                          onClick={() => handleSortUp("price")}
                          style={{
                            position: "absolute",
                            top: "25%",
                            left: "28%",
                          }}
                        />
                        <FaSortDown
                          onClick={() => handleSortDown("price")}
                          style={{
                            position: "absolute",
                            top: "40%",
                            left: "27%",
                          }}
                        />
                      </span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          onChange={handleClickCheckBox}
                          id={product._id}
                          checked={isCheck.includes(product._id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <div style={{ width: "50px", height: "50px" }}>
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => handleNavigate(product)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          style={{ marginLeft: "20px" }}
                          variant="danger"
                          onClick={() => handleDeleteBtn(product._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationComponent products={productList} type="product" />
            </>
          ) : (
            <div>Chưa có sản phẩm nào</div>
          )}
        </Col>
      </Row>
      <AddCartModal
        callModal={callModal}
        close={() => setCallModal(false)}
        token={token}
        id={getId}
        nameFile={nameFile}
      />
    </div>
  );
};

export default ProductsList;
