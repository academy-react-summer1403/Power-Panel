// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { GetNewsCatApi } from "../core/services/api/NewsApi";

// ** Columns
import { CATEGORY_COLUMNS } from "../@core/components/NewsCatList/CatColumns";

// ** Custom Components
import CategoriesTable from "../@core/components/NewsCatList/CatTable";

const NewsCatList = () => {
  // ** States
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const getCategories = await GetNewsCatApi();

        setCategories(getCategories);
      } catch (error) {
        toast.error("مشکلی در دریافت دسته بندی ها به وجود آمد !");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Card className="rounded">
        <CategoriesTable data={categories} columns={CATEGORY_COLUMNS} />
      </Card>
    </div>
  );
};

export default NewsCatList;
