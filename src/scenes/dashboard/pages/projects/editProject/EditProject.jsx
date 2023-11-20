import React from "react";
import "./edit.css";
import { AiOutlineClose, AiOutlineFileAdd } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { v4 as uuidV4 } from "uuid";
import { useGlobalContextUser } from "../../../../../context/context";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "../../../../../axios/axios";

// todo ****************************************************************

const EditProject = ({ project, closeModal }) => {
  const { projects, setProjects, setAlert } = useGlobalContextUser();

  const options = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 6,
      label: 6,
    },
    {
      value: 7,
      label: 7,
    },
    {
      value: 8,
      label: 8,
    },
    {
      value: 9,
      label: 9,
    },
    {
      value: 10,
      label: 10,
    },
  ];

  // ****************** validation schema *****************************

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  const validateSchema = Yup.object({
    project_name: Yup.string().required("required"),
    description: Yup.string().required("required"),
    image: Yup.string()
      .test("is-url-valid", "Image URL is not valid", (value) =>
        isValidUrl(value)
      )
      .required("required"),
    discord_link: Yup.string().required("Please enter your discord"),
    rating: Yup.number().required("Please enter a valid rating"),
    twitter: Yup.string().required("Please enter your twitter"),
    website: Yup.string().required("Please enter your website"),
  });

  const initialValues = {
    project_name: project?.project_name || "",
    description: project?.description || "",

    rating: project?.rating || 0,

    image:
      project?.img ||
      "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    discord_link: project?.discord_link || "",
    website: project?.website || "",
    twitter: project?.twitter || "",
  };

  // ****************** Edit *****************************

  const handleEdit = (values) => {
    const {
      project_name,
      description,
      discord_link,
      image,
      website,
      twitter,
      rating,
    } = values;

    console.log("modified rating:", rating);

    const proj = projects.map((p) => {
      if (p.project_id === project.project_id)
        return {
          project_id: project.project_id,
          project_name,
          rating: Number(rating),
          description,
          discord_link,
          image,
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

    const {
      project_name,
      description,
      discord_link,
      image,
      website,
      twitter,
      rating,
    } = values;

    setProjects([
      {
        project_id: uuidV4(),
        project_name,
        description,
        discord_link,
        image,
        rating: Number(rating),
        website,
        twitter,
      },
      ...projects,
    ]);

    setAlert({ isAlert: true, alertMessage: "Project has been Added" });

    axios
      .post(`/api/projects/`, {
        project_name: project_name,
        website: website,
        description: description,
        twitter: twitter,
        discord_link: discord_link,
        rating: rating,
        image: image,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log("error:", error.message));
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
                    id="name"
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
                  <Field
                    id="image"
                    type="text"
                    className="form__input"
                    name="image"
                  />
                  <ErrorMessage name="image">
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
                    id="des"
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
                {/* Rating */}

                <div className="form__div">
                  <label htmlFor="rating" className="form__label">
                    rating
                  </label>
                  <Field
                    as="select"
                    id="rating"
                    className="form__select"
                    name="rating"
                  >
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage name="rating">
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
