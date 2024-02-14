import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          sx={{ height: "100%" }}
          spacing={3}
          justifyContent={"space-between"}
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5,
                // for borderRadius: 1.5*8 = 12
              }}
            >
              <img src={Logo} alt="App Logo" />
            </Box>
            <Stack
              sx={{ width: "max-content" }}
              direction="column"
              alignItems="center"
              spacing={3}
            >
              {Nav_Buttons.map((el) =>
                el.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={el.index}
                    >
                      {el.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                    }}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(3);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <AntSwitch
              onChange={() => {
                onToggleMode();
              }}
              defaultChecked
            />
            <Avatar src={faker.image.avatar} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
      {/*Outlet is used so that the generalApp code can also be rendered*/}
    </>
  );
};

export default DashboardLayout;
