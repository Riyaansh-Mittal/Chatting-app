import { Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

const RHFCodes = ({ keyName = "", inputs = [], ...other }) => {
  const codesRef = useRef(null);
  const { control } = useFormContext();

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace(keyName, "");
    //get the index from name
    const fieldIntIndex = Number(fieldIndex);
    //convert it to number
    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );
    //get the next input field
    if (value.length > maxLength) {
      event.target.value = value[0];
    }
    //if copying a code, only copy 1st number and focus on next input field
    if (value.length >= maxLength && fieldIntIndex < 6 && nextField !== null) {
      nextField.focus();
    }

    handleChange(event);
  };

  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent={"center"}
      ref={codesRef}
    >
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            //autofocus in below so that as page loads, focus goes on to first OTP input
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder={"-"}
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
};

export default RHFCodes;
