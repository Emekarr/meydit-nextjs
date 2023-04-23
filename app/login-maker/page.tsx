"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShowAlertBox, { AlertType } from "../reuseables/alertBox";
import MakerRequests from "../requests/maker";

export interface LoginFields {
  email: string;
  password: string;
}

const LoginMaker = () => {
  const router = useRouter();
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
  const [displayAlert, updateDisplayAlert] = useState<boolean>(false);
  const [alertMsg, updateAlertMsg] = useState<
    { msg: string; type: AlertType }[]
  >([]);
  return (
    <div className={styles.root}>
      <Typography className={styles.welcomeText}>
        Login to your MeydIt Maker account
      </Typography>
      <Typography>
        Don't have an account?{" "}
        <Link href={"/signup-maker"} className={styles.highlight}>
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
          name="email"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="password"
          variant="outlined"
          name="password"
        />
        <Button
          variant="contained"
          onClick={async () => {
            const response = await MakerRequests.loginMaker(formEntry);
            if (!response.success) {
              if (response.errors) {
                response.errors.forEach((e) => {
                  updateAlertMsg([
                    ...alertMsg,
                    { msg: e, type: AlertType.error },
                  ]);
                });
              } else {
                updateAlertMsg([
                  ...alertMsg,
                  { msg: response.message, type: AlertType.error },
                ]);
              }
              updateDisplayAlert(!displayAlert);
            } else {
              localStorage.setItem("profile", JSON.stringify(response.body));
              router.push("/dashboard");
            }
          }}
        >
          Login
        </Button>
        {typeof displayAlert === "boolean" && (
          <Stack
            className={styles.errStack}
            sx={{ width: "100%", height: "100%" }}
            spacing={3}
          >
            {alertMsg.map((m, i) => {
              return <ShowAlertBox key={i} message={m.msg} type={m.type} />;
            })}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default LoginMaker;
