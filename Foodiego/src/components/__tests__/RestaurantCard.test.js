import { render, screen } from "@testing-library/react";
import ResturantCard from "../ResturantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("should load restaurant card for mock data", () => {
  render(<ResturantCard resData={MOCK_DATA} />);//here make sure the props name which you are using should match

  const restaurantName = screen.getByText("Chinese Wok");
  expect(restaurantName).toBeInTheDocument();
});
