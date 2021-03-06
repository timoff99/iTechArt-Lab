import React, { useState, useEffect, useContext, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

import { ReactComponent as Logo } from "../../../static/icons/logo.svg";
import person from "../../../static/icons/person.svg";
import { Input } from "../Input";
import { Button } from "../Button";
import { Box } from "../../helpers/Box";
import { StyledContainer, User } from "./styles";
import { Li, Ul } from "../../helpers/List";
import { LinkRenderer, Paragraph } from "../../helpers/Text";
import { Modal } from "../Modal";
import { CreateCookBook } from "../ModalContent/CreateCookBook";
import { UserContext } from "../UserProvider";
import { useUrl } from "../../../hooks/useUrl";
import { ROUTE_NAMES } from "../../../router/routeNames";
import { Burger } from "./Burger";
import { MenuSearch } from "./Menu/MenuSearch";
import { MenuProfile } from "./Menu/MenuProfile";

import UserService from "../../../services/user.service";

export const Header = memo(({ mainPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { query, updateQuery } = useUrl();
  const navigation = useNavigate();
  const TryGetUser = async () => {
    if (!user.username) {
      try {
        const getUser = await UserService.getUser();
        setUser(getUser.data.user);
      } catch (error) {
        navigation(ROUTE_NAMES.HOME, { replace: true });
      }
    }
  };

  useEffect(() => {
    TryGetUser();
  }, []);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const debouncedChange = debounce((value) => {
    if (value === "") {
      return updateQuery(value);
    }
    updateQuery({ search: value });
  }, 500);

  const handleChange = useCallback(
    (e) => {
      debouncedChange(e.target.value);
    },
    [debouncedChange]
  );

  return (
    <Box boxShadow="0px 0px 16px rgba(0, 0, 0, 0.08)">
      <StyledContainer>
        <Box display={["flex", "none", "none"]}>
          <Burger display={["flex", "none", "none"]} open={openSearchMenu} setOpen={setOpenSearchMenu} />
          <MenuSearch open={openSearchMenu} setOpen={setOpenSearchMenu} />
        </Box>
        <LinkRenderer href={ROUTE_NAMES.HOME} inline>
          <Logo />
        </LinkRenderer>

        <Ul display={["none", "flex", null]} pl={0}>
          <Li mr={mainPage ? "72px" : 9}>
            <LinkRenderer href={ROUTE_NAMES.SEARCHTABRECIPES} color="secondary.main" inline>
              Recipes
            </LinkRenderer>
          </Li>
          <Li mr={0}>
            <LinkRenderer href={ROUTE_NAMES.SEARCHTABCOOKBOOKS} color="secondary.main" inline>
              Cookbooks
            </LinkRenderer>
          </Li>
        </Ul>

        {!mainPage && (
          <Input
            display={["none", "block", null]}
            type="text"
            name="smallSearch"
            variantLabel="smallLabel"
            variantInput="smallInput"
            inputSize="sm"
            labelSize="sm"
            defaultValue={query.search}
            handleChange={handleChange}
          />
        )}

        <Button display={["none", null, "block"]} size="sm" variant="outlined" onClick={openModal}>
          Create cookBook
        </Button>
        {user.username ? (
          <Box position="relative">
            <User onClick={() => setOpenProfileMenu(!openProfileMenu)}>
              <img src={person} alt="person" />
              <Paragraph fontSize={1} color="secondary.main" overflow="hidden" height="26px" width="76px">
                {user.username}
              </Paragraph>
            </User>
            <MenuProfile open={openProfileMenu} setOpen={setOpenProfileMenu} />
          </Box>
        ) : (
          <LinkRenderer href={ROUTE_NAMES.LOGIN} color="secondary.main" inline>
            <Paragraph fontSize={1} color="secondary.main">
              Sign In
            </Paragraph>
          </LinkRenderer>
        )}
      </StyledContainer>
      {showModal && (
        <Modal showModal={showModal} setShowModal={openModal}>
          <CreateCookBook setShowModal={openModal} />
        </Modal>
      )}
    </Box>
  );
});
