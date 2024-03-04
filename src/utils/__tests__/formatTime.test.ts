import { describe, expect, it } from "vitest";
import formatTime from "../formatTime";

describe("formatTime", () => {
  it("formats time correctly for minutes and seconds", () => {
    // Test cases with various input times
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(30)).toBe("00:30");
    expect(formatTime(60)).toBe("01:00");
    expect(formatTime(90)).toBe("01:30");
    expect(formatTime(120)).toBe("02:00");
    expect(formatTime(150)).toBe("02:30");
    expect(formatTime(300)).toBe("05:00");
    expect(formatTime(3600)).toBe("60:00");
  });

  it("handles single-digit minutes and seconds", () => {
    // Test cases for single-digit minutes and seconds
    expect(formatTime(9)).toBe("00:09");
    expect(formatTime(59)).toBe("00:59");
    expect(formatTime(61)).toBe("01:01");
    expect(formatTime(599)).toBe("09:59");
  });

  it("handles large input times", () => {
    // Test cases for large input times
    expect(formatTime(12345)).toBe("205:45");
    expect(formatTime(98765)).toBe("1646:05");
  });
});
