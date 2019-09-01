import React, { useState } from 'react';
import styled from 'styled-components';
import FormTextBlock from './FormTextBlock';
import Reaptcha from 'reaptcha';

const S = {};

S.Form = styled.div`
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

S.Indicator = styled.div`
  background-color: ${props => props.backgroundColor};
  height: 1rem;
  width: 1rem;
`;

// maybe you can kill Reaptcha with && as soon as it verifies
// That will get you away from all of this mess.
// A user does not suddently become bot halfway through a transaction
// so a single session reload should not be a concern.

// half na hour on it and thne you are done
// no icon.  no other part of the project.

// const [name, setName] = useState('John Hillert');
// const [email, setEmail] = useState('john.hillert@gmail.com');
// const [subject, setSubject] = useState('A fat pomerianian');
// const [message, setMessage] = useState('is a happy pomeranian');

function Form() {
  const [bgColor, setBgColor] = useState('#CF8080');
  const [captcha, setCaptcha] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // const resetForm = () => {
  //   setName('');
  //   setEmail('');
  //   setSubject('');
  //   setMessage('');
  // };

  const showData = () => {
    const div = '—'.repeat(40);
    const titleCSS = 'color: white; font-weight: bold';
    const divCSS = 'color: yellow; font-weight: bold';
    const dataCSS = 'color: white';
    const data = {
      name,
      email,
      subject,
      message,
    };
    console.clear();
    console.log(`%c${div}\n%c FORM DATA\n%c${div}%c\n${JSON.stringify(data, null, 2)}`, divCSS, titleCSS, divCSS, dataCSS);
    console.table(data);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    await captcha.execute()
    showData();
    // return resetForm();
  };

  const onVerify = () => {
    setBgColor('lightgreen');
  };

  return (
    <>
      <S.Form>
        <Reaptcha
          ref={e => (setCaptcha(e))}
          sitekey='6Le66rUUAAAAAE28386VqCQAntTWrHdPHeiaM9EO'
          onVerify={onVerify}
          size='invisible'
        />
        <FormTextBlock />
        <S.ShortFieldContainer>
          <S.NameField
            name='name'
            placeholder='Name'
            type='text'
            value={name}
            bgColor={bgColor}
            onChange={e => setName(e.target.value)}
          />
          <S.EmailField
            name='email'
            placeholder='Email'
            type='email'
            value={email}
            bgColor={bgColor}
            onChange={e => setEmail(e.target.value)}
          />
        </S.ShortFieldContainer>
        <S.SubjectField
          name='subject'
          placeholder='Subject'
          type='text'
          value={subject}
          bgColor={bgColor}
          onChange={e => setSubject(e.target.value)}
        />
        <S.MessageField
          name='message'
          placeholder='Message'
          rows={10}
          value={message}
          bgColor={bgColor}
          onChange={e => setMessage(e.target.value)}
        />
        <div>
          <S.SubmitButton
            type='submit'
            onClick={handleClick}
          >
            Submit
          </S.SubmitButton>
        </div>
      </S.Form>
      <S.Indicator backgroundColor={bgColor} />
    </>
  );
}

export default Form;
