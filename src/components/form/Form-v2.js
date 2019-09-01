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

function Form() {
  const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormData)
  const [bgColor, setBgColor] = useState('#CF8080');
  const [captcha, setCaptcha] = useState(null);

  const resetForm = () => {
    setFormData(initialFormData);
    setBgColor('lightgreen');
    return captcha.reset();
  }

  const showData = () => {
    const div = '—'.repeat(40);
    const titleCSS = 'color: white; font-weight: bold';
    const divCSS = 'color: yellow; font-weight: bold';
    const dataCSS = 'color: white';
    console.clear();
    console.log(`%c${div}\n%c FORM DATA\n%c${div}%c\n${JSON.stringify(formData, null, 2)}`, divCSS, titleCSS, divCSS, dataCSS);
    console.table(formData);
  };

  const handleClick = async (event) => {
    await captcha.execute()
    showData();
    // return resetForm();
  };

  const onVerify = () => {
    setBgColor('lightgreen');
  };

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
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
