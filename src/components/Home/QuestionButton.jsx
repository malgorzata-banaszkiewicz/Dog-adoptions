import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Image,
  ImageBackdrop,
  ImageButton,
  ImageMarked,
  ImageSrc,
} from "./QuestionButtonStyles";

export const QuestionButton = ({ onClick }) => {
  const images = [
    {
      url: "src/assets/questionphoto2.png",
      title: "Pytania pomocnicze",
      width: "70%",
    },
  ];
  return (
    <>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: "30%",
            margin: "0 auto",
          }}
          onClick={onClick}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                fontFamily: "Bagel Fat One, cursive",
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </>
  );
};
