import { styled } from "@mui/system";

export const QuestionFormAndDogsShow = styled("div")(
  ({ qform, isSmallestScreen }) =>
    `
        display: ${qform ? "flex" : "block"};
        flex-direction: ${isSmallestScreen ? "column" : "row-reverse"};
        justify-content: space-between;
    `
);
