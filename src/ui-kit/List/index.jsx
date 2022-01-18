import {Box} from "../Box";
import styled from "styled-components";

const StyledUl = styled(Box)`
	list-style-type: none;
`

export const Ul = (props) => {
	return <StyledUl as="ul" {...props} />
}
export const Li = (props) => {
	return <Box as="li" {...props} />
}