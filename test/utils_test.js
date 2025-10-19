import {
  formatDate,
  formatDateForInput,
  formatPhoneNumber,
  formatText,
  parseDate,
  parsePhoneNumber,
} from "../src/utils";

import { expect } from "@open-wc/testing";

describe("utils", () => {
  describe("formatDate", () => {
    it("formats date correctly", () => {
      expect(formatDate("25-10-2025")).to.equal("25/10/2025");
    });

    it("returns empty string for empty input", () => {
      expect(formatDate("")).to.equal("");
      expect(formatDate(null)).to.equal("");
    });
  });

  describe("formatPhoneNumber", () => {
    it("formats 10 digit number", () => {
      expect(formatPhoneNumber("5551234567")).to.equal("+(90) 555 123 45 67");
    });

    it("formats number with leading zero", () => {
      expect(formatPhoneNumber("05551234567")).to.equal("+(90) 555 123 45 67");
    });

    it("returns original for invalid format", () => {
      expect(formatPhoneNumber("123")).to.equal("123");
    });
  });

  describe("formatDateForInput", () => {
    it("converts to input format", () => {
      expect(formatDateForInput("25-10-2025")).to.equal("2025-10-25");
    });

    it("returns empty for empty input", () => {
      expect(formatDateForInput("")).to.equal("");
    });
  });

  describe("formatText", () => {
    it("capitalizes properly", () => {
      expect(formatText("kutay buyukkorukcu")).to.equal("Kutay Buyukkorukcu");
    });

    it("leaves uppercase alone", () => {
      expect(formatText("KUTAY BUYUKKORUKCU")).to.equal("KUTAY BUYUKKORUKCU");
    });

    it("handles non-strings", () => {
      expect(formatText(123)).to.equal(123);
    });
  });

  describe("parseDate", () => {
    it("parses input format", () => {
      expect(parseDate("2025-10-25")).to.equal("25-10-2025");
    });

    it("returns empty for empty input", () => {
      expect(parseDate("")).to.equal("");
    });
  });

  describe("parsePhoneNumber", () => {
    it("extracts digits from formatted number", () => {
      expect(parsePhoneNumber("+(90) 555 123 45 67")).to.equal("905551234567");
    });

    it("returns empty for invalid input", () => {
      expect(parsePhoneNumber("invalid")).to.equal("");
    });
  });
});
