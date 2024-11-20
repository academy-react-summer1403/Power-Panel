// ** React Imports
import { Children, Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Home = lazy(() => import("../../pages/Dashboard"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const AddUser = lazy(() => import("../../pages/AddUser"));
const CoursePage = lazy(() => import("../../pages/CourseListPage"))
const CreateCourse = lazy(() => import("../../pages/CreateCourse"))
const EditCourse = lazy(() => import("../../pages/EditCourse"))
const NewsList = lazy(() => import("../../pages/NewsList"))
const CreateNews = lazy(() => import("../../pages/CreateNews"))
const CreateCourseCategory = lazy(() => import("../../pages/CreateCourseCat"));
const CourseCat = lazy(() => import("../../pages/CourseCatList"))
const EditCourseCat = lazy(() => import("../../pages/EditCourseGroup"))
const CreateNewsCat = lazy(() => import("../../pages/AddNewsCat"))
const NewsCatList = lazy(() => import("../../pages/NewsCatList"))
const UserDetail = lazy(() => import("../../pages/userDeatil"))
const ManageAllComments = lazy(() => import("../../pages/AllComment"))
const EditNews = lazy(() => import("../../pages/EditNews"))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/Dashboard",
    element: <Home />,
  },
  {
    path: "/AddUser",
    element: <AddUser/>,
  },
  {
    path:"/UseInfo/:id",
    element: <UserDetail/>,
  },
  {
    path: "/CreateNews",
    element: <CreateNews />
  },
  {
    path : "/CourseList",
    element: <CoursePage /> ,
  },
  {
    path : "/CreateCourse",
    element: <CreateCourse/>
  },
  {
    path : "/EditCourse/:id",
    element: <EditCourse/>
  },
  {
    path:"/courseCatEdit/:id",
    element: <EditCourseCat/>
  },
  {
    path : "/CourseCat",
    element: <CourseCat/>
  },
  {
    path : "/CreateCourseCat",
    element: <CreateCourseCategory/>
  },
  {
    path : "/NewsCatList",
    element: <NewsCatList/>
  },
  {
    path : "/CreateNewsCat",
    element: <CreateNewsCat/>
  },
  {
    path : "/NewsList" , 
    element : <NewsList />
  },
  {
    path : "/AllUserComment" , 
    element : <ManageAllComments />
  },
  {
    element: <ManageAllComments />,
    path: "/AllUserComment/:folder",
  },
  {
    element: <ManageAllComments />,
    path: "/AllUserComment/label/:label",
  },
  {
    element: <ManageAllComments />,
    path: "/AllUserComment/:filter",
  },
  {
    element : <EditNews/> ,
    path :"/EditNews/:id"
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
