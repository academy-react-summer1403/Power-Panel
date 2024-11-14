import * as yup from "yup";

export const courseGroupVal = yup.object().shape({
  groupName: yup.string().required("این فیلد الزامی می باشد"),
  groupCapacity: yup
    .number()
    .min(1, "ظرفیت گروه بین 1 الی 100 می باشد !")
    .max(100, "ظرفیت گروه بین 1 الی 100 می باشد !"),
  courseId: yup
    .object({
      label: yup.string().required("این فیلد الزامی می باشد"),
      value: yup.string().required("این فیلد الزامی می باشد"),
    })
    .required("این فیلد الزامی می باشد"),
});

export const createCourseStepOneVal = yup.object().shape({
  title: yup.string().required("این فیلد الزامی می باشد"),
  cost: yup
    .number()
    .min(1000, "قیمت دوره نمیتواند از 1000 تومان کمتر باشد")
    .required("این فیلد الزامی می باشد"),
  capacity: yup.number().required("این فیلد الزامی می باشد"),
  sessionNumber: yup.number().required("این فیلد الزامی می باشد"),
  miniDescribe: yup.string().required("این فیلد الزامی می باشد"),
});


export const createCourseStepTwoVal = yup.object().shape({
  googleTitle: yup.string().required("این فیلد الزامی می باشد"),
  googleSchema: yup.string().required("این فیلد الزامی می باشد"),
  uniqueUrlString: yup.string().required("این فیلد الزامی می باشد"),
  shortLink: yup.string().required("این فیلد الزامی می باشد"),
});

export const createCourseStepThreeVal = yup.object().shape({
  courseType: yup
    .object()
    .shape({
      id: yup.number(),
      typeName: yup.string(),
      insertDate: yup.string(),
    })
    .required("این فیلد الزامی می باشد"),
  teacherId: yup
    .object()
    .shape({
      courseCounts: yup.number(),
      fullName: yup.string().nullable(),
      linkdinProfileLink: yup.string().nullable(),
      newsCount: yup.number(),
      pictureAddress: yup.string().nullable(),
      teacherId: yup.number(),
    })
    .required("این فیلد الزامی می باشد"),
  classIdState: yup
    .object()
    .shape({
      buildingId: yup.number(),
      buildingName: yup.string().nullable(),
      capacity: yup.number(),
      classRoomName: yup.string(),
      id: yup.number(),
      insertDate: yup.string(),
    })
    .required("این فیلد الزامی می باشد"),
  termId: yup
    .object()
    .shape({
      departmentId: yup.number(),
      departmentName: yup.string().nullable(),
      endDate: yup.string(),
      expire: yup.boolean(),
      id: yup.string(),
      insertDate: yup.string(),
      startDate: yup.string(),
      termName: yup.string(),
    })
    .required("این فیلد الزامی می باشد"),
});
