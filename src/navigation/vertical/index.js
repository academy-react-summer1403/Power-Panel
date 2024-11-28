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
      {
        id: "AllUserComment",
        title: "کامنت های خودم",
        icon: <Circle size={15} />,
      }
    ],
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
      }
    ]
  }
];
