import React from "react";
import "./edit.css";
import { AiOutlineClose, AiOutlineFileAdd } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { v4 as uuidV4 } from "uuid";
import { useGlobalContextUser } from "../../../../../context/context";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// todo ****************************************************************

const EditProject = ({ project, closeModal }) => {
  const { projects, setProjects, setAlert } = useGlobalContextUser();

  // ****************** validation schema *****************************

  const validateSchema = Yup.object({
    project_name: Yup.string().required("required"),
    description: Yup.string().required("required"),
    img: Yup.string().required("required"),
    discord_link: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Please enter your discord"),

    twitter: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Please enter your twitter"),

    website: Yup.string().required("Please enter your website"),
  });

  const initialValues = {
    project_name: project?.project_name || "",
    description: project?.description || "",
    img: project?.img || "",
    discord_link: project?.discord_link || "",
    website: project?.website || "",
    twitter: project?.twitter || "",
  };

  // ****************** Edit *****************************

  const handleEdit = (values) => {
    // send update request

    const { project_name, description, discord_link, img, website } = values;

    const proj = projects.map((p) => {
      if (p.project_id === project.project_id)
        return {
          project_id: project.project_id,
          project_name,
          description,
          discord_link,
          img,
          website,
          twitter,
        };
      else return p;
    });

    setProjects([...proj]);

    setAlert({ isAlert: true, alertMessage: "Project has been edited" });
    closeModal();
  };

  // ****************** Add *****************************

  const handleAdd = (values) => {
    //send axios to database

    const { project_name, description, discord_link, img, website } = values;

    setProjects([
      {
        project_id: uuidV4(),
        project_name,
        description,
        discord_link,
        img,
        website,
        twitter,
      },
      ...projects,
    ]);

    setAlert({ isAlert: true, alertMessage: "Project has been Added" });
    closeModal();
  };

  // ****************** Submit *****************************

  const onSubmit = (values, onSubmit) => {
    console.log("submitted values", values);
    if (project) handleEdit(values);
    else handleAdd(values);
    onSubmit.setSubmitting(false);
    onSubmit.resetForm();
  };

  return (
    <div className="modal  ">
      <div className="modal-content dropshadow">
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
                <div className="modal__icons">
                  <button
                    type="submit"
                    className="popup__edit-btn"
                    disabled={
                      !((formik.isValid && formik.dirty) || formik.isSubmitting)
                    }
                  >
                    {project ? <BiEdit /> : <AiOutlineFileAdd />}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="popup__close-btn"
                  >
                    <AiOutlineClose />
                  </button>
                </div>

                <div className="form__div">
                  <label htmlFor="name" className="form__label">
                    name
                  </label>
                  <Field
                    type="text"
                    className="form__input"
                    name="project_name"
                  />
                  <ErrorMessage name="project_name">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                {/* image */}

                <div className="form__div">
                  <label htmlFor="image" className="form__label">
                    image
                  </label>
                  <Field type="text" className="form__input" name="img" />
                  <ErrorMessage name="img">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                {/* Description*/}
                <div className="form__div">
                  <label htmlFor="des" className="form__label">
                    description
                  </label>
                  <Field
                    as="textarea"
                    rows={5}
                    type="text"
                    className="form__input"
                    name="description"
                  />
                  <ErrorMessage name="description">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>
                {/* Discord*/}
                <div className="form__div">
                  <label htmlFor="discord" className="form__label">
                    discord
                  </label>
                  <Field
                    type="text"
                    className="form__input"
                    name="discord_link"
                  />
                  <ErrorMessage name="discord_link">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>

                {/* Twitter*/}
                <div className="form__div">
                  <label htmlFor="twitter" className="form__label">
                    twitter
                  </label>
                  <Field type="text" className="form__input" name="twitter" />
                  <ErrorMessage name="twitter">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>
                {/* Website */}
                <div className="form__div">
                  <label htmlFor="website" className="form__label">
                    website
                  </label>
                  <Field type="text" className="form__input" name="website" />
                  <ErrorMessage name="website">
                    {(errMessage) => (
                      <p className="form__error">*{errMessage}</p>
                    )}
                  </ErrorMessage>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditProject;
