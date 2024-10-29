// AllPaymentHistory.test.js
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllPaymentHistory from "./AllPaymentHistory";
import * as paymentAPI from "./paymentAPI";

const queryClient = new QueryClient();

jest.mock("./paymentAPI");

describe("AllPaymentHistory Component", () => {
  test("fetches and displays payment data", async () => {
    const mockPayments = [
      {
        _id: "6707573dd94c43b54777030b", // Simplified format for consistency
        price: "120", // Converted to string or number as expected
        transactionId: "pi_3Q8Dw9JBliBBMOOO0SV7rJhh",
        date: "2024-10-10T04:25:33.887Z",
        email: "rez@gmail.com",
        name: "rezwan",
      },
    ];

    // Mocking fetchPayments to return mockPayments data
    paymentAPI.fetchPayments.mockResolvedValue(mockPayments);

    render(
      <QueryClientProvider client={queryClient}>
        <AllPaymentHistory />
      </QueryClientProvider>
    );

    // Check for loading indicator
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for and verify the payment data elements in the table
    await waitFor(() => {
      expect(screen.getByText("rezwan")).toBeInTheDocument();
      expect(screen.getByText("rez@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("120")).toBeInTheDocument();
      expect(
        screen.getByText("pi_3Q8Dw9JBliBBMOOO0SV7rJhh")
      ).toBeInTheDocument();
      expect(screen.getByText("2024-10-10T04:25:33.887Z")).toBeInTheDocument();
    });
  });
});
