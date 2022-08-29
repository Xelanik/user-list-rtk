import { Routes, Route } from "react-router-dom";

import ROUTES from "./routes";

import ContactList from "../pages/ContactList";
import ContactPage from "../pages/ContactPage";
import ContactForm from "../pages/ContactForm";

const Router = () => (
  <Routes>
    <Route index element={<ContactList />} />
    <Route path={ROUTES.USER + "/:id"} element={<ContactPage />} />
    <Route path={ROUTES.ADD_USER} element={<ContactForm />} />
    <Route path={ROUTES.EDIT_USER + "/:id"} element={<ContactForm />} />
  </Routes>
);

export default Router;
