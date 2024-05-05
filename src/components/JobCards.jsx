import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  selectJobs,
  selectLoading,
} from "../redux_store/slices/jobsApiSlice";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

const JobCards = () => {
  const companyNameStyle = {
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "1px",
    color: "#8b8b8b",
  };

  const jobRoleStyle = {
    fontSize: "20px",
    letterSpacing: "1px",
  };

  const jobLocationStyle = {
    fontSize: "13px",
    letterSpacing: "1px",
    marginBottom: "3px",
  };

  const salaryStyle = {
    fontSize: "15px",
    padding: "0 20px",
    display: "flex",
    gap: "6px",
    alignItem: "center",
  };

  const dispatch = useDispatch();

  const fetchedJobs = useSelector(selectJobs);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <Grid container columnSpacing={10} rowSpacing={5}>
      {fetchedJobs.jdList.map((job) => (
        <Grid item xs={12} sm={6} lg={4} key={job.id}>
          <Card elevation={3} style={{ borderRadius: "1.5rem", padding: "1rem 2rem" }}>
            <Box style={{ display: "flex", padding: "20px", gap: "10px" }}>
              <img
                style={{ width: "35px", height: "35px" }}
                src={job.logoUrl}
                alt={`${job.companyName} logo`}
              />
              <Box>
                <Typography style={companyNameStyle} variant="h6">
                  {job.companyName}
                </Typography>
                <Typography
                  className="job-role"
                  style={jobRoleStyle}
                  variant="h6"
                >
                  {job.jobRole}
                </Typography>
                <Typography
                  style={jobLocationStyle}
                  className="job-location"
                  variant="h6"
                >
                  {job.location}
                </Typography>
              </Box>
            </Box>
            <Typography style={salaryStyle}>
              Estimated Salary: {`₹${job.minJdSalary} - ${job.maxJdSalary} LPA`}
              <CheckBoxIcon color="success" />
            </Typography>
            <CardContent>
              <Typography
                style={{ fontWeight: 500, fontSize: "20px" }}
                varinat="h6"
              >
                About Company:
              </Typography>
              <Typography
                style={{ fontWeight: 300, fontSize: "15px" }}
                varinat="body1"
              >
                {job.jobDetailsFromCompany}
              </Typography>
              <Box>
                <Typography varinat="body1" sx={{ color: "blue", position: "relative", top: "-20px",  }}>
                  View Job
                </Typography>
              </Box>
              <Box style={{ margin: "15px auto" }}>
                <Typography>
                  Minimum Experience: <br />
                  <span>{job.minExp} years</span>
                </Typography>
              </Box>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                alignItems: "start",
                marginLeft: "0",
                padding: "0 18px",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                style={{ display: "flex", gap: "10px", backgroundColor: "#55EFC4", color: "black", textTransform: "none"}}
              >
                <ElectricBoltIcon style={{ color: "yellow" }} /> Easy Apply
              </Button>
              <Button fullWidth variant="contained" style={{ marginLeft: "0", textTransform: "none" }}>
                Unlock referal asks
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobCards;
