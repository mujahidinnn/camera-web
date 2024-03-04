export const dataUserRegistered = localStorage.getItem("user");
export const dataUserLogin = localStorage.getItem("user-login");
export const isRememberMe = JSON.parse(dataUserLogin)?.rememberMe;
export let dataTableCodes = JSON.parse(localStorage.getItem("codes")) || [];

export function registerDataUser(dataJson) {
  if (dataJson && typeof dataJson == "object") {
    localStorage.setItem("user", JSON.stringify(dataJson));
  }
}

export function matchingDataUser(dataUser) {
  if (dataUser && typeof dataUser == "object" && dataUserRegistered) {
    const userRegistered = JSON.parse(dataUserRegistered);

    const matchedUser =
      userRegistered.email == dataUser.email &&
      userRegistered.password == dataUser.password;

    return matchedUser;
  }
}

export function setDataUserLogin(dataUser) {
  if (dataUser && typeof dataUser == "object") {
    localStorage.setItem("user-login", JSON.stringify(dataUser));
  }
}

export function setDataTableCodes(dataTable) {
  if (dataTable && typeof dataTable == "object") {
    dataTableCodes.push(...dataTable);

    localStorage.setItem("codes", JSON.stringify(dataTableCodes));

    dataTableCodes = dataTableCodes;
  }
}

export function deleteDataTableCodes(id) {
  if (id) {
    dataTableCodes.splice(id, 1);

    localStorage.setItem("codes", JSON.stringify(dataTableCodes));

    dataTableCodes = dataTableCodes;
  }
}

export function getDataCodeById(id) {
  const existingData =
    Array.isArray(dataTableCodes) &&
    dataTableCodes.find((item) => item.id == id);
  return existingData;
}

export function updateWorkoutById(idParent, idWorkOut, body) {
  const existingData = [...dataTableCodes]; // Create a copy to avoid modifying the original data directly

  // Find the parent workout by idParent
  const parentWorkout = existingData.find((item) => item.id === idParent);

  // Find the specific workout by idWorkOut within the parent workout
  const specificWorkout = parentWorkout?.work_out_data.find(
    (item) => item.id === idWorkOut
  );

  if (parentWorkout && specificWorkout) {
    // Update the specific workout with the provided body
    specificWorkout.id = body.id || specificWorkout.id;
    specificWorkout.day = body.day || specificWorkout.day;
    specificWorkout.status = body.status || specificWorkout.status;
    specificWorkout.progress = body.progress || specificWorkout.progress;
    specificWorkout.description =
      body.description || specificWorkout.description;
    specificWorkout.programs_data =
      body.programs_data || specificWorkout.programs_data;

    // Save the updated data back to localStorage
    localStorage.setItem("codes", JSON.stringify(existingData));

    // Update the state variable
    dataTableCodes = existingData;
  }
}
