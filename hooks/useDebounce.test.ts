import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("returns the initial value immediately", () => {
        const { result } = renderHook(
            ({ value }) => useDebounce(value, 500),
            { initialProps: { value: 'Hello' } }
        );

        expect(result.current).toBe('Hello');
    });

    it("updates the value after a delay", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 500),
            { initialProps: { value: "A" } }
        );

        rerender({ value: 'B'});

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe('B');
    });

    it("does not update before delay", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 500),
            { initialProps: { value: 'A' }}
        );

        rerender({ value: 'B' });

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe('A');
    });

});