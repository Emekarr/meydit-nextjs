"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { UserType } from "../requests/type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import JobTile from "../reuseables/jobTitle/JobTile";
import { useRouter } from "next/navigation";
import PlusOne from "@mui/icons-material/AddBox";
import JobRequests from "../requests/job";
import ShowAlertBox, { AlertType } from "../reuseables/alertBox";

export interface JobFields {
  postCode: string;
  state: string;
  address: string;
  firstName: string;
  lastName: string;
  type: string;
  images: FileList | null;
  description: string;
  budget: number | null;
}

const Dashboard = () => {
  const router = useRouter();
  const [user, updateUser] = useState<UserType | null>(null);
  const [open, setOpen] = useState(false);
  const [formEntry, updateFormEntry] = useState<JobFields>({
    postCode: "",
    state: "",
    address: "",
    firstName: "",
    lastName: "",
    type: "",
    images: null,
    description: "",
    budget: null,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [displayAlert, updateDisplayAlert] = useState<boolean>(false);

  const [alertMsg, updateAlertMsg] = useState<
    { msg: string; type: AlertType }[]
  >([]);

  const handleUpdateFormEntry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = event.target;
    if (name === "images") {
      const reader = new FileReader();
      reader.readAsDataURL(files![0]);
      reader.onloadend = () => {
        updateFormEntry((data) => ({ ...data, images: files }));
      };
    }
    updateFormEntry((data) => ({ ...data, [name]: value }));
  };
  useEffect(() => {
    let cachedUser = localStorage.getItem("profile");
    if (!cachedUser) {
      router.push("/login");
      return;
    }
    updateUser(JSON.parse(cachedUser ?? ""));
  }, []);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Typography variant="h5">Welcome back {user?.first_name}</Typography>
      </header>
      <div className={styles.body}>
        <div className={styles.jobHeader}>
          <Typography variant="h4" className={styles.jobHeaderText}>
            Your jobs
          </Typography>
          <div className={styles.createJobBtn} onClick={handleClickOpen}>
            Add Job <PlusOne />
          </div>
        </div>
        <Stack className={styles.jobListing}></Stack>
      </div>
      <Dialog className={styles.createJobForm} open={open}>
        <DialogTitle>Create New Job Listing</DialogTitle>
        <DialogContent className={styles.createJobFields}>
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="firstName"
            label="first name"
            type="name"
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="lastName"
            label="last name"
            type="name"
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="type"
            label="type"
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="description"
            label="description"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="address"
            label="address"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="state"
            label="state"
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="postCode"
            label="postCode"
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="budget"
            label="budget"
            type="number"
            variant="outlined"
          />
          <input
            name="images"
            onChange={handleUpdateFormEntry}
            type="file"
            className={styles.createJobFields}
            multiple
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              const response = await JobRequests.createJob(formEntry);
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
              } else {
                updateAlertMsg([
                  ...alertMsg,
                  { msg: response.message, type: AlertType.success },
                ]);
                setOpen(false);
              }
              updateDisplayAlert(!displayAlert);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>{" "}
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
    </div>
  );
};

export default Dashboard;
