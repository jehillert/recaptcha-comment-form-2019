import React, { useState } from 'react';
import styled from 'styled-components';
import FormTextBlock from './FormTextBlock';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
// import PropTypes from 'prop-types';
// import * as EmailValidator from 'email-validator';

const S = {};

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bgColor2};
  padding: ${props => props.theme.p(3)};
  * {
    margin-bottom: ${props => props.theme.m(1.5)};
  }

  @media ${props => props.theme.device.phone} {
    height: 100vh;
    width: 100vw;
  }

  @media ${props => props.theme.device.tabletSM} {
    height: auto;
    max-width: ${props => props.theme.formWidth};
    box-shadow: ${props => props.theme.boxShadow};
  }
`;

S.InputField = styled.input`
  height: ${props => props.theme.inputFieldHeight};
  * {
    margin: ${props => props.theme.m(0.5)};
  }
  padding: ${props => props.theme.p(1)};
`;

S.ShortFieldContainer = styled.div`
  display: flex;
  flex: nowrap;
  padding-top: ${props => props.theme.p(1)};
  justify-content: center;
  margin: 0px;
`;

S.NameField = styled(S.InputField)`
  width: 50%;
  margin-right: ${props => props.theme.m(0.75)};
`;

S.EmailField = styled(S.InputField)`
  width: 50%;
  margin-left: ${props => props.theme.p(0.75)};
`;

S.SubjectField = styled(S.InputField)``;

S.MessageField = styled.textarea`
  resize: vertical;
  padding: ${props => props.theme.p(1)};
`;

S.SubmitButton = styled.input`
  color:  ${props => props.theme.btnFgColor};
  background-color:  ${props => props.theme.btnBgColor};
  height: ${props => props.theme.btnHeight};
  float: right;
  padding: ${props => props.theme.p(0.5)};
  width: ${props => props.theme.btnWidth};
  margin-top: ${props => props.theme.m(1.5)};
`;

function Form() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [token, setToken] = useState('');

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (event) => {
    console.log('Not yet');
    if (!executeRecaptcha) {
      return;
    }

    const result = await executeRecaptcha("homepage");
    setToken(result);

    event.preventDefault();
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <FormTextBlock />
      <S.ShortFieldContainer>
        <S.NameField
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <S.EmailField
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </S.ShortFieldContainer>
      <S.SubjectField
        type='text'
        placeholder='Subject'
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <S.MessageField
        placeholder='Message'
        name='message'
        rows={10}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <div>
        <S.SubmitButton
          type='submit'
          value='Submit'
        />
      </div>
    </S.Form>
  );
}

// Form.defaultProps = {};
// Form.propTypes = {};

export default Form;
