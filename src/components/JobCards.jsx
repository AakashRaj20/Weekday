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
    <Grid container>
      {fetchedJobs.jdList.map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job.id}>
          <Card>
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
                //justifyContent: "center",
                gap: "15px",
                alignItems: "start",
                marginLeft: "0",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#55EFC4", color: "black" }}
              >
                <ElectricBoltIcon style={{ color: "yellow" }} /> Easy Apply
              </Button>
              <Button fullWidth variant="contained" style={{ marginLeft: "0" }}>
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
