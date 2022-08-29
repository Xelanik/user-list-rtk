import { IContact } from "../../models/IContact";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsAPI",
  tagTypes: ["Contacts", "Contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-candidate.dev.sdh.com.ua/v1",
  }),
  endpoints: (build) => ({
    fetchAllContacts: build.query<IContact[], string>({
      query: () => ({ url: "/contact/" }),
      providesTags: (results) => ["Contacts"],
    }),

    fetchUserInfo: build.query<IContact, string | undefined>({
      query: (id) => ({ url: `/contact/${id}/` }),
      providesTags: (results) => ["Contact"],
    }),

    createContact: build.mutation({
      query: (contact) => ({
        url: "/contact/",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),

    deleteContact: build.mutation({
      query: (id) => ({
        url: `/contact/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),

    updateContact: build.mutation<IContact, IContact>({
      query: (contact) => ({
        url: `/contact/${contact.id}/`,
        method: "PUT",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});
