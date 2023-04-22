"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import ShowAlertBox, { AlertType } from "../reuseables/alertBox";

interface LoginFields {
  email: string;
  password: string;
}

const Login = () => {
  const [formEntry, updateFormEntry] = useState<LoginFields>({
    email: "",
    password: "",
  });
  const handleUpdateFormEntry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    updateFormEntry((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className={styles.root}>
      <Typography className={styles.welcomeText}>Login to MeydIt</Typography>
      <Typography>
        Don't have an account?{" "}
        <Link href={"/signup"} className={styles.highlight}>
          sign up
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
          label="password"
          variant="outlined"
        />
        <Button variant="contained">Login</Button>
      </Box>
    </div>
  );
};

export default Login;
