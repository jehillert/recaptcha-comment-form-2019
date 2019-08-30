import React from 'react';
import styled from 'styled-components';

const S = {};

S.FormTitle = styled.h1`
  color: ${props => props.theme.fgColor1};
  font-size: ${props => props.theme.formTitleFontSize};
`;

S.FormInstructions = styled.div`
  color: ${props => props.theme.fgColor2};
  margin-bottom: ${props => props.theme.m(2)};
`;

S.TextBlockContainer = styled.div`
  margin-top: ${props => props.theme.m(2)};
`;

const FormTextBlock = () => (
  <S.TextBlockContainer>
    <S.FormTitle>Contact Us</S.FormTitle>
    <S.FormInstructions>
      <p>Please leave us your message below, along with your name and
      email address.  We will do our best to respond by the end of
      the next business day.</p>
      Thank you.
    </S.FormInstructions>
  </S.TextBlockContainer>
);

export default FormTextBlock;
