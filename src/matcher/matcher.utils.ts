import type { testingMatchers } from "cdktn";
import { expect } from "vitest";

export const passEvaluation = (
  items: any[],
  assertedProperties: Record<string, any>,
) => {
  if (Object.entries(assertedProperties).length === 0) {
    return items.length > 0;
  }

  try {
    expect(items).toEqual(
      expect.arrayContaining([expect.objectContaining(assertedProperties)]),
    );
    return true;
  } catch {
    return false;
  }
};

export const parseResult = (result: testingMatchers.AssertionReturn) => {
  return {
    message: () => result.message,
    pass: result.pass,
  };
};
