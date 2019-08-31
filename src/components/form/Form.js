import React, { useState } from 'react';
import styled from 'styled-components';
import FormTextBlock from './FormTextBlock';

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

S.SubmitButton = styled.button`
  color:  ${props => props.theme.btnFgColor};
  background-color:  ${props => props.theme.btnBgColor};
  height: ${props => props.theme.btnHeight};
  float: right;
  padding: ${props => props.theme.p(0.5)};
  width: ${props => props.theme.btnWidth};
  margin-top: ${props => props.theme.m(1.5)};
`;

function Form() {
  const [name, setName] = useState('John Hillert');
  const [email, setEmail] = useState('john.hillert@gmail.com');
  const [subject, setSubject] = useState('A fat pomerianian');
  const [message, setMessage] = useState('is a happy pomeranian');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [subject, setSubject] = useState('');
  // const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = {
      name,
      email,
      subject,
      message,
    };

    const strSubmitData = JSON.stringify(submitData);

    // console.log(`reCaptcha Token:\n${token}`)
    console.log(`Form Data:\n${strSubmitData}`);
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
      <div
        className='g-recaptcha'
        data-sitekey='6Le66rUUAAAAAE28386VqCQAntTWrHdPHeiaM9EO'
      />
      <div>
        <S.SubmitButton value='Submit'>Submit</S.SubmitButton>
      </div>
    </S.Form>
  );
}

export default Form;
