import React from "react";
import styled from "styled-components";

import { Button } from "../../ui-kit/Button";
import { Input } from "../../ui-kit/Input";
import { ReactComponent as Send } from "../../static/send.svg";

const StyledSend = styled(Send)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SignUp = () => {
  return (
    <div>
      <Input
        type="text"
        label="Email"
        name="Email"
        placeholder="loremsdfsdfsdfsdfsdfsdfsdfdf"
        onChange={undefined}
        ClassName={undefined}
      />
      <Input
        type="password"
        label="Password"
        name="Password"
        placeholder="Secret word"
        onChange={undefined}
        ClassName={undefined}
      />
      <Input
        type="text"
        name="smallSearch"
        variantLable="smallLabel"
        variantInput="smallInput"
        inputSize="sm"
        lableSize="sm"
        onChange={undefined}
        ClassName={undefined}
      />
      <Input
        type="text"
        name="bigSearch"
        variantLable="bigLable"
        variantInput="bigInput"
        inputSize="lg"
        lableSize="lg"
        placeholder="Find Best Recipies..."
        onChange={undefined}
        ClassName={undefined}
      />
      <Button size="sm" loading={false}>
        <StyledSend />
      </Button>
      <Button size="md1" loading={false}>
        primary
      </Button>
      <Button size="lg1" loading={false}>
        efwefewfw wefewfewfw
      </Button>
      <Button size="lg2" loading={false} variant="outlined">
        secondary
      </Button>
    </div>
  );
};
