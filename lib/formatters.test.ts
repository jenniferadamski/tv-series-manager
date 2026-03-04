import truncateGenres from "./formatters";

describe("truncateGenres", () => {
    it("returns an empty string if max <= 0", () => {
        const result = truncateGenres(['Drama, Action, Comedy'], 0);

        expect(result).toBe('');
    });

    it("truncates the genre list if its length > max", () => {
        const result = truncateGenres(['Drama', 'Action', 'Comedy'], 2);

        expect(result).toBe('Drama, Action, ...');
    });

    it("returns full genre list if its length is <= max", () => {
        const result = truncateGenres(['Drama', 'Action'], 2);

        expect(result).toBe('Drama, Action');
    });

    it("returns an empty string if the genre list is empty", () => {
        const result = truncateGenres([], 2);

        expect(result).toBe('');
    });

    it("returns a single string if there's only one genre on the list", () => {
        const result = truncateGenres(['Drama'], 3);

        expect(result).toBe('Drama');
    });
});