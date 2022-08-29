import React from "react";

import { Button } from "@mui/material";
import { IContact } from "../../models/IContact";

import styles from "./styles.module.scss";

type Props = {
  contact: IContact;
  checkContact: (id: number | undefined) => void;
  deleteContact: (id: number | undefined) => void;
};

const Contact = ({ contact, deleteContact, checkContact }: Props) => {
  const onDeleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteContact(contact.id);
  };

  const onCheckContact = (event: React.MouseEvent) => {
    checkContact(contact.id);
  };

  return (
    <div className={styles.Contact} onClick={onCheckContact}>
      <div className={styles.ContactInfo}>
        <div className={styles.FullName}>
          <div className={styles.Name}>{contact.first_name}</div>
          <div className={styles.Name}>{contact.last_name}</div>
        </div>

        <div>{contact.birth_date}</div>
        <div>{contact.gender}</div>
      </div>

      <Button variant="contained" color="error" onClick={onDeleteHandler}>
        Delete
      </Button>
    </div>
  );
};

export default Contact;
