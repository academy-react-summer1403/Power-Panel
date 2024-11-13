// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Custom Components
import EditeCourseGroup from "../@core/components/CourseGroupEdite";

// ** Core Imports
import { getCourseGroupDetailsAPI } from "../core/services/api/getCourseGroupDetailsAPI";

const EditCourseGroupPage = () => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseGroup = async () => {
      try {
        const getCourseGroup = await getCourseGroupDetailsAPI(id);

        setCourseGroup(getCourseGroup.courseGroupDto);
      } catch (error) {
        return false;
      }
    };

    fetchCourseGroup();
  }, []);

  return <EditeCourseGroup group={courseGroup} />;
};

export default EditCourseGroupPage;
