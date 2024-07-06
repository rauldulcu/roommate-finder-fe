import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/users/loginUser";

export const useLoginUser = () => {
  const { mutate: login, error: loginError } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginUser(username, password),
  });

  return { login, loginError };
};
