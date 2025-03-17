import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom"


describe("test cases for Contact us ", () => {
    test("should load contact us Page",()=>{
        render(<Contact/>);
    
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });
    
    it("should load button on contact us component",()=>{
        render(<Contact/>);
    
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });
    test("should load button on contact us component",()=>{
        render(<Contact/>);
    
        const button = screen.getByText("Submit");
        expect(button).toBeInTheDocument();
    });
    
    test("should load two input boxes",()=>{
        render(<Contact/>);
    
        const inputBoxes = screen.getAllByRole("textbox");
        //console.log(inputBoxes);
        //expect(inputBoxes.length).not.toBe(3);
        expect(inputBoxes.length).toBe(2);
    
    });
});
