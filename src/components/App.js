import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import defaultTheme from '../styles/defaultTheme';
import ContactUsForm from './ContactUsForm';

const S = {};

  // background-color: #0D2839;
S.AppContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

S.BodyContainer = styled.div`
  grid-area: mainBody;
  background-color: darkblue;
  padding: ${(props) => props.theme.p(1)};
`;

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <S.AppContainer id='primary-container'>
        <GlobalStyle />
        <S.BodyContainer>
          <ContactUsForm />
        </S.BodyContainer>
      </S.AppContainer>
    </ThemeProvider>
  );
}

export default App;
