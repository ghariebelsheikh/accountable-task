export const handleError = async (
  error: any
): Promise<{
  failureReason: string;
  success: boolean;
  invalidAccessToken: boolean;
}> => {
  return {
    failureReason: error.response.data,
    success: false,
    invalidAccessToken: error.response.status === 401,
  };
};
