import { Mail, Home, Airplay, Circle , User , Book } from "react-feather";

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
    icon: <Circle size={20} />,
    navLink: "/AddUser"
  },
  {
    id: "Course",
    title: "مدیریت دوره ",
    icon: <User size={15} />,
    children: [
      {
          id: "CourseList",
          title : "لیست دوره",
          icon : <Circle size={15} />,
          navLink: "/CourseList"

      },
      {
        id: "CreateCourse",
        title: "ساخت دوره",
        icon : <Circle size={15} /> ,
        navLink: "/CreateCourse"
      }
    ],
  },
  {
    id: " News ",
    title : "مدیریت اخبار ها",
    icon : <Book size={15} /> ,
    children : [
        {
          id: "ListOFNews",
          title : "لیست خبر ها" ,
          icon : <Circle size={15} />,
          navLink : "/NewsList"
        }, 
        {
          id : "CreateNews" , 
          title : "اضافه کردن خبر",
          icon : <Circle size={15} />,
          navLink : "/CreateNews" 
        }
    ]
  }
];
