import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import ProgressSlider from "./ProgressSlider";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { steps } from "./steps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { validateStep1, validateStep2, validateStep3 } from "./Validation";
import DoneIcon from "@mui/icons-material/Done";
import handleSubmit from "./handleSubmit";

const CustomStepIcon = (s) => {
  return (
    <div style={{ width: 22, height: 22 }}>
      <AccountCircleIcon style={{ color: "#00b4d8", fontSize: 22 }} />
    </div>
  );
};

export default function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNameError, setIsNameError] = useState(false);
  const [isCourseError, setIsCourseError] = useState(false);
  const [isYearError, setIsYearError] = useState(false);
  const [isLocationError, setIsLocationError] = useState(false);
  const [isCompanyError, setIsCompanyError] = useState(false);
  const [isDesignationError, setIsDesignationError] = useState(false);
  const [isIndustryError, setIsIndustryError] = useState(false);
  const [isOffersError, setIsOffersError] = useState(false);
  const [isLinkedinError, setIsLinkedinError] = useState(false);
  const [isWebsiteError, setIsWebsiteError] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedMember, setSelectedMember] = useState({});
  const router = useRouter();
  const { id: groupId, memberId } = router.query;
  console.log("groupId in form:", groupId);
  console.log("memberId in form:", memberId);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`)
      .then((response) => {
        setSelectedMember(response.data);
        console.log(
          "selected member in form: " + JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${groupId}`)
      .then((response) => {
        setSelectedGroup(response.data);
        console.log("selected group in form: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [inputFieldValues, setInputFieldValues] = useState({
    name: "",
    image: "",
    course: "",
    year: "",
    location: "",
    phone: "",
    company: "",
    designation: "",
    industry: "",
    offers: "",
    linkedin: "",
    website: "",
  });
  const [filledFields, setFilledFields] = useState(
    steps(selectedGroup).map(() => new Set())
  );
  const [stepContentVisibility, setStepContentVisibility] = useState(
    Array(steps.length).fill(false)
  );
  const [fieldErrors, setFieldErrors] = useState({});

  const handleStepLabelClick = (index) => {
    setStepContentVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });

    if (!stepContentVisibility[index]) {
      setActiveStep(index);
    } else {
      setActiveStep(-1);
    }
  };

  useEffect(() => {
    setStepContentVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[0] = true;
      return updatedVisibility;
    });
  }, []);

  const calculateProgressPercentage = () => {
    const filledMandatoryFieldsCount = Object.keys(inputFieldValues).filter(
      (field) =>
        inputFieldValues[field] !== "" &&
        steps(selectedGroup).find((step) =>
          step.mandatoryFields.includes(field)
        )
    ).length;

    const progressPercentage = (filledMandatoryFieldsCount / 12) * 100;

    return progressPercentage;
  };

  const handleNext = () => {
    console.log("continue btn clicked");
    console.log("active before: " + activeStep);
    // Validate the fields for the current step
    let validationErrors = {};
    if (activeStep === 0) {
      validationErrors = validateStep1(inputFieldValues);
    } else if (activeStep === 1) {
      validationErrors = validateStep2(inputFieldValues);
    } else if (activeStep === 2) {
      validationErrors = validateStep3(inputFieldValues);
    }

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    if (activeStep < steps.length - 1) {
      setStepContentVisibility((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[activeStep] = false;
        updatedVisibility[activeStep + 1] = true;
        return updatedVisibility;
      });

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    console.log("active step: " + activeStep);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setStepContentVisibility((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[activeStep] = false;
        updatedVisibility[activeStep - 1] = true;
        return updatedVisibility;
      });

      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleFieldChange = (event, fieldLabel) => {
    const newValue = event.target.value;

    // Validate the field and store the error in the fieldErrors state
    let validationFunction = null;

    switch (fieldLabel) {
      case "name":
        validationFunction = validateStep1;
        break;
      case "course":
        validationFunction = validateStep1;
        break;
      case "year":
        validationFunction = validateStep1;
        break;
      case "location":
        validationFunction = validateStep1;
        break;
      case "company":
        validationFunction = validateStep2;
        break;
      case "designation":
        validationFunction = validateStep2;
        break;
      case "industry":
        validationFunction = validateStep2;
        break;
      case "offers":
        validationFunction = validateStep2;
        break;
      case "linkedin":
        validationFunction = validateStep3;
        break;
      case "website":
        validationFunction = validateStep3;
        break;
      default:
        break;
    }

    if (validationFunction) {
      const error = validationFunction(newValue);
      switch (fieldLabel) {
        case "name":
          setIsNameError(!!error.name);
          if (error.name) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "course":
          setIsCourseError(!!error.course);
          if (error.course) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "year":
          setIsYearError(!!error.year);
          if (error.year) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "location":
          setIsLocationError(!!error.location);
          if (error.location) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "company":
          setIsCompanyError(!!error.company);
          if (error.company) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "designation":
          setIsDesignationError(!!error.designation);
          if (error.designation) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "industry":
          setIsIndustryError(!!error.industry);
          if (error.industry) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "offers":
          setIsOffersError(!!error.offers);
          if (error.offers) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "linkedin":
          setIsLinkedinError(!!error.linkedin);
          if (error.linkedin) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        case "website":
          setIsWebsiteError(!!error.website);
          if (error.website) {
            setFieldErrors((prevErrors) => ({
              ...prevErrors,
              [fieldLabel]: "",
            }));
          }
          break;
        default:
          break;
      }
    }

    // Update the field value in the inputFieldValues state
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: newValue,
    }));

    const currentStepFilledFields = filledFields[activeStep];
    if (newValue) {
      currentStepFilledFields.add(fieldLabel);
    } else {
      currentStepFilledFields.delete(fieldLabel);
    }
  };

  const calculateStepStatus = () => {
    const stepStatus = steps(selectedGroup).map((step, index) => {
      const currentStepFilledFields = filledFields[index];
      const mandatoryFieldsCount = step.mandatoryFields.length;
      let unfilledMandatoryFieldsCount = mandatoryFieldsCount;

      step.mandatoryFields.forEach((field) => {
        if (currentStepFilledFields.has(field)) {
          unfilledMandatoryFieldsCount--;
        }
      });

      return unfilledMandatoryFieldsCount === 0 ? (
        <DoneIcon style={{ color: "#38b000", fontSize: 28, fontWeight: 800 }} />
      ) : (
        `${unfilledMandatoryFieldsCount} fields left`
      );
    });

    return stepStatus;
  };
  const selectedGroupType = selectedGroup.groupType;
  // const handleSubmitForm = (memberId) => {
  //   console.log("memberId in handle" + memberId);
  //   handleSubmit(
  //     inputFieldValues,
  //     groupId,
  //     memberId,
  //     router,
  //     selectedGroupType
  //   );
  // };
  const handleSubmitForm = (memberId) => {
    console.log("memberId in handlesubmit: " + memberId);
    const step1Errors = validateStep1(inputFieldValues, selectedGroupType);
    const step2Errors = validateStep2(inputFieldValues);
    const step3Errors = validateStep3(inputFieldValues);

    const combinedErrors = {
      ...step1Errors,
      ...step2Errors,
      ...step3Errors,
    };
    console.log("combinedErrors:" + JSON.stringify(combinedErrors));
    if (Object.keys(combinedErrors).length > 0) {
      setFieldErrors(combinedErrors);
    } else {
      inputFieldValues.memberId = memberId;
      inputFieldValues.groupId = groupId;
      console.log("inputFieldValues:" + JSON.stringify(inputFieldValues));
      const formData = new FormData();

      for (const fieldLabel in inputFieldValues) {
        formData.append(fieldLabel, inputFieldValues[fieldLabel]);
        console.log(`Appended ${fieldLabel}: ${inputFieldValues[fieldLabel]}`);
      }
      console.log("formData: " + JSON.stringify(inputFieldValues));

      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`,
          inputFieldValues
        )
        .then((response) => {
          console.log("Profile updated successfully!");
          console.log("updatedProfile: " + JSON.stringify(response.data));
          router.push({
            pathname: "/membergrouppage",
            query: { id: groupId },
          });
        })
        .catch((error) => {
          console.error("Error adding profile: ", error);
        });
    }
  };
  return (
    <Box className={styles.content_container}>
      <ProgressSlider progressPercentage={calculateProgressPercentage()} />
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={styles.stepper}
      >
        {steps(selectedGroup).map((step, index) => (
          <Step
            key={step.label}
            className={styles.step}
            sx={{
              borderTopLeftRadius: activeStep === index ? 20 : 5,
              borderTopRightRadius: activeStep === index ? 20 : 5,
            }}
          >
            <StepLabel
              onClick={() => handleStepLabelClick(index)}
              sx={{
                border: activeStep === index ? "#03045e" : "transparent",
                borderBottom:
                  activeStep === index ? "1px solid #03045e" : "none",
                backgroundColor: activeStep === index ? "#03045e" : "#fffae5",
                borderTopLeftRadius: activeStep === index ? 20 : 5,
                borderTopRightRadius: activeStep === index ? 20 : 5,
                padding: 2,
              }}
              icon={
                activeStep === index ? <CustomStepIcon /> : <CustomStepIcon />
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: activeStep === index ? "#fff" : "#121212",
                  }}
                >
                  {step.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color:
                      (index === 0 && isNameError) ||
                      (index === 0 && isCourseError) ||
                      (index === 0 && isYearError) ||
                      (index === 0 && isLocationError)
                        ? "red"
                        : (index === 1 && isCompanyError) ||
                          (index === 1 && isDesignationError) ||
                          (index === 1 && isIndustryError) ||
                          (index === 1 && isOffersError)
                        ? "red "
                        : (index === 2 && isLinkedinError) ||
                          (index === 2 && isWebsiteError)
                        ? "red "
                        : activeStep === index
                        ? "#edf2f4"
                        : "#a5a58d",
                  }}
                >
                  {calculateStepStatus()[index]}
                </Typography>
              </div>
            </StepLabel>
            <StepContent
              sx={{ p: "0px 5px", margin: 0, zIndex: 10, border: "none" }}
            >
              {stepContentVisibility[index] && (
                <div>
                  {index === 0 && (
                    <Step1
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                      groupId={groupId}
                      mobile={selectedMember.mobile}
                      selectedGroupType={selectedGroup.groupType}
                    />
                  )}
                  {index === 1 && (
                    <Step2
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                  {index === 2 && (
                    <Step3
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    mt: 2,
                    backgroundColor: "#00b4d8",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  Back
                </Button>
                {console.log("memberId :" + memberId, selectedMember.memberId)}
                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps(selectedGroup).length - 1
                      ? () => handleSubmitForm(memberId)
                      : handleNext
                  }
                  sx={{
                    mt: 2,
                    backgroundColor: "#03045e",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  {activeStep === steps(selectedGroup).length - 1
                    ? "Finish"
                    : "Continue"}
                </Button>
              </div>{" "}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            onClick={() => setActiveStep(0)}
            sx={{ mt: 2, backgroundColor: "#003049", color: "#fff" }}
          >
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
