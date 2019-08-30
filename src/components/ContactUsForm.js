/* eslint-disable react/jsx-filename-extension */
/*

  Contact Us:                                                        │ FormText.js
                                                                     │
  Please leave us your message below, along with your name and       │
  email address.  We will do our best to respond by the end of       │
  the next business day.                                             │
                                                                     │
  Thank you.                                                         │

  ┌────────────────────────────┐ ┌────────────────────────────┐      │ FormFields.js
  │ Name                       │ │ Email                      │      │
  └────────────────────────────┘ └────────────────────────────┘      │
  ┌───────────────────────────────────────────────────────────┐      │
  │ Subject                                                   │      │
  └───────────────────────────────────────────────────────────┘      │
  ┌───────────────────────────────────────────────────────────┐      │
  │ Message                                                   │      │
  │                                                           │      │
  │                                                           │      │
  │                                                           │      │
  └───────────────────────────────────────────────────────────┘
                                                     ┌────────┐      │ [local]
                                                     │ SUBMIT │      │
                                                     └────────┘      │

*/
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import * as EmailValidator from 'email-validator';

const S = {};

S.FormTitle = styled.h1`
  color: ${(props) => props.theme.fgColor1}
`;

S.FormInstructions = styled.div`
  color: ${(props) => props.theme.fgColor2}
`;

S.Form = styled.form``;

S.NameField = styled.input``;

S.EmailField = styled.input``;

S.SubjectField = styled.input``;

S.MessageField = styled.input``;

S.SubmitButton = styled.input``;

function ContactUsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('placeholder');
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.FormTitle>Contact Us:</S.FormTitle>
      <S.FormInstructions>
        Please leave us your message below, along with your name and
        email address.  We will do our best to respond by the end of
        the next business day.

        Thank you.
      </S.FormInstructions>
      <S.NameField type='text' value={name} onChange={e => setName(e.target.value)} />
      <S.EmailField type='email' value={email} onChange={e => setName(e.target.value)} />
      <S.SubjectField type='text' value={email} onChange={e => setName(e.target.value)} />
      <S.MessageField type='text' value={email} onChange={e => setName(e.target.value)} />
      <S.SubmitButton type="submit" value="Submit" />
    </S.Form>
  );
}

// ContactUsForm.defaultProps = {};
// ContactUsForm.propTypes = {};

export default ContactUsForm;
