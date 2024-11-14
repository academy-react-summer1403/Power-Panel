// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "../../../../assets/images/avatars/10-small.png";
import { clearStorage, getItem } from "../../../../core/services/common/storage.services";
import { GetUserInfo } from "../../../../core/services/api/userDetail";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserDropdown = () => {
  const [userName, setUserName] = useState([])
  const [userProfile, setUserProfile] = useState([])

const navigate = useNavigate()

const handelLogOut = () => {
  navigate("/login")
  clearStorage()
}

const fetchUserDetail = async () => {
  try {
    const res = await GetUserInfo()
    setUserName(`${res.lName}--${res.fName}`)
    setUserProfile(res)
  } catch (error) {
    toast.error("مشکلی در دریافت اطلاعات کاربر پیش امده")
  }
}

useEffect(() => {
  fetchUserDetail()
}, [])


  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold mb-1">{userName}</span>
          <span className="user-status">{getItem("UserRole")}</span>
        </div>
        <Avatar
          img={
            userProfile?.currentPictureAddress == "Not-set"
              ? defaultAvatar
              : userProfile?.currentPictureAddress
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem>
        <DropdownItem onClick={handelLogOut}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
