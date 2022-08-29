import { Button } from "@mui/material";
import { contactsApi } from "../../store/services/contactsService";
import { useNavigate, useParams } from "react-router-dom";

import ROUTES from "../../router/routes";

import styles from "./styles.module.scss";

const ContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = contactsApi.useFetchUserInfoQuery(id);
  const [deleteUser] = contactsApi.useDeleteContactMutation();

  const deleteUserHandler = () => {
    deleteUser(id);
    navigate(ROUTES.LIST);
  };

  const onEditUser = () => {
    navigate(`${ROUTES.EDIT_USER}/${id}`, { state: { contact: { ...data } } });
  };

  return (
    <div className={styles.ContactPage}>
      <div className={styles.UserInfo}>
        <div>
          <strong>First name:</strong> {data?.first_name}
        </div>
        <div>
          <strong>Last name:</strong> {data?.last_name}
        </div>
        <div>
          <strong>Birth date:</strong> {data?.birth_date}
        </div>
        <div>
          <strong>Gender:</strong> {data?.gender}
        </div>
        <div>
          <strong>Job:</strong> {data?.job}
        </div>
        <div>
          <strong>Is active:</strong> {data?.is_active ? "True" : "False"}
        </div>
        <div>
          <strong>Biography:</strong> {data?.biography}
        </div>

        <div className={styles.UserControls}>
          <Button variant="contained" color="warning" onClick={onEditUser}>
            Edit
          </Button>

          <Button variant="contained" color="error" onClick={deleteUserHandler}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
