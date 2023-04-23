"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import ShowAlertBox, { AlertType } from "../reuseables/alertBox";
import { useRouter } from "next/navigation";
import MakerRequests from "../requests/maker";

export interface SignupMakerFields {
  email: string;
  password: string;
  name: string;
  bio: string | null;
}

const SignUpMaker = () => {
  const router = useRouter();
  const [formEntry, updateFormEntry] = useState<SignupMakerFields>({
    email: "",
    password: "",
    bio: null,
    name: "",
  });

  const [displayAlert, updateDisplayAlert] = useState<boolean>(false);
  const [alertMsg, updateAlertMsg] = useState<
    { msg: string; type: AlertType }[]
  >([]);

  const handleUpdateFormEntry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    updateFormEntry((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className={styles.root}>
      <Typography className={styles.welcomeText}>
        Create a Maker account on MeydIt
      </Typography>
      <Typography>
        Have an account?{" "}
        <Link href={"/login-maker"} className={styles.highlight}>
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
          name="email"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="password"
          variant="outlined"
          name="password"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="name"
          variant="outlined"
          name="name"
        />
        <TextField
          onChange={handleUpdateFormEntry}
          className={styles.formField}
          label="bio"
          variant="outlined"
          multiline
          rows={3}
          name="bio"
        />
        <Button
          variant="contained"
          onClick={async () => {
            const response = await MakerRequests.createMakerAccount(formEntry);
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
          Sign Up
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

export default SignUpMaker;
