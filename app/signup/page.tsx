"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

interface SignupFields {
  email: string;
  password: string;
  phone: string;
  lastName: string;
  firstName: string;
}

const SignUp = () => {
  const [formEntry, updateFormEntry] = useState<SignupFields>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const handleUpdateFormEntry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    updateFormEntry((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className={styles.root}>
      <Typography className={styles.welcomeText}>SignUp to MeydIt</Typography>
      <Typography>
        Have an account?{" "}
        <Link href={"/login"} className={styles.highlight}>
          login
        </Link>
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className={styles.form}
      >
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="email"
          variant="outlined"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="phone"
          variant="outlined"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="first name"
          variant="outlined"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="last name"
          variant="outlined"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="password"
          variant="outlined"
        />
        <Button variant="contained">Sign Up</Button>
      </Box>
    </div>
  );
};

export default SignUp;
