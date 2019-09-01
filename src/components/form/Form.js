import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormTextBlock from './FormTextBlock';
import Reaptcha from 'reaptcha';

/*
NOTE TO HEADSTORM
  The sitekey is embedded in code below only because this is a coding
  exercise. Ordinarily I would handle storage of the key, other env-
  specific variables, and other sensitive data required DEVELOPMENT
  MODE as follows:
    - Create a ".env" file in the project's root directory. This
      file would hold the actual values;
    - Add ".env" to gitignore file;
    - Make values accessible during runtime using the "dotenv" library
      (accessible via "process.env.MY_ENV_VAR");
    - Avoid use of global variables by creating a ".config" file in
      the project's root directory.  The file includes as an export
      a const variable that is equivalalent to one of the enviroment
      variables in the .env file;
    - In the application itself, refer to the environment variables
      only via the constants declared in the .config file;
    - If there were collaborators on the project, I would include a
      ".env.example" file with dummy values, so that the collaborators
      would have an idea of what they needed to include in their own
      .env files.  ".env.example" would not be added to gitignore.
  For PRODUCTION MODE, I would create the necessary environment variables
  using the hosting platform's console.  There would be no .env file.

NOTE TO SELF
- Execution and rendering of the captcha are two different things.
    > EXECUTION: manual or automatic
    > RENDERING: automatically or explicitly
- This here is INVISIBLE reCaptcha, with:
    > MANUAL EXECUTION (required); and
    > AUTOMATIC RENDERING (alternatively, can be explicit);

REAPCHTA API REQUIRED PROPERTIES
  sitekey:    Get from Google
  onVerify:   Callback function executed on user's captcha
              verification. Returns user response token
*/

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

S.Indicator = styled.div`
  align-self: flex-end;
  margin: ${props => props.theme.p(-3)};
  margin-bottom: ${props => props.theme.m(1)};
  background-color: ${props => props.backgroundColor};
  height: 1rem;
  width: 1rem;
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
  const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const [token, setToken] = useState(''); // not necessary, but included for comprehensibility
  const [captcha, setCaptcha] = useState(null);
  const [bgColor, setBgColor] = useState('#CF8080');
  const [formData, setFormData] = useState(initialFormData);
  const [isVerified, setVerification] = useState(false);

  useEffect(() => {
    if (isVerified) {
      showData(formData);
    }

    return () => {
      if (isVerified) {
        setVerification(false);
        setFormData(initialFormData);
        setTimeout(() => setBgColor('#CF8080'), 1000); // allow user chance to see indicator has turned green before turning it red again
        if (captcha) {
          captcha.reset();
        }
      }
    };

    function showData(data) {
      const div = '—'.repeat(40);
      const titleCSS = 'color: white; font-weight: bold';
      const divCSS = 'color: yellow; font-weight: bold';
      const dataCSS = 'color: white';
      console.clear();
      // a straight answer:
      console.log(`%c${div}\n%c FORM DATA\n%c${div}%c\n${JSON.stringify(formData, null, 2)}`, divCSS, titleCSS, divCSS, dataCSS);
      // something more legible:
      console.table(data);
    }
  }, [captcha, formData, initialFormData, isVerified]);

  const onVerify = (t) => {
    setVerification(true);
    setToken(t); // not necessary, but included for comprehensibility
    setBgColor('lightgreen');
  };

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const executeRecaptcha = () => {
    if (captcha) {
      captcha.execute();
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    executeRecaptcha();
  };

  return (
    <S.Form onSubmit={submitForm}>
      <S.Indicator backgroundColor={bgColor} />
      <Reaptcha
        ref={event => (setCaptcha(event))}
        sitekey='6Le66rUUAAAAAE28386VqCQAntTWrHdPHeiaM9EO'
        size='invisible'
        onVerify={onVerify}
      />
      <FormTextBlock />
      <S.ShortFieldContainer>
        <S.NameField
          id='name'
          placeholder='Name'
          type='text'
          value={formData.name}
          bgColor={bgColor}
          onChange={updateFormData}
        />
        <S.EmailField
          id='email'
          placeholder='Email'
          type='email'
          value={formData.email}
          bgColor={bgColor}
          onChange={updateFormData}
        />
      </S.ShortFieldContainer>
      <S.SubjectField
        id='subject'
        placeholder='Subject'
        type='text'
        value={formData.subject}
        bgColor={bgColor}
        onChange={updateFormData}
      />
      <S.MessageField
        id='message'
        placeholder='Message'
        rows={10}
        value={formData.message}
        bgColor={bgColor}
        onChange={updateFormData}
      />
      <div>
        <S.SubmitButton
          type='submit'
        >
          Submit
        </S.SubmitButton>
      </div>
    </S.Form>
  );
}

export default Form;
