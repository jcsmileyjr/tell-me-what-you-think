import { render, screen, within } from "@testing-library/react";
import App from "../../App.js";

describe("Reading Page", () => {
    render(<App />);
    it("shows the 'Article Read' menu", () => {
        const articlesReadHeading = screen.getByText(/Articles Read/);
        expect(articlesReadHeading).toBeInTheDocument();
    });

    xit("shows a number within the 'Article Read' menu", () => {
        const articlesReadContent = screen.getByText("Articles Read");
        
    })
});
