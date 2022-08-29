import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { contactsApi } from "../../store/services/contactsService";
import { contactResolver } from "../../helpers/validation";
import { Button } from "@mui/material";
import { DatePicker } from "antd";
import { IContact } from "../../models/IContact";

import ROUTES from "../../router/routes";

import styles from "./styles.module.scss";

type FormValues = {
  id: number | undefined;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  job: string;
  biography: string;
  is_active: boolean;
};

type LocationState = {
  contact?: IContact;
};

const ContactForm = () => {
  const location = useLocation();
  const { contact } = (location.state as LocationState) || ({} as IContact);

  const navigate = useNavigate();

  const [createContact, { isSuccess: createSuccess }] =
    contactsApi.useCreateContactMutation();
  const [updateContact, { isSuccess: updateSuccess }] =
    contactsApi.useUpdateContactMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(contactResolver),
    defaultValues: contact,
  });

  useEffect(() => {
    if (createSuccess || updateSuccess) navigate(ROUTES.LIST);
  }, [createSuccess, updateSuccess]);

  const onSubmit = handleSubmit((data) => {
    const newData = {
      ...data,
      birth_date: new Date(data.birth_date).toISOString().substring(0, 10),
    };

    if (contact) {
      updateContact(newData);
    } else createContact(newData);
  });

  return (
    <div className={styles.ContactForm}>
      <form onSubmit={onSubmit} className={styles.Form}>
        <div className={styles.Input}>
          <input {...register("first_name")} placeholder="First name" />
          {errors.first_name && errors.first_name.message}
        </div>

        <div className={styles.Input}>
          <input {...register("last_name")} placeholder="Last name" />
          {errors.last_name && errors.last_name.message}
        </div>

        <div className={styles.DatePickerWrapper}>
          <Controller
            control={control}
            name="birth_date"
            render={({ field: { onChange } }) => (
              <DatePicker onChange={onChange} className={styles.DatePicker} />
            )}
          />
          {errors.birth_date && errors.birth_date.message}
        </div>

        <div className={styles.Input}>
          <select {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && errors.gender.message}
        </div>

        <div className={styles.Input}>
          <input {...register("job")} placeholder="Job" />
          {errors.job && errors.job.message}
        </div>

        <div className={styles.Input}>
          <textarea {...register("biography")} placeholder="Biography" />
          {errors.biography && errors.biography.message}
        </div>

        <div className={styles.isActive}>
          Is Active:{" "}
          <input
            {...register("is_active")}
            placeholder="is_active"
            type="checkbox"
          />
        </div>

        <br />

        <Button
          variant="contained"
          color={contact ? "warning" : "success"}
          type="submit"
        >
          {contact ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
