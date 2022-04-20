import React from "react";
import styled from "styled-components";
import { colors } from "../../../theme";

import { Box } from "../../helpers/Box";
import { Heading } from "../../helpers/Text";
import { Button } from "../Button";

const Modal = styled(Box)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
`;
const Backdrop = styled(Box)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Wrapper = styled(Box)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  margin: 32px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 64px);
  max-width: 444px;
  width: 100%;
  z-index: 1000;
`;
const DialogTitle = styled(Heading)`
  margin: 0;
  font-weight: 600;
  font-size: 30px;
  line-height: 1.6;
  padding: 16px 24px;
  text-align: center;
  flex: 0 0 auto;
`;
const DialogContent = styled(Box)`
  flex: 1 1 auto;
  font-size: 20px;
  text-align: center;
  padding: 0 24px 20px;
  color: ${colors.background.dialog};
`;
const DialogActions = styled(Box)`
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: flex-end;
  flex: 0 0 auto;
`;

export const Dialog = ({ open, onClose, title, content, yesHandle }) => {
  const handleYes = (e) => {
    yesHandle(e);
    onClose();
  };
  return (
    <>
      {open && (
        <Modal>
          <Backdrop>
            <Wrapper>
              <DialogTitle>{title ? title : `Use Google's location service?`}</DialogTitle>
              <DialogContent>
                {content
                  ? content
                  : `Let Google help apps determine location. This means sending anonymous location data to Google, even when
                no apps are running.`}
              </DialogContent>
              <DialogActions>
                <Button variant="link" onClick={onClose}>
                  No
                </Button>
                <Button variant="link" onClick={handleYes}>
                  Yes
                </Button>
              </DialogActions>
            </Wrapper>
          </Backdrop>
        </Modal>
      )}
    </>
  );
};
