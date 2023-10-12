import axios from "axios";
import { validateStep1, validateStep2, validateStep3 } from "./Validation";

const handleSubmit = (
  inputFieldValues,
  groupId,
  setFieldErrors,
  selectedGroupType,
  // memberId,
  router
) => {
  console.log("router:" + router);
  // const memberId = router.query.memberId;
  const memberId = "2cf1a3c4-116a-47a6-94b9-e55a37253ac5";
  console.log("groupId in handlesubmit: " + groupId);
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

export default handleSubmit;
