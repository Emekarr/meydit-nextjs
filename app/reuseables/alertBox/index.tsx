import { Alert, IconButton, Snackbar } from "@mui/material";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export enum AlertType {
  error = "error",
  warning = "warning",
  info = "info",
  success = "success",
}

interface AlertBoxProp {
  message: string;
  type: AlertType;
}

const ShowAlertBox = ({ message, type }: AlertBoxProp) => {
  const [open, updateOpen] = useState<boolean>(true);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    updateOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ShowAlertBox;
