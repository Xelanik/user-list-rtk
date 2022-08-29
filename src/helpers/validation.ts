import * as Yup from "yup";

export const contactResolver = Yup.object().shape({
  first_name: Yup.string()
    .required("Firs name required")
    .max(256, "Must be exactly 256 digits"),
  last_name: Yup.string()
    .required("Last name required")
    .max(256, "Must be exactly 256 digits"),
  birth_date: Yup.string().required("Birth date required"),
  gender: Yup.string().required("Gender required"),
  job: Yup.string()
    .required("Job required")
    .max(256, "Must be exactly 256 digits"),
  biography: Yup.string()
    .required("Biography required")
    .max(1024, "Must be exactly 1024 digits"),
  is_active: Yup.bool(),
});
