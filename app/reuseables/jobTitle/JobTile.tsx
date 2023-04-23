"use client";
import { useState } from "react";
import styles from "./index.module.css";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export interface JobTileProps {
  budget: number;
  type: string;
  state: string;
  imageURLs: string[];
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
      <Typography
        onClick={() => {
          router.push("/jobDetails");
        }}
      >
        see more
      </Typography>
    </div>
  );
};

export default JobTile;
