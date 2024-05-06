import { useState, useEffect } from "react";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { selectedFilters, setCompanyname } from "../redux_store/slices/jobsApiSlice";
//import CloseIcon from "@mui/icons-material/Close";

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
  const [searchValue, setSearchvalue] = useState("")
  const [openStates, setOpenStates] = useState(
    Array(filterTypes.length).fill(false)
  );

  const handleOpen = (index) => {
    setOpenStates((prevOpenStates) => {
      const newOpenStates = [...prevOpenStates];
      newOpenStates[index] = true;
      return newOpenStates;
    });
  };

  const handleClose = (index) => {
    setOpenStates((prevOpenStates) => {
      const newOpenStates = [...prevOpenStates];
      newOpenStates[index] = false;
      return newOpenStates;
    });
  };

  const handleChange = (event, filterName) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [filterName]: value, // Update selected values for specific filter
    }));
  };

  const handleDelete = (e, value) => {
    // if (e.defaultPrevented) return; // Exits here if event has been handled
    // e.preventDefault();
    // console.log(value);
    // setSelectedValues((prevSelectedValues) => {
    //   console.log("Previous selected values:", prevSelectedValues);

    //   const updatedValues = { ...prevSelectedValues };
    //   updatedValues[filterName] = updatedValues[filterName].filter(
    //     (selectedValue) => selectedValue !== value
    //   );

    //   console.log("Updated values:", updatedValues);
    //   return updatedValues;
    // });
    //e.preventDefault();
    if (e.defaultPrevented) return; // Exits here if event has been handled
    e.preventDefault();

    console.log(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedFilters(selectedValues));
  }, [selectedValues]);

  console.log({ selectedValues });

  const handleSearchChange = (event) => {
    dispatch(setCompanyname(event.target.value));
    setSearchvalue(event.target.value);
  } 

  return (
    <Grid container columns={{ lg: 14 }} spacing={2}>
      {filterTypes.map((each, index) => {
        return (
          <Grid item key={index} xs={12} md={6} lg={2}>
            <FormControl fullWidth>
              <InputLabel id={`select-label-${each.name}`}>
                {each.label}
              </InputLabel>
              {each.type === "multiple" ? (
                <Select
                  open={openStates[index]}
                  onClose={() => handleClose(index)}
                  onOpen={() => handleOpen(index)}
                  multiple
                  labelId={`select-label-${each.name}`}
                  id={`select-${each.name}`}
                  value={selectedValues[each.name] || []}
                  label={each.label}
                  onChange={(e) => handleChange(e, each.name)}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dropdown menu from opening
                            handleDelete(e, value, each.name); // Call delete function
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {each.options.map((option, ind) => (
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(e, option.name);
                        handleClose(index);
                      }}
                      key={ind}
                      value={option.value}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Select
                  open={openStates[index]}
                  onClose={() => handleClose(index)}
                  onOpen={() => handleOpen(index)}
                  labelId={`select-label-${each.name}`}
                  id={`select-${each.name}`}
                  value={selectedValues[each.name] || ""}
                  label={each.label}
                  onChange={(e) => handleChange(e, each.name)}
                >
                  {each.options.map((option, ind) => (
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(e, option.name);
                        handleClose(index);
                      }}
                      key={ind}
                      value={option.value}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Grid>
        );
      })}
      <Grid item xs={12} md={6} lg={2}>
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
