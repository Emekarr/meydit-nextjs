"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { UserType } from "../requests/type";
import { Stack, Typography } from "@mui/material";
import JobTile from "../reuseables/jobTitle/JobTile";

const Dashboard = () => {
  const [user, updateUser] = useState<UserType | null>(null);
  useEffect(() => {
    const cachedUser = localStorage.getItem("profile");
    updateUser(JSON.parse(cachedUser ?? ""));
  }, []);
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Typography variant="h5">Welcome back {user?.first_name}</Typography>
      </header>
      <div className={styles.body}>
        <Typography variant="h4" className={styles.jobHeader}>
          Your jobs
        </Typography>
        <Stack className={styles.jobListing}></Stack>
      </div>
    </div>
  );
};

export default Dashboard;
