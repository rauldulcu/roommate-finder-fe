import { renderHook } from "@testing-library/react-hooks";
import { useQuery } from "@tanstack/react-query";
import { useGetApartments } from "./useGetApartments";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));
jest.mock("../../services/apartments/getApartments");

describe("useGetApartments", () => {
  it("should return apartments in loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useGetApartments());

    expect(result.current.apartmentsLoading).toBe(true);
    expect(result.current.apartments).toBeUndefined();
    expect(result.current.apartmentsError).toBeUndefined();
  });

  it("should return apartments data on success", async () => {
    const mockApartmentsData = [{ id: 1, name: "Apartment 1" }];
    (useQuery as jest.Mock).mockReturnValue({
      data: mockApartmentsData,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetApartments());

    expect(result.current.apartmentsLoading).toBe(false);
    expect(result.current.apartments).toEqual(mockApartmentsData);
    expect(result.current.apartmentsError).toBeUndefined();
  });

  it("should handle error when fetching apartments fails", () => {
    const mockError = new Error("Failed to fetch");
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetApartments());

    expect(result.current.apartmentsLoading).toBe(false);
    expect(result.current.apartments).toBeUndefined();
    expect(result.current.apartmentsError).toEqual(mockError);
  });
});
