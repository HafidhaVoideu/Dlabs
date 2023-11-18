import React, { useState } from "react";
import Select from "react-select";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGlobalContextUser } from "../../../../../context/context";

import axios from "../../../../../axios/axios";
const EditSyngergy = ({ setIsModal }) => {
  const { synergies, setSynergies, projects } = useGlobalContextUser();

  const mappedOptions = projects
    .filter((p) => synergies?.map((s) => s._project_id).includes(p.project_id))
    .map((p) => {
      return { value: p.project_id, label: p.project_name };
    });

  const [select, setSelect] = useState(mappedOptions[0]);

  const validateSchema = Yup.object({
    price: Yup.number()
      .typeError("price must be a number")
      .required("required"),
  });

  const initialValues = {
    price: synergies.filter((s) => s._project_id === select.value)[0].price,
  };

  const onSubmit = (values, onSubmit) => {
    const { price } = values;

    const temp = synergies.map((s) => {
      if (s._project_id === select.value) {
        {
          axios
            .patch(`/api/synergies/`, {
              price: price,
              synergy_id: s.id,
            })
            .then((response) => console.log(response));
          return { ...s, price };
        }
      } else return s;
    });

    setSynergies(temp);
    setIsModal(false);
  };

  return (
    <article className="synergy-op">
      <h1 className="synergy-op__title">Edit Price</h1>

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
                <label htmlFor="syn" className="form__label">
                  Synergies
                </label>
                <Select
                  id="syn"
                  className="select"
                  value={select}
                  onChange={(select) => setSelect(select)}
                  isClearable={false}
                  isSearchable={true}
                  options={mappedOptions}
                  classNamePrefix="react-select"
                  name="secondary projects"
                />
              </div>

              {/* price*/}
              <div className="form__div">
                <label htmlFor="prix" className="form__label">
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

export default EditSyngergy;
