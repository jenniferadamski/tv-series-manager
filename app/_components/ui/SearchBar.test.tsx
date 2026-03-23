import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
    it("renders the input field", () => {
        render(<SearchBar value="" onChange={() => { }} />);

        const input = screen.getByPlaceholderText("Rechercher une série...");

        expect(input).toBeInTheDocument();
    });

    it("calls onChange when the user types something", async () => {
        const onChange = jest.fn();

        render(<SearchBar value="" onChange={onChange} />);

        const input = screen.getByPlaceholderText("Rechercher une série...");

        await userEvent.type(input, 'breaking');

        expect(onChange).toHaveBeenCalledTimes(8);
    });
});