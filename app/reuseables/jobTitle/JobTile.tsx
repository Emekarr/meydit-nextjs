"use client";
import { useState } from "react";
import styles from "./index.module.css";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ShowAlertBox, { AlertType } from "../alertBox";
import QuotationRequests from "@/app/requests/quotation";

export interface JobTileProps {
  id: string;
  budget: number;
  type: string;
  state: string;
  imageURLs: string[];
}

export interface QuotationFields {
  comment: string | null;
  price: string;
  jobID: string;
}

const JobTile = (props: JobTileProps) => {
  const router = useRouter();
  const goToNext = () => {
    const newIndex =
      currentSlide === props.imageURLs.length - 1 ? 0 : currentSlide + 1;
    updateSlide(newIndex);
  };
  const goPrevious = () => {
    const newIndex =
      currentSlide === 0 ? props.imageURLs.length - 1 : currentSlide - 1;
    updateSlide(newIndex);
  };
  const [currentSlide, updateSlide] = useState<number>(0);

  const [open, setOpen] = useState(false);

  const [formEntry, updateFormEntry] = useState<QuotationFields>({
    price: "",
    comment: null,
    jobID: "",
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
    const { name, value } = event.target;
    updateFormEntry((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className={styles.tile}>
      <div className={styles.tileSlider}>
        <div onClick={goPrevious}>
          <ArrowLeft className={styles.leftSliderArrow} />
        </div>
        <div onClick={goToNext}>
          <ArrowRight className={styles.rightSliderArrow} />
        </div>
        <div
          className={styles.tileImage}
          style={{ backgroundImage: `url(${props.imageURLs[currentSlide]})` }}
        />
      </div>
      <Typography>
        Budget : ${props.budget.toString().substring(0, 15)}
      </Typography>
      <Typography>Type : {props.type.substring(0, 15)}</Typography>
      <Typography>Location : {props.state.substring(0, 15)}</Typography>
      <Button
        className={styles.seeDetails}
        onClick={() => {
          router.push("/jobDetails");
        }}
      >
        see more
      </Button>
      <Button className={styles.makeQuote} onClick={handleClickOpen}>
        make quote
      </Button>

      <Dialog className={styles.createJobForm} open={open}>
        <DialogTitle>Create New Job Listing</DialogTitle>
        <DialogContent className={styles.createJobFields}>
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="price"
            label="price"
            variant="outlined"
          />
          <TextField
            autoFocus
            onChange={handleUpdateFormEntry}
            className={styles.createJobFields}
            margin="dense"
            name="comment"
            label="comment"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              formEntry.jobID = props.id;
              const response = await QuotationRequests.createQuotation(
                formEntry
              );
              if (response.success) {
                setOpen(false);
              }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobTile;
