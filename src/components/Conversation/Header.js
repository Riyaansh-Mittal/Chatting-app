import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "../StyledBadge";
import { faker } from "@faker-js/faker";
import { toggleSidebar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        height: 100,
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }} 
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%", height: "100%" }}
        p={3}
      >
        <Stack
          onClick={() => {
            dispatch(toggleSidebar());
          }}
          direction={"row"}
          spacing={2}
        >
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="User Avatar" src={faker.image.avatar()} />
            </StyledBadge>
          </Box>
          <Stack spacing={0.2}>
            <Typography>{faker.name.fullName()}</Typography>
            <Typography variant={"caption"}>Online</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
