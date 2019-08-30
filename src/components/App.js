/*
## Front End Challenge A company has approached you for help in developing their
   product and establishing an online presence. You have been tasked with
   quickly creating a web page for them. This page has the following
   requirements:
      X Startup name title
      * Startup logo as icon in browser tab (to be changed)
      * Contact us web form that captures contact information
      * Google reCaptcha V3 implement in page. Submission of form requires Google captcha pass
      * Dump all the information from the form submission to browser console. Google reCaptcha Reference: https://developers.google.com/recaptcha/docs/display
*/

import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import defaultTheme from '../styles/defaultTheme';
import ContactUsForm from './ContactUsForm';
import styled, { ThemeProvider } from 'styled-components';

const S = {};

S.AppContainer = styled.div`
  background-color: #0D2839;

`;

S.BodyContainer = styled.div`
  grid-area:
`;

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <S.AppContainer id='primary-container'>
        <GlobalStyle />
        <ContactUsForm />
      </S.AppContainer>
    </ThemeProvider>
  );
}

export default App;
