import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import defaultTheme from '../styles/defaultTheme';
import Form from './form/Form';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { reCaptchaKey } from '../config';

const S = {};

S.AppContainer = styled.div`
  background-color: ${props => props.theme.bgColor1};
`;

S.BodyContainer = styled.div`
  grid-area: mainBody;
  @media ${props => props.theme.device.phone} {
    padding: ${(props) => props.theme.p(0)};
  }
  @media ${props => props.theme.device.tabletSM} {
    padding: ${(props) => props.theme.p(1)};
  }
`;
function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      <ThemeProvider theme={defaultTheme}>
        <S.AppContainer id='primary-container'>
          <GlobalStyle />
          <S.BodyContainer>
            <Form />
          </S.BodyContainer>
        </S.AppContainer>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
}

export default App;
