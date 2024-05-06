import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  selectedFilters,
  setCompanyname,
} from "../redux_store/slices/jobsApiSlice";


const Filters = () => {
  const filterTypes = [
    {
      name: "role",
      type: "multiple",
      label: "Roles",
      options: [
        { name: "Frontend", value: "frontend" },
        { name: "Backend", value: "backend" },
        { name: "Fullstack", value: "fullstack" },
        { name: "Devops", value: "devops" },
        { name: "IOS", value: "ios" },
        { name: "Android", value: "android" },
        { name: "React Native", value: "react native" },
        { name: "Flutter", value: "flutter" },
        { name: "Tech Lead", value: "tech lead" },
        { name: "Project Manager", value: "project manager" },
        { name: "QA", value: "qa" },
        { name: "Web3", value: "web3" },
        { name: "Data Science", value: "data science" },
        { name: "Machine Learning", value: "machine learning" },
      ],
    },
    {
      name: "min_experience",
      label: "Experience",
      type: "single",
      options: [
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" },
      ],
    },
    {
      name: "remote",
      label: "Remote",
      type: "multiple",
      options: [
        { name: "Remote", value: "Remote" },
        { name: "On-site", value: "On-site" },
        { name: "Hybrid", value: "Hybrid" },
      ],
    },
    {
      name: "tech_stack",
      label: "Tech Stack",
      type: "multiple",
      options: [
        { name: "React", value: "React" },
        { name: "Node", value: "Node" },
        { name: "Python", value: "Python" },
        { name: "Ruby", value: "Ruby" },
        { name: "Java", value: "Java" },
        { name: "C#", value: "C#" },
        { name: "Go", value: "Go" },
        { name: "PHP", value: "PHP" },
        { name: "Swift", value: "Swift" },
        { name: "Kotlin", value: "Kotlin" },
        { name: "Dart", value: "Dart" },
        { name: "Solidity", value: "Solidity" },
        { name: "Flask", value: "Flask" },
        { name: "NextJS", value: "NextJS" },
      ],
    },
    {
      name: "min_base_salary",
      label: "Minimum Base Pay Salary",
      type: "single",
      options: [
        { name: "OL", value: 0 },
        { name: "10L", value: 10 },
        { name: "20L", value: 20 },
        { name: "30L", value: 30 },
        { name: "40L", value: 40 },
        { name: "50L", value: 50 },
        { name: "60L", value: 60 },
        { name: "70L", value: 70 },
      ],
    },
    {
      name: "location",
      label: "Location",
      type: "multiple",
      options: [
        { name: "Bangalore", value: "bangalore" },
        { name: "Mumbai", value: "mumbai" },
        { name: "Delhi", value: "delhi" },
        { name: "Chennai", value: "chennai" },
        { name: "Pune", value: "pune" },
        { name: "Hyderabad", value: "hyderabad" },
        { name: "Kolkata", value: "kolkata" },
        { name: "GuruGram", value: "guruGram" },
        { name: "Noida", value: "noida" },
        { name: "Ahmedabad", value: "ahmedabad" },
      ],
    },
  ];

  const [selectedValues, setSelectedValues] = useState({});
  const [searchValue, setSearchvalue] = useState("");
  
  const handleChange = (event, filterName) => {
    let { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [filterName]: value,
    }));
  };

  console.log({ selectedValues });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedFilters(selectedValues));
  }, [selectedValues]);

  console.log({ selectedValues });

  const handleSearchChange = (event) => {
    dispatch(setCompanyname(event.target.value));
    setSearchvalue(event.target.value);
  };

  return (
    <Grid
      container
      columns={{ xs: 14, sm: 14, md: 14, lg: 14, xl: 14 }}
      spacing={2}
    >
      {filterTypes.map((each, index) => {
        return (
          <Grid item key={index} xs={7} sm={7} md={7} lg={2}>
            <FormControl fullWidth>
              {each.type === "multiple" ? (
                <Autocomplete
                  sx={{ m: 1, width: "100%" }}
                  multiple
                  options={each.options.map((option) => option.name)}
                  value={selectedValues[each.name] || []}
                  onChange={(e, newValue) =>
                    handleChange({ target: { value: newValue } }, each.name)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={each.label}
                      
                    />
                  )}
                  
                  
                />
              ) : (
                <Autocomplete
                  sx={{ m: 1, width: "100%" }}
                  options={each.options.map((option) => option.name)}
                  value={selectedValues[each.name] || []}
                  onChange={(e, newValue) =>
                    handleChange({ target: { value: newValue } }, each.name)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={each.label}
                    />
                  )}
                />
              )}
            </FormControl>
          </Grid>
        );
      })}
      <Grid sx={{ display: "flex", alignItems: "center" }} item xs={14} md={14} lg={2}>
        <TextField
          label="Seacrh Company Name"
          variant="outlined"
          value={searchValue}
          fullWidth
          onChange={handleSearchChange}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
