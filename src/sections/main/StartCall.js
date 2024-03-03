import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement} from "../../components/CallElement";
import { MembersList } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      onClose={handleClose}
    >
      {/*Title */}
      <DialogTitle sx={{ mb: 2 }}>Start Call</DialogTitle>

      {/*Dialog */}
      <DialogContent>
        <Stack spacing={3}><Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        {MembersList.map((el) => <CallElement {...el}/>)}</Stack>
        
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
