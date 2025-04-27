import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const uploadPolicy = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${BASE_URL}/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log(res.data);
  return res.data;
};

export const getSummaryResult = async (summaryId: string) => {
  const res = await axios.get(`${BASE_URL}/results/${summaryId}`);
  return res.data;
};

export const downloadPDF = async (summaryId: string) => {
  const res = await axios.get(`${BASE_URL}/results/${summaryId}/download`, {
    responseType: 'blob',
  });

  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `summary-${summaryId}.pdf`;
  link.click();
};
