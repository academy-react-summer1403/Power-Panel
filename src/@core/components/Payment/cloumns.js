// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { ActivePaymentApi, DeletePaymentApi } from "../../../core/services/api/PaymentApi";

const handleDeletePayment = async (id) => {
  try {
    const res = await DeletePaymentApi(id);
    if (res.success) {
      toast.success("پرداخت با موفقیت حذف شد.");
    } else {
      toast.error("حذف پرداخت ناموفق بود.");
    }
  } catch (error) {
    console.error("خطا در حذف پرداخت:", error);
    toast.error("خطا در حذف پرداخت.");
  }
};


const handleChangePaymentActive = async (id) => {
  try {
    const res = await ActivePaymentApi(id);
    if (res.success) {
      toast.success("پرداخت با موفقیت حذف شد.");
    } else {
      toast.error("حذف پرداخت ناموفق بود.");
    }
  } catch (error) {
    console.error("خطا در حذف پرداخت:", error);
    toast.error("خطا در حذف پرداخت.");
  }
};

const handleDelete = (id) => {
  Swal.fire({
    title: "از حذف این رزرو مطمئنی؟",
    text: "این عمل غیرقابل بازگشت است!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله، حذف کن!",
    cancelButtonText: "خیر، انصراف",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDeletePayment(id);
    }
  });
};
const handleActiveChange = (id) => {
  Swal.fire({
    title: "آیا مطمئن هستید؟",
    text: "آیا می‌خواهید این تغییر را انجام دهید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله، حذف کن!",
    cancelButtonText: "خیر، انصراف",
  }).then((result) => {
    if (result.isConfirmed) {
      handleChangePaymentActive(id);
    }
  });
};

// ** Table columns
export const PaymentColumns = [
  {
    name: "عکسه پیمینت",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <img
            style={{ width: "100px", height: "50px", borderRadius: "35px" }}
            alt={row.studentName}
            src={row.paymentInvoiceImage}
          />
        </div>
      );
    },
  },
  {
    name: "نام کاربر",
    sortable: true,
    minWidth: "250px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <span> {row.studentName} </span>
        </div>
      );
    },
  },
  {
    name: "قیمت",
    sortable: true,
    minWidth: "150px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <span> {row.paid} </span>
        </div>
      );
    },
  },
  {
    name: "نام",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <span> {row.groupName} </span>
        </div>
      );
    },
  },
  {
    name: "وضعیت",
    sortable: true,
    minWidth: "280px",
    sortField: "client.name",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <span onClick={() => handleActiveChange(row.id)}> {row.accept ? "قبول" : "قبول نشده"} </span>
        </div>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "110px",
    cell: (row) => {
      return (
        <div className="column-action d-flex align-items-center">
          {row.accept ? (
            ""
          ) : (
            <Button
              color="danger"
              size="sm"
              onClick={() => handleDelete(row.id)}
            >
              حذف
            </Button>
          )}
        </div>
      );
    },
  },
];
