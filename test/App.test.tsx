import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders the Welcome screen by default", () => {
    const { getByTestId } = render(<App />);
    const welcomeScreen = getByTestId("welcome-screen");
    expect(welcomeScreen).toBeTruthy();
  });

  it("navigates to the Home screen when logged in", () => {
    jest.mock("./context/UserContext/UserContext", () => ({
      useUser: () => ({ isLoggedIn: true }),
    }));

    const { getByTestId } = render(<App />);
    const homeScreen = getByTestId("home-screen");
    expect(homeScreen).toBeTruthy();
  });

  it("navigates to the Login screen when not logged in", () => {
    jest.mock("./context/UserContext/UserContext", () => ({
      useUser: () => ({ isLoggedIn: false }),
    }));

    const { getByTestId } = render(<App />);
    const loginScreen = getByTestId("login-screen");
    expect(loginScreen).toBeTruthy();
  });
});
