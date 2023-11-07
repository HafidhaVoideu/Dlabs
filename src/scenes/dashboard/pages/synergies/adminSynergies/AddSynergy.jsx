import React from "react";
import { v4 as uuidV4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useGlobalContextUser } from "../../../../../context/context";

const AddSynergy = ({ setIsModal }) => {
  // ****************** validation schema *****************************

  const { synergies, setSynergies } = useGlobalContextUser();

  const validateSchema = Yup.object({
    name: Yup.string().required("required"),
    price: Yup.number()
      .typeError("price must be a number")
      .required("required"),
    image: Yup.string().required("required"),
  });

  const initialValues = {
    name: "",
    price: "",
    image: "",
  };

  const onSubmit = (values, onSubmit) => {
    const { name, price, image } = values;
    setSynergies([
      {
        id: uuidV4(),
        project_name: name,
        price,
        image,
      },
      ...synergies,
    ]);
    setIsModal(false);
    onSubmit.setSubmitting(false);
    onSubmit.resetForm();
  };

  return (
    <article className="synergy-op">
      <h1 className="synergy-op__title">Add Synergy </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
        validator={() => ({})}
      >
        {(formik) => {
          return (
            <Form className="form">
              {/* name */}

              <div className="form__div">
                <label htmlFor="name" className="form__label">
                  name
                </label>
                <Field type="text" className="form__input" name="name" />
                <ErrorMessage name="name">
                  {(errMessage) => <p className="form__error">*{errMessage}</p>}
                </ErrorMessage>
              </div>

              {/* image */}

              <div className="form__div">
                <label htmlFor="image" className="form__label">
                  image
                </label>
                <Field type="text" className="form__input" name="image" />
                <ErrorMessage name="image">
                  {(errMessage) => <p className="form__error">*{errMessage}</p>}
                </ErrorMessage>
              </div>

              {/* price*/}
              <div className="form__div">
                <label htmlFor="des" className="form__label">
                  price
                </label>
                <Field
                  rows={5}
                  type="text"
                  className="form__input"
                  name="price"
                />
                <ErrorMessage name="price">
                  {(errMessage) => <p className="form__error">*{errMessage}</p>}
                </ErrorMessage>
              </div>
              <button type="submit" className="btn">
                {" "}
                ok
              </button>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddSynergy;
