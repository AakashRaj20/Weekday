import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import ElectricBolt from "@mui/icons-material/ElectricBolt";

const JobDialougeBox = ({ jobDescription, jdLink }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        top: "-20px",
      }}
    >
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{
          color: "blue",
          letterSpacing: "2px",
          textTransform: "none",
        }}
      >
        View Job
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          {" "}
          <Typography variant="body1">{jobDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Link href={jdLink} target="_blank" underline="none">
            <Button
              varinat="contained"
              sx={{
                p: "0.5rem 3rem",
                display: "flex",
                gap: "5px",
                backgroundColor: "#55EFC4",
                color: "black",
                textTransform: "none",
              }}
            >
              <ElectricBolt sx={{ color: "yellow" }} /> Easy Apply
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobDialougeBox;
