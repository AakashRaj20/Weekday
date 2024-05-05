import { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Filters = () => {
  const filterTypes = [
    {
      name: "role",
      label: "Roles",
      options: [
        { name: "Frontend", value: "Frontend" },
        { name: "Backend", value: "Backend" },
        { name: "Fullstack", value: "Fullstack" },
        { name: "Devops", value: "Devops" },
        { name: "IOS", value: "IOS" },
        { name: "Android", value: "Android" },
        { name: "React Native", value: "React Native" },
        { name: "Flutter", value: "Flutter" },
        { name: "Tech Lead", value: "Tech Lead" },
        { name: "Project Manager", value: "Project Manager" },
        { name: "QA", value: "QA" },
        { name: "Web3", value: "Web3" },
        { name: "Data Science", value: "Data Science" },
        { name: "Machine Learning", value: "Machine Learning" },
      ],
    },
    {
      name: "min experience",
      label: "Experience",
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
      name: "Remote",
      label: "Remote",
      options: [
        { name: "Remote", value: "Remote" },
        { name: "On-site", value: "On-site" },
        { name: "Hybrid", value: "Hybrid" },
      ],
    },
    {
      name: "Tech Stack",
      label: "Tech Stack",
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
      name: "Min base salary",
      label: "Minimum Base Pay Salary",
      options: [
        { name: "OL", value: "0L" },
        { name: "10L", value: "10L" },
        { name: "20L", value: "20L" },
        { name: "30L", value: "30L" },
        { name: "40L", value: "40L" },
        { name: "50L", value: "50L" },
        { name: "60L", value: "60L" },
        { name: "70L", value: "70L" },
      ],
    },
    {
      name: "Company Name",
      label: "Company Name",
      options: [
        { name: "Google", value: "Google" },
        { name: "Facebook", value: "Facebook" },
        { name: "Amazon", value: "Amazon" },
        { name: "Microsoft", value: "Microsoft" },
        { name: "Apple", value: "Apple" },
        { name: "Netflix", value: "Netflix" },
        { name: "Tesla", value: "Tesla" },
        { name: "Twitter", value: "Twitter" },
        { name: "Uber", value: "Uber" },
        { name: "Airbnb", value: "Airbnb" },
        { name: "Coinbase", value: "Coinbase" },
        { name: "Robinhood", value: "Robinhood" },
        { name: "Stripe", value: "Stripe" },
        { name: "Slack", value: "Slack" },
        { name: "Zoom", value: "Zoom" },
      ],
    },
    {
      name: "Location",
      label: "Location",
      options: [
        { name: "Bangalore", value: "Bangalore" },
        { name: "Mumbai", value: "Mumbai" },
        { name: "Delhi", value: "Delhi" },
        { name: "Chennai", value: "Chennai" },
        { name: "Pune", value: "Pune" },
        { name: "Hyderabad", value: "Hyderabad" },
        { name: "Kolkata", value: "Kolkata" },
        { name: "GuruGram", value: "GuruGram" },
        { name: "Noida", value: "Noida" },
        { name: "Ahmedabad", value: "Ahmedabad" },
      ],
    },
  ];

  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (event, filterName) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [filterName]: value, // Update selected values for specific filter
    }));
  };

  const handleDelete = (e, value, filterName) => {
    console.log("Deleting:", value, "from filter:", filterName);
    e.preventDefault();
    setSelectedValues((prevSelectedValues) => {
      console.log("Previous selected values:", prevSelectedValues);

      const updatedValues = { ...prevSelectedValues };
      updatedValues[filterName] = updatedValues[filterName].filter(
        (selectedValue) => selectedValue !== value
      );

      console.log("Updated values:", updatedValues);
      return updatedValues;
    });
  };

  return (
    <Grid container columns={{ lg: 14 }} spacing={2}>
      {filterTypes.map((each, index) => {
        return (
          <Grid item key={index} xs={12} md={6} lg={2}>
            <FormControl fullWidth>
              <InputLabel id={`select-label-${each.name}`}>
                {each.label}
              </InputLabel>
              <Select
                autoWidth
                labelId={`select-label-${each.name}`}
                id={`select-${each.name}`}
                multiple
                value={selectedValues[each.name] || []} // Get selected values for specific filter
                onChange={(e) => handleChange(e, each.name)}
                input={
                  <OutlinedInput
                    id={`select-outlined-${each.name}`}
                    label={each.label}
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={(e) => handleDelete(e, value, each.name)}
                      />
                    ))}
                  </Box>
                )}
              >
                {each.options.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Filters;
