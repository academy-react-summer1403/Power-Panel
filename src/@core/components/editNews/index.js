// ** React Imports
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Custom Components
import Wizard from "../wizard";

// ** Steps
import Describe from "../CreateNews/steps/Describe";
import GlobalData from "../CreateNews/steps/GlobalData";

// ** Core Imports
import { GetNewsById } from "../../../core/services/api/NewsApi";

// ** Utils
import { onFormData } from "../../../utility/DataHelper";
import { UpdateNews } from "../../../core/services/api/NewsApi";
import { Button } from "reactstrap";

const Edit = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [news, setNews] = useState();
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [describe, setDescribe] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = {
      id,
      image: (files && files[0]) || news.imageAddress,
      tumbImage: (files && files[0]) || news.imageAddress,
      imageAddress: (files && files[0]) || news.imageAddress,
      describe: describe || news.describe,
      active: true,
      ...updatedData,
    };

    try {
      setLoading(true);

      const formData = onFormData(data);
      const editBlog = await UpdateNews(formData);

      if (editBlog.success) {
        toast.success("خبر با موفقیت ویرایش شد !");

        navigate("/news");
      } else toast.error(editBlog.message);
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در ویرایش خبر به وجود آمد !");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی خبر",
      content: (
        <GlobalData
          stepper={stepper}
          news={news}
          files={files}
          setFiles={setFiles}
          setUpdatedData={setUpdatedData}
        />
      ),
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات خبر",
      content: (
        <Describe
          stepper={stepper}
          setDescribe={setDescribe}
          describe={describe}
          onSubmit={onSubmit}
          defaultValue={news?.describe}
          isLoading={isLoading}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const getNews = await GetNewsById(id);

        setNews(getNews.detailsNewsDto);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات خبر به وجود آمد !");
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="horizontal-wizard">
      <Button
        block
        color="dark"
        outline
        style={{ margin: "15px" }}
        tag={Link}
        to="/NewsList"
      >
        {" "}
        بازشگت به لیست{" "}
      </Button>
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default Edit;
