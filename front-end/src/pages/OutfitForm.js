import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericHeader from "../components/GenericHeader";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { requestURL } from "../requestURL";

export default function OutfitForm() {
  const navigate = useNavigate();

  const [styles, setStyles] = useState([])
  const [post, setPost] = useState(null);

  post && console.log("post", post);
  post && console.log("post.postMedia", post.postMedia);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get(
          requestURL + 'posts/styles');
        console.log("* Fetching Styles...")
        setStyles(response.data.styles);
      } catch (error) {
        console.log(error);
        navigate("/500")
      }
    };
    fetchStyles()
  }, [])

  const validationSchema = Yup.object({
    my_files: Yup.mixed()
      .required('At least one photo is required')
      .test('at-least-one-file', 'At least one photo is required', (value) => {
        return value && value.length > 0;
      }),
    style: Yup.string()
      .required('Style is required'),
    location: Yup.string()
      .required('Location is required'),
  });

  const onSubmit = async (values, { resetForm, setFieldValue }) => {
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("location", values.location);
    formData.append("style", values.style);
    // append each uploaded file to the FormData object
    console.log("values.my_files", values.my_files);
    for (let i = 0; i < values.my_files.length; i++) {
      formData.append("my_files", values.my_files[i]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .post(requestURL + "posts/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        })
        .catch((err) => {
          if (err && err.response) {
            console.log("Error :", err);
            navigate("/500");
          }
        });
      if (response && response.data) {
        console.log("values", values);
        console.log("response.data", response.data);
        resetForm(); // Reset the form after successful submission
        setPost(response.data.newPost);
        navigate('/outfit-collection'); // redirect user after posting
      }
    } catch {
      navigate("/500");
    }

  };

  const initialValues = {
    style: "Sporty & Athleisure",
    location: "",
    content: "",
    my_files: [],
  }

  // console.log(formik.values);
  return (
    <div className="relative">
      {/* Header */}
      <div className="absolute z-30">
        <GenericHeader pageName="Share Outfits" />
      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <div className="flex justify-center items-center relative z-0 h-screen">

            <Form
              className="bg-white p-10 rounded-lg my-auto"
            >
              {/* File Upload */}
              <div className="mb-4">
                <label
                  htmlFor="my_files"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Add Photos
                </label>
                <input
                  type="file"
                  name="my_files"
                  id="my_files"
                  className="relative m-0 rounded-lg block w-full min-w-0 flex-auto border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 
    text-sm font-normal text-neutral-700 file:-mx-3 file:-my-[0.32rem] 
    file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 
    file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                  onChange={(e) => {
                    formik.setFieldValue("my_files", e.currentTarget.files);
                  }}
                  multiple
                />
                <ErrorMessage
                  name="my_files"
                  component="div"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>
              {/* Style */}
              <div className="mb-4">
                <label
                  htmlFor="style"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Style
                </label>
                <Field
                  as="select"
                  name="style"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled value="">
                    Select Style
                  </option>
                  {styles.map((style, index) => {
                    if (style !== "All") {
                      return <option key={index}>{style}</option>;
                    }
                    return null
                  })}
                </Field>
                <ErrorMessage
                  name="style"
                  component="div"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Store Name
                </label>
                <Field
                  type="text"
                  placeholder="Where was it?"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 mt-2 text-sm"
                />
              </div>

              {/* Content */}
              <div className="mb-4">
                <textarea
                  component="textarea"
                  placeholder="Write a caption..."
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-400 p-2 rounded-md"
                  rows="10"
                  cols="40"
                ></textarea>
              </div>
              {/* letmepush */}
              {/* Post Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-auto bg-gray-400 text-white px-10 py-2 rounded-md hover:bg-gray-700"
                >
                  Post
                </button>
              </div>
            </Form>
          </div>
        )}

      </Formik>
    </div>
  );
}
