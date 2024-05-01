import axios, { AxiosError } from "axios";

const API_URL = "https://ideal-space-robot-v56vg7j955g3pg9q-3000.app.github.dev/api";

export const getUniData = async (Uni: string): Promise<UniData> => {
  return new Promise<UniData>((resolve, reject) => {
    axios
      .get(`${API_URL}/Uni/${Uni}`)
      .then((res) => {
        resolve({
          Uni: Uni,
          Students: res.data.Students,
          Fees: res.data.Fees,
          Rank: res.data.Rank,
          Admission: res.data.Admission,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("University not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
