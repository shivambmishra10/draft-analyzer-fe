
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // or whatever your mock server port is

export const fetchAssessments = async () => {
  const response = await axios.get(`${BASE_URL}/api/assessments`);
  return response.data;
};

export const uploadPolicyDocument = async (formData: FormData) => {
    const response = await axios.post('http://localhost:8080/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    return response.data;
}
