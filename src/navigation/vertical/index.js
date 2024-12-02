import {
  Mail,
  Home,
  Airplay,
  Circle,
  User,
  Book,
  UserPlus,
  Code,
  MessageCircle,
  MoreVertical,
  ShoppingBag,
} from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/Dashboard",
  },
  {
    id: "AddUser",
    title: "اضافه کردن کاربر",
    icon: <UserPlus size={20} />,
    navLink: "/AddUser",
  },
  {
    id: "Course",
    title: "مدیریت دوره ",
    icon: <Code size={15} />,
    children: [
      {
        id: "CourseList",
        title: "لیست دوره",
        icon: <Circle size={15} />,
        navLink: "/CourseList",
      },
      {
        id: "CreateCourse",
        title: "ساخت دوره",
        icon: <Circle size={15} />,
        navLink: "/CreateCourse",
      },
      {
        id: "CreateTerm",
        title: "افزودن فصل",
        icon: <Circle size={15} />,
        navLink: "/CreateTerm",
      },
      {
        id: "TermList",
        title: "لسیت فصل ها",
        icon: <Circle size={15} />,
        navLink: "/TermList",
      },
      {
        id: "CourseLevel",
        title: "لیست لول دوره ها",
        icon: <Circle size={15} />,
        navLink: "/CourseLevelList",
      },
      {
        id: "CreateCourseLevel",
        title: "ساخت لول جدید",
        icon: <Circle size={15} />,
        navLink: "/CreateCourseLevel",
      },
      {
        id: "CourseCat",
        title: "لیست کتگوری ها",
        icon: <Circle size={15} />,
        navLink: "/CourseCat",
      },
      {
        id: "CreateCourseCat",
        title: "ساخت کتگوری",
        icon: <Circle size={15} />,
        navLink: "/CreateCourseCat",
      },
      {
        id: "TechList",
        title: "لیست تکنولوژی",
        icon: <Circle size={15} />,
        navLink: "/TechList",
      },
      {
        id: "CreateTech",
        title: "اضافه کردن تکنولوژی",
        icon: <Circle size={15} />,
        navLink: "/CreateTech",
      },
      {
        id: "StatusList",
        title: " لیست وعضیت",
        icon: <Circle size={15} />,
        navLink: "/StatusList",
      },
      {
        id: "CreateStatus",
        title: " اضافه کردن وعضیت",
        icon: <Circle size={15} />,
        navLink: "/CreateStatus",
      },
      {
        id: "CourseAssistanceList",
        title: " لیست کمک دوره",
        icon: <Circle size={15} />,
        navLink: "/CourseAssistanceList",
      },
      {
        id: "CreateCourseAsis",
        title: " اضافه کردن کمک دوره",
        icon: <Circle size={15} />,
        navLink: "/CreateCourseAsis",
      },
      {
        id: "CourseSocialGroupList",
        title: "گروه اجتمهاعی دوره",
        icon: <Circle size={15} />,
        navLink: "/CourseSocialGroupList",
      },
      {
        id: "CreateCourseSocial",
        title: " اضافه کردن گروه اجتمهاعی دوره",
        icon: <Circle size={15} />,
        navLink: "/CreateCourseSocial",
      },
    ],
  },
  {
    id: " News ",
    title: "مدیریت اخبار ها",
    icon: <Book size={15} />,
    children: [
      {
        id: "ListOFNews",
        title: "لیست خبر ها",
        icon: <Circle size={15} />,
        navLink: "/NewsList",
      },
      {
        id: "CreateNews",
        title: "اضافه کردن خبر",
        icon: <Circle size={15} />,
        navLink: "/CreateNews",
      },
      {
        id: "CatList",
        title: "لیست کتگوری ها",
        icon: <Circle size={15} />,
        navLink: "/NewsCatList",
      },
      {
        id: "CreateNewsCat",
        title: "ساخت کتگوری خبر",
        icon: <Circle size={15} />,
        navLink: "/CreateNewsCat",
      },
    ],
  },
  {
    id: "Comment",
    title: "مدیرت کامنت",
    icon: <MessageCircle size={15} />,
    children: [
      {
        id: "AllUserComment",
        title: "کامنت های کاربران",
        icon: <Circle size={15} />,
        navLink: "/AllUserComment",
      },
    ],
  },
  {
    id: "Work",
    title: "مدریت کار ها",
    icon: <ShoppingBag size={15} />,
    children: [
        {
          id: "AssistanceWorkList",
          title: "لیست کارهای کمکی",
          icon: <Circle size={15}/>,
          navLink: "/AssistanceWorkList"
        },
        {
          id: "CreateAssistanceWork",
          title: "افضودن کاره کمکی",
          icon: <Circle size={15}/>,
          navLink: "/CreateAssistanceWork"
        },
    ]
  },
  {id: "Building",
    title: "مدیریت ساختمان ها و ...",
    icon : <Home />,
    children: [
            {
              id: "ListOfBuilding",
              title: "لیسات ساختمان ها",
              icon: <Circle size={15} />,
              navLink :"/ListOfBuilding"
            },
            {
              id: "CreateBuilding",
              title: "اضافه کردن ساختمان",
              icon: <Circle size={15} />,
              navLink :"/CreateBuilding"
            },
            {
              id: "CreateDep",
              title: "اضافه کردن بخش",
              icon: <Circle size={15} />,
              navLink :"/CreateDep"
            },
            {
              id: "DepList",
              title: "لیست بخش",
              icon: <Circle size={15} />,
              navLink :"/DepList"
            },
            {
              id: "ClassRoomList",
              title: "لیست کلاس ها",
              icon: <Circle size={15} />,
              navLink :"/ClassRoomList"
            },
            {
              id: "CreateClassRoom",
              title: "اضافه کردن کلاس",
              icon: <Circle size={15} />,
              navLink :"/CreateClassRoom"
            },
    ]
  },
  {
    id: "More",
    title: "موارد دیگر",
    icon: <MoreVertical size={15} />,
    children: [
      {
        id: "ReportComment",
        title: "گزارش کامنت" ,
        icon: <Circle size={15} />,
        navLink: "/ReportComment",
      },
      {
        id: "UserOpinion",
        title: "نظرات کاربران" ,
        icon: <Circle size={15} />,
        navLink: "/UserOpinion",
      }
    ]
  }
];
