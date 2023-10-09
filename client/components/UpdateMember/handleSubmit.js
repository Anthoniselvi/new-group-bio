import axios from "axios";
import { validateStep1, validateStep2, validateStep3 } from "./Validation";

const handleSubmit = (
  inputFieldValues,
  groupId,
  setFieldErrors,
  memberId,
  router
) => {
  console.log("groupId in handlesubmit: " + groupId);
  console.log("MemberId in handlesubmit: " + JSON.stringify(memberId));
  const step1Errors = validateStep1(inputFieldValues);
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

export default handleSubmit;
