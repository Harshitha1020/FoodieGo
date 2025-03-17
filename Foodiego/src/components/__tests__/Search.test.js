import { act, fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA_NAME from "../mocks/apiDataBodymock.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA_NAME);
    }, //this mock data is exactly what we got from API call
  });
});

 it("should load the body component and then search for Subway", async () => {
    await act( async () =>{
    render(
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    )})

    const resCardbfrSearch = screen.getAllByTestId("resCard");

    expect(resCardbfrSearch).toHaveLength(8); // assuming 8 restaurants in our mock data
    
    const searchButton = screen.getByTestId("searchButton");

    const inputBox = screen.getByTestId("searchInput");

    fireEvent.change(inputBox,{target:{value:"Subway"}});

    fireEvent.click(searchButton);

    const resCard =screen.getAllByTestId("resCard");//restaurants cards are nothing but the div so we can coutn them

    expect(resCard).toHaveLength(1); // assuming we have one restaurants in our mock data
}); 

it("should load teh body component and then check rating filter", async () => {
  await act( async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  })

  const resCardBfrFilter = screen.getAllByTestId("resCard");

  expect(resCardBfrFilter).toHaveLength(8); // assuming 8 restaurants in our mock data

  const filterButton = screen.getByRole("button",{name:"Ratings 4.0+"});

  fireEvent.click(filterButton);

  const resCardAfterClick = screen.getAllByTestId("resCard");

  expect(resCardAfterClick.length).toBeLessThan(8);
});
