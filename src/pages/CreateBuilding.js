// ** Reactstrap Imports
import { Button, Col, FormGroup, Label, Row, FormFeedback } from "reactstrap";

// ** Store & Actions
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import "leaflet/dist/leaflet.css";

// ** Map Imports
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// ** Services
import { CreateBuildings } from "../core/services/api/BuildingApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationPicker = ({ setFieldValue }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setFieldValue("latitude", lat.toFixed(6));
      setFieldValue("longitude", lng.toFixed(6));
    },
  });

  return null;
};

const CreateBuilding = () => {
  const Validation = yup.object().shape({
    buildingName: yup.string().required("این فیلد الزامی است"),
    floor: yup
      .number()
      .required("این فیلد الزامی است")
      .integer("فقط عدد صحیح مجاز است"),
    latitude: yup.string().required("این فیلد الزامی است"),
    longitude: yup.string().required("این فیلد الزامی است"),
  });

  const navigate = useNavigate();

  const OnSubmit = async (value) => {
    const data = {
      buildingName: value.buildingName,
      workDate: new Date().toISOString(),
      floor: parseInt(value.floor),
      latitude: value.latitude,
      longitude: value.longitude,
    };

    try {
      const res = await CreateBuildings(data);
      if (res.success === true) {
        navigate("/ListOfBuilding");
        toast.success("عملیات موفق امیز بود")
      }
    } catch (error) {
      console.error("Error during creation:", error);
    }
  };

  return (
    <div className="invoice-add-wrapper">
      <Formik
        initialValues={{
          buildingName: "",
          floor: "",
          latitude: "",
          longitude: "",
        }}
        onSubmit={(value) => OnSubmit(value)}
        validationSchema={Validation}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="buildingName">
                    نام ساختمان <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className={`form-control ${
                      errors.buildingName && touched.buildingName
                        ? "is-invalid"
                        : ""
                    }`}
                    name="buildingName"
                    placeholder="مثلا سپهرگان"
                  />
                  <ErrorMessage name="buildingName" component={FormFeedback} />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="floor">
                    تعداد طبقه <span className="text-danger">*</span>
                  </Label>
                  <Field
                    type="number"
                    className={`form-control ${
                      errors.floor && touched.floor ? "is-invalid" : ""
                    }`}
                    name="floor"
                    placeholder="مثلا 12"
                  />
                  <ErrorMessage name="floor" component={FormFeedback} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Label>انتخاب موقعیت جغرافیایی</Label>
                <MapContainer
                  center={[35.6892, 51.389]}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      values.latitude || 35.6892,
                      values.longitude || 51.389,
                    ]}
                    icon={markerIcon}
                  />
                  <LocationPicker setFieldValue={setFieldValue} />
                </MapContainer>
                <div className="d-flex mt-2">
                  <Field
                    className="form-control me-2"
                    name="latitude"
                    placeholder="طول جغرافیایی"
                    disabled
                  />
                  <Field
                    className="form-control"
                    name="longitude"
                    placeholder="عرض جغرافیایی"
                    disabled
                  />
                </div>
                <ErrorMessage name="latitude" component={FormFeedback} />
                <ErrorMessage name="longitude" component={FormFeedback} />
              </Col>
            </Row>

            <Button type="submit" color="primary" className="me-1 mt-2">
              ثبت
            </Button>
            <Button
              tag={Link}
              to="/ListOfBuilding"
              color="secondary"
              outline
              type="reset"
            >
              انصراف
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBuilding;
