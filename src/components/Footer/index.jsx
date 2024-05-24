import React from "react";

import { Foot2, StyledFooter } from "./style";

const Footer = () => {
  return (
    <StyledFooter>
      <Foot2>&copy;{new Date().getFullYear()} Recrut® • Privacy Policy</Foot2>
    </StyledFooter>
  );
};

export default Footer;
