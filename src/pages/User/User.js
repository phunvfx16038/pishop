import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, sortDown, sortUp } from "../../reduxTK/user/userSlice";
import Form from "react-bootstrap/Form";
import AddCartModal from "../../Components/Modals/AddCartModal";
import { FaEdit, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
const User = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const token = `Bear ${currentUser.accessToken}`;
  const userData = useSelector((state) => state.user.listUser.users);
  const [callModal, setCallModal] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [getId, setGetId] = useState(null);
  const [nameFile, setNameFile] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, token]);

  const handleNavigate = (user) => {
    navigate(`/main/user/profile/${user._id}`, {
      state: {
        user,
      },
    });
  };

  const handleCreateUser = () => {
    navigate("/main/user/createUser");
  };

  const handleDeleteBtn = (id) => {
    setCallModal(true);
    setGetId(id);
    setNameFile("user");
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
    setIsCheck(userData.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleDeleteSelected = () => {
    setCallModal(true);
    setGetId(isCheck);
    setNameFile("manyUser");
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
            style={{ width: "120px", marginTop: "20px" }}
            onClick={handleCreateUser}
          >
            Create User
          </Button>
          <Button
            style={{ margin: "20px 0 0 20px" }}
            onClick={handleDeleteSelected}
            variant="danger"
          >
            Delete Selected
          </Button>
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
                <th>
                  Username
                  <span style={{ position: "relative", padding: "10px" }}>
                    <FaSortUp
                      onClick={() => handleSortUp("userName")}
                      style={{ position: "absolute", top: "25%", left: "28%" }}
                    />
                    <FaSortDown
                      onClick={() => handleSortDown("userName")}
                      style={{ position: "absolute", top: "40%", left: "27%" }}
                    />
                  </span>
                </th>
                <th>Address</th>
                <th>
                  Email
                  <span style={{ position: "relative", padding: "10px" }}>
                    <FaSortUp
                      onClick={() => handleSortUp("email")}
                      style={{ position: "absolute", top: "25%", left: "28%" }}
                    />
                    <FaSortDown
                      onClick={() => handleSortDown("email")}
                      style={{ position: "absolute", top: "40%", left: "27%" }}
                    />
                  </span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={user._id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={handleClickCheckBox}
                      id={user._id}
                      checked={isCheck.includes(user._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.address}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => handleNavigate(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      style={{ marginLeft: "20px" }}
                      variant="danger"
                      onClick={() => handleDeleteBtn(user._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default User;
