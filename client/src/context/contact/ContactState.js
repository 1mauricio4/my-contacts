import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContaxt from "./contactContext";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Ted Johnson",
        email: "tjohnson@gmail.com",
        phone: "555-333-4444",
        type: "personal"
      },
      {
        id: 2,
        name: "Sea Lion",
        email: "sl@slr.com",
        phone: "555-999-7777",
        type: "professional"
      },
      {
        id: 3,
        name: "Pandah",
        email: "pandah@bi.com",
        phone: "555-555-8888",
        type: "professional"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid();

    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  // Delete contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  // Set current contact

  // Clear current contact

  // Update contact

  // Filter contacts

  // Clear filter

  return (
    <ContactContaxt.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact
      }}
    >
      {props.children}
    </ContactContaxt.Provider>
  );
};

export default ContactState;
