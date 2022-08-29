import { useNavigate } from "react-router-dom";
import { contactsApi } from "../../store/services/contactsService";

import Contact from "../../components/Contact";

import ROUTES from "../../router/routes";

import styles from "./styles.module.scss";
import { Button } from "@mui/material";

const ContactList = () => {
  const navigate = useNavigate();

  const { data } = contactsApi.useFetchAllContactsQuery("");
  const [deleteUser] = contactsApi.useDeleteContactMutation();

  return (
    <div className={styles.ContactList}>
      <Button
        variant="contained"
        color="success"
        className={styles.AddButton}
        onClick={() => navigate(ROUTES.ADD_USER)}
      >
        Add new
      </Button>

      {data &&
        data.map((el) => (
          <Contact
            key={el.id}
            contact={el}
            deleteContact={deleteUser}
            checkContact={() => navigate(`${ROUTES.USER}/${el.id}`)}
          />
        ))}
    </div>
  );
};

export default ContactList;
