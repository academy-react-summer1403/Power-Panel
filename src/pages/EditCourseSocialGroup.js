import { useParams } from "react-router-dom";
import CreateCourseSocialForm from "../@core/components/CreateCourseSocialForm";
import { GetCourseSocialGroupById } from "../core/services/api/CourseSocialGroupApi";
import { useEffect, useState } from "react";

const EditCourseSocialGroup = () => {
  const [Data, setData] = useState(null)
  const params = useParams()

  console.log(params)

  const fetchCourseSocialGroupById = async () => {
    const res =await GetCourseSocialGroupById(params.id)
    if(res){
      setData(res)
    }
  }

  useEffect(() => {
    fetchCourseSocialGroupById()
  }, [])

  if (!Data) {
    return <div>در حال بارگذاری...</div>; 
  }



  return <CreateCourseSocialForm Data={Data} />;
};

export default EditCourseSocialGroup;