// ** React Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useSkin } from "@hooks/useSkin";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, GitHub, Mail, Twitter } from "react-feather";

// Core Imports
import { ApiLogin } from "../core/services/api/Auth";
import { getItem, setItem } from "../core/services/common/storage.services";
import { LoginVal } from "../core/Validation/auth";

// ** Custom Components
import InputPasswordToggle from "../@core/components/input-password-toggle";
import ErrorMessage from "../@core/components/error-message";

// ** Reactstrap Imports
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const {
      register,
      handleSubmit,
      control,
      formState: { errors },
  } = useForm({
      resolver: yupResolver(LoginVal),
  });

  const onSubmit = async (data) => {
      try {
          const loginUser = await ApiLogin(data);

          if (loginUser.success) {
              if (loginUser.roles.includes("Administrator") || loginUser.roles.includes("Teacher")) {
                  toast.success("با موفقیت وارد شدید !");

                  setItem("token", loginUser.token);
                  setItem("userId", loginUser.id);
                  setItem("UserRole", loginUser.roles);
                  setItem("loginTime", new Date().toISOString());

                  navigate("/Dashboard");
              } else {
                  toast.error("شما دسترسی ورود به پنل ادمین را ندارید !");
              }
          } else {
              toast.error("کاربری با اطلاعات شما وجود ندارد !");
          }
      } catch (error) {
          toast.error("مشکلی در فرایند ورود به وجود آمد !");
      }
  };

  useEffect(() => {
    const currentTime = new Date().getTime();
  
    const lastClearTime = localStorage.getItem("lastClearTime");
    if (lastClearTime) {
      const hoursSinceLastClear = (currentTime - parseInt(lastClearTime)) / (1000 * 60 * 60);
      if (hoursSinceLastClear >= 2) {
        localStorage.clear();
      }
    } else {
      localStorage.setItem("lastClearTime", currentTime.toString());
    }
    localStorage.setItem("lastClearTime", currentTime.toString());
  
  }, []);
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Power</h2>
        </Link>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به پنل ادمین خوش آمدید 👋
            </CardTitle>
            <CardText className="mb-2">
              برای ورود به پنل ادمین باید وارد سایت شوید !
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit((data) => onSubmit(data))}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل
                </Label>
                <Controller
                  id="login-email"
                  name="phoneOrGmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="شماره موبایل یا جیمیل"
                      invalid={errors.phoneOrGmail && true}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage>{errors?.phoneOrGmail?.message}</ErrorMessage>
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز عبور
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  invalid={errors.password && true}
                  {...register("password")}
                />
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </div>
              <div className="form-check mb-1">
                <Controller
                  id="rememberMe"
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Input type="checkbox" id="rememberMe" {...field} />
                  )}
                />
                <Label className="form-check-label" for="rememberMe">
                  مرا به خاطر بسپار
                </Label>
              </div>
              <Button color="primary" block>
                ورود
              </Button>
            </Form>
            <p className="text-center mt-1">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
