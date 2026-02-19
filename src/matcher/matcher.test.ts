import { beforeEach, describe, expect, it, vi } from "vitest";

import { setupVitest } from "./matcher.js";
import { parseResult, passEvaluation } from "./matcher.utils.js";

vi.mock("cdktn");

describe("setupVitest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register custom matchers without errors", () => {
    expect(() => {
      setupVitest();
    }).not.toThrow();
  });

  it("should have registered toHaveResource matcher", () => {
    setupVitest();

    const matchers = expect.toHaveResource;
    expect(matchers).toBeDefined();
  });

  it("should have registered toHaveResourceWithProperties matcher", () => {
    setupVitest();

    const matchers = expect.toHaveResourceWithProperties;
    expect(matchers).toBeDefined();
  });

  it("should have registered toHaveDataSource matcher", () => {
    setupVitest();

    const matchers = expect.toHaveDataSource;
    expect(matchers).toBeDefined();
  });

  it("should have registered toHaveDataSourceWithProperties matcher", () => {
    setupVitest();

    const matchers = expect.toHaveDataSourceWithProperties;
    expect(matchers).toBeDefined();
  });

  it("should have registered toHaveProvider matcher", () => {
    setupVitest();

    const matchers = expect.toHaveProvider;
    expect(matchers).toBeDefined();
  });

  it("should have registered toHaveProviderWithProperties matcher", () => {
    setupVitest();

    const matchers = expect.toHaveProviderWithProperties;
    expect(matchers).toBeDefined();
  });

  it("should have registered toBeValidTerraform matcher", () => {
    setupVitest();

    const matchers = expect.toBeValidTerraform;
    expect(matchers).toBeDefined();
  });

  it("should have registered toPlanSuccessfully matcher", () => {
    setupVitest();

    const matchers = expect.toPlanSuccessfully;
    expect(matchers).toBeDefined();
  });
});

describe("passEvaluation", () => {
  it("should return true when assertedProperties is empty and items exist", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const result = passEvaluation(items, {});

    expect(result).toBe(true);
  });

  it("should return false when assertedProperties is empty and items are empty", () => {
    const items: any[] = [];
    const result = passEvaluation(items, {});

    expect(result).toBe(false);
  });

  it("should return true when an item matches assertedProperties", () => {
    const items = [
      { id: 1, name: "test" },
      { id: 2, name: "other" },
    ];
    const properties = { id: 1 };

    const result = passEvaluation(items, properties);

    expect(result).toBe(true);
  });

  it("should return false when no item matches assertedProperties", () => {
    const items = [
      { id: 1, name: "test" },
      { id: 2, name: "other" },
    ];
    const properties = { id: 3 };

    const result = passEvaluation(items, properties);

    expect(result).toBe(false);
  });

  it("should match multiple properties", () => {
    const items = [
      { id: 1, name: "test", type: "A" },
      { id: 2, name: "other", type: "B" },
    ];
    const properties = { id: 1, name: "test" };

    const result = passEvaluation(items, properties);

    expect(result).toBe(true);
  });

  it("should not match when only some properties match", () => {
    const items = [{ id: 1, name: "test", type: "A" }];
    const properties = { id: 1, name: "wrong" };

    const result = passEvaluation(items, properties);

    expect(result).toBe(false);
  });
});

describe("parseResult", () => {
  it("should extract message and pass from result object", () => {
    const mockResult = {
      message: "Test message",
      pass: true,
    };

    const parsed = parseResult(mockResult as any);

    expect(parsed.message()).toBe("Test message");
    expect(parsed.pass).toBe(true);
  });

  it("should handle false pass value", () => {
    const mockResult = {
      message: "Test failed",
      pass: false,
    };

    const parsed = parseResult(mockResult as any);

    expect(parsed.pass).toBe(false);
  });
});
