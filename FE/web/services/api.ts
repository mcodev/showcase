const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type HTTP_METHODS = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

const request = async (
  path: string,
  method: HTTP_METHODS = 'GET',
  params = {}
): Promise<{ success: boolean; data: any; statusCode: number }> => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      credentials: 'include',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
    });

    const data = await response.json();

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
