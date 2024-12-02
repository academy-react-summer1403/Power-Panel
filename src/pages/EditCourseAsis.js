import { useParams } from "react-router-dom";
import CourseAssistanceForm from "../@core/components/CourseAssistanceForm";
import { useEffect, useState } from "react";
import { GetCourseAssistanceById } from "../core/services/api/CourseAssistanceApi";


const EditCourseAsis = () => {
  const [Data, setData] = useState(null)
  const params = useParams()

  console.log(params)

  const fetchCourseAsisById = async () => {
    const res =await GetCourseAssistanceById(params.id)
    if(res){
      setData(res.courseAssistanceDto)
    }
  }

  useEffect(() => {
    fetchCourseAsisById()
  }, [])
  

  return <CourseAssistanceForm Data={Data} />;
};

export default EditCourseAsis;