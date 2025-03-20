import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type HTTP_METHODS = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const request = async (
  path: string,
  method: HTTP_METHODS = 'GET',
  params: object = {}
): Promise<{ success: boolean; data: any; statusCode: number }> => {
  try {
    const response = await apiClient.request({
      method,
      url: path,
      data: params,
    });

    const data = response.data;

    const statusCode = response.status;

    return { statusCode, success: data.success, data: data.data };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export default request;
