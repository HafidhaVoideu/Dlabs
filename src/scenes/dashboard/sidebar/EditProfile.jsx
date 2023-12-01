import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useGlobalContextUser } from "../../../context/context";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={(val) => {
        onChange(name, val);
      }}
    />
  );
};

// const today = new Date();

const validateSchema = Yup.object({
  birthday: Yup.string().required("required"),
  twitter: Yup.string().required("required"),
});

const initialValues = {
  birthday: "",
  twitter: "",
};

const handleEdit = (values) => {
  const { birthday, twitter } = values;

  let projectToEdit;

  // axios
  //   .patch(`/api/projects/`, {
  //     projectId: projectToEdit.project_id,
  //     projectData: {
  //       project_name,
  //       description: String(description),
  //       discord_link,
  //       image,
  //       rating: Number(rating),
  //       website,
  //       twitter,
  //       featured: projectToEdit.featured,
  //     },
  //   })
  //   .then((response) => console.log(response));

  closeModal();
};

const onSubmit = (values, onSubmit) => {
  handleEdit(values);

  onSubmit.setSubmitting(false);
  onSubmit.resetForm();
};

const EditProfile = ({ closeModal }) => {
  const { user } = useGlobalContextUser();
  return (
    <div id="myModal" className="modal  ">
      <div className="modal-content">
        <div className="modal__icons">
          <button
            type="button"
            onClick={closeModal}
            className="popup__close-btn"
          >
            <AiOutlineClose />
          </button>
        </div>

        <img
          src={user.picture}
          alt={`${user.name}-picture`}
          style={{ width: "200px", height: "200px" }}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validateSchema}
          validator={() => ({})}
        >
          {(formik) => {
            const { values, setFieldValue } = formik;
            return (
              <Form className="form">
                {/* birthday*/}

                <div className="form__div">
                  <label htmlFor="birthday" className="form__label">
                    birthday
                  </label>

                  {/* <DatePickerField
                    name="birthday"
                    value={values.birthday}
                    onChange={setFieldValue}
                  /> */}
                  <Field
                    id="birthday"
                    type="date"
                    className="form__input"
                    name="birthday"
                  />
                  <ErrorMessage name="birthday">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                <div className="form__div">
                  <label htmlFor="twitter" className="form__label">
                    twitter
                  </label>
                  <Field
                    id="twitter"
                    type="text"
                    className="form__input"
                    name="twitter"
                  />
                  <ErrorMessage name="twitter">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    maxWidth: "200px",
                    margin: "2rem auto 0",
                  }}
                  disabled={
                    !((formik.isValid && formik.dirty) || formik.isSubmitting)
                  }
                >
                  Edit Profile
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
