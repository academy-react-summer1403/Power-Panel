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
const EditUser = lazy(() => import("../../pages/editUser"));
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
const ReportComments = lazy(() => import("../../pages/ReportComment"))
const CourseLevelList = lazy(() => import("../../pages/CourseLevelList"))
const CreateCourseLevel = lazy(() => import("../../pages/createCourseLevel"))
const EditCourseLevel = lazy(() => import("../../pages/editCourseLevel"))
const UserOpinion = lazy(() => import("../../pages/userOpinion"))
const ListOfBuilding = lazy(() => import("../../pages/ListOfBuilding"))
const CreateBuilding = lazy(() => import("../../pages/CreateBuilding"))
const EditBuilding = lazy(() => import("../../pages/editBuilding"))
const TermList = lazy(() => import("../../pages/TermList"))
const CreateTerm = lazy(() => import("../../pages/CreateTerm"))
const EditTerm = lazy(() => import("../../pages/EditTerm"))
const DepList = lazy(() => import("../../pages/DepartmentList"))
const TechList = lazy(() => import("../../pages/TechnologyList"))
const StatusList = lazy(() => import("../../pages/StatusList"))
const AssistanceWorkList = lazy(() => import("../../pages/AssistanceWorkList"))
const CourseAssistanceList = lazy(() => import("../../pages/CourseAssistanceList"))
const ClassRoomList = lazy(() => import("../../pages/ClassRoomList"))
const CreateDep = lazy(() => import("../../pages/CreateDep"))
const CreateStatus = lazy(() => import("../../pages/CreateStatus"))
const CreateTech = lazy(() => import("../../pages/CreateTech"))
const CreateCourseAsis = lazy(() => import("../../pages/CreateCourseAsis"))
const CreateAssistanceWork = lazy(() => import("../../pages/CreateAssistanceWork"))
const CreateClassRoom = lazy(() => import("../../pages/CreateClassRoom"))
const EditDep = lazy(() => import("../../pages/EditDep"))
const EditStatus = lazy(() => import("../../pages/EditStatus"))
const EditTech = lazy(() => import("../../pages/EditTech"))
const EditClassRoom = lazy(() => import("../../pages/EditClassRoom"))
const EditCourseSocialGroup = lazy(() => import("../../pages/EditCourseSocialGroup"))
const EditAssistanceWork = lazy(() => import("../../pages/EditAssistanceWork"))
const EditCourseAsis = lazy(() => import("../../pages/EditCourseAsis"))
const CourseSocialGroupList = lazy(() => import("../../pages/CourseSocialGroupList"))
const CreateCourseSocial = lazy(() => import("../../pages/CreateCourseSocialGroup"))

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
    path: "/EditUser/:id",
    element: <EditUser/>,
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
    path : "/CourseSocialGroupList",
    element: <CourseSocialGroupList/>
  },
  {
    path : "/CreateCourseSocial",
    element: <CreateCourseSocial/>
  },
  {
    path : "/CreateAssistanceWork",
    element: <CreateAssistanceWork/>
  },
  {
    path : "/EditAssistanceWork/:id",
    element: <EditAssistanceWork/>
  },
  {
    path : "/EditCourseSocialGroup/:id",
    element: <EditCourseSocialGroup/>
  },
  {
    path : "/DepList",
    element: <DepList/>
  },
  {
    path : "/StatusList",
    element: <StatusList/>
  },
  {
    path : "/ClassRoomList",
    element: <ClassRoomList/>
  },
  {
    path : "/TechList",
    element: <TechList/>
  },
  {
    path : "/CourseAssistanceList",
    element: <CourseAssistanceList/>
  },
  {
    path : "/CreateDep",
    element: <CreateDep/>
  },
  {
    path : "/CreateStatus",
    element: <CreateStatus/>
  },
  {
    path : "/CreateTech",
    element: <CreateTech/>
  },
  {
    path : "/CreateCourseAsis",
    element: <CreateCourseAsis/>
  },
  {
    path : "/CreateClassRoom",
    element: <CreateClassRoom/>
  },
  {
    path : "/EditDep/:id",
    element: <EditDep/>
  },
  {
    path : "/EditStatus/:id",
    element: <EditStatus/>
  },
  {
    path : "/EditCourseAsis/:id",
    element: <EditCourseAsis/>
  },
  {
    path : "/EditTech/:id",
    element: <EditTech/>
  },
  {
    path : "/EditClassRoom/:id",
    element: <EditClassRoom/>
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
    path : "/CourseLevelList",
    element: <CourseLevelList/>
  },
  {
    path : "/AssistanceWorkList",
    element: <AssistanceWorkList/>
  },
  {
    path : "/CreateCourseLevel",
    element: <CreateCourseLevel/>
  },
  {
    path: "/TermList",
    element : <TermList/>
  },
  {
    path: "/CreateTerm",
    element : <CreateTerm/>
  },
  {
    path: "/EditTerm/:id",
    element : <EditTerm/>
  },
  {
    path : "/EditCourseLevel/:id",
    element: <EditCourseLevel/>
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
    element: <ReportComments/>,
    path: "/ReportComment"
  },
  {
    element: <UserOpinion/>,
    path: "/UserOpinion"
  },
  {
    element: <ListOfBuilding/>,
    path: "/ListOfBuilding"
  },
  {
    element: <CreateBuilding/>,
    path: "/CreateBuilding"
  },
  {
    element: <EditBuilding/>,
    path: "/EditBuilding/:id"
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
