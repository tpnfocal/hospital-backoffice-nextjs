import Axios from "@/plugins/Axios";

export const LoginAuthService = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await Axios.post("/auth/login", {
      email: username,
      password: password,
    });
    const { accessToken, refreshToken } = response.data;
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    return response;
  } catch (error) {
    return error;
  }
};
