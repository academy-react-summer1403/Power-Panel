// ** Reactstrap Imports
import { Card, CardBody, Col, Row } from "reactstrap";

// ** Context

// ** Custom Components
import StatsVertical from "@components/widgets/stats/StatsVertical";

// ** Icons Imports
import { Eye, Heart, MessageSquare, ShoppingBag } from "react-feather";

const CourseData = ({
  courseUserTotal,
  courseCommentTotal,
  paymentDoneTotal,
  courseLikeTotal,
  describe,
}) => {
  let convertedDescribe = "";

  try {
    const convertDescribe = JSON.parse(describe);

    convertedDescribe = convertDescribe;
  } catch (error) {
    convertedDescribe = describe;
  }

  const loadContent = () => {
    return convertedDescribe?.blocks?.map((block, ind) => {
      switch (block.type) {
        case "header":
          return <h3 key={ind}>{block.data.text}</h3>;

        case "paragraph":
          return (
            <p key={ind} className="news-details-paragraph">
              {block.data.text}
            </p>
          );

        default:
          return null;
      }
    });
  };

  return (
    <>
      <Row>
      </Row>
      <Card>
        <CardBody>
          <h4>توضیحات دوره</h4>
          <div className="mt-2">{loadContent()}</div>
        </CardBody>
      </Card>
    </>
  );
};

export default CourseData;
