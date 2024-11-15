// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** User View Components
import UserInfoCard from "../@core/components/UserDetails/info";

// ** Core Imports
import { getUserById } from "../core/services/api/userDetail";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserDetail = () => {
  // ** States
  const [user, setUser] = useState();

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const getUser = await getUserById(id);

        setUser(getUser);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات کاربر به وجود آمد !");
      }
    };

    fetchUser();
  }, []);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="12" lg="12" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard user={user} />
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
