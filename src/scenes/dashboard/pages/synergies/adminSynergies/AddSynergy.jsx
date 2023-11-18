import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useGlobalContextUser } from "../../../../../context/context";
import axios from "../../../../../axios/axios";
const AddSynergy = ({ setIsModal }) => {
  // ****************** validation schema *****************************

  const { synergies, setSynergies, projects } = useGlobalContextUser();
  const mappedOptions = projects
    .filter((p) => !synergies?.map((s) => s._project_id).includes(p.project_id))
    .map((p) => {
      return { value: p.project_id, label: p.project_name };
    });
  // const isValidUrl = (url) => {
  //   try {
  //     new URL(url);
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // };

  const [select, setSelect] = useState(mappedOptions[0]);
  const validateSchema = Yup.object({
    price: Yup.number()
      .typeError("price must be a number")
      .required("required"),
  });

  const initialValues = {
    price: "",
  };

  const onSubmit = (values, onSubmit) => {
    const { price } = values;
    setSynergies([
      {
        id: uuidV4(),
        _project_id: select.value,
        price: Number(price),
      },
      ...synergies,
    ]);

    axios
      .post(`/api/synergies/`, {
        price: price,
        projectId: select.value,
      })
      .then((response) => console.log(response));

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
                  project
                </label>

                <Select
                  id="name"
                  className="select"
                  value={select}
                  onChange={(select) => setSelect(select)}
                  isClearable={false}
                  isSearchable={true}
                  options={mappedOptions}
                  classNamePrefix="react-select"
                />
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
