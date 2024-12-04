import http from "../interceptor";

export const GetCoursePayment = async (id) => {
  try {
    const res = await http.get(`/CoursePayment?CourseId=${id}`);
    return res;
  } catch (error) {
    console.log(error, "Error getting CoursePayment");
  }
};

export const DeletePaymentApi = async (id) => {
  const formData = new FormData();
  formData.append("PaymentId", id);
  const res = await http.delete("/CoursePayment", { data: formData });
  return res;
};


export const ActivePaymentApi = async (id) => {
  const formData = new FormData();
  formData.append("PaymentId", id);
  const res = await http.put("/CoursePayment/Accept",  formData );
  return res;
};
