import { testingMatchers } from "cdktn";
import { expect } from "vitest";

import { parseResult, passEvaluation } from "./matcher.utils.js";

export const setupVitest = () => {
  expect.extend({
    toHaveResource(received: string, resource) {
      return parseResult(
        testingMatchers.getToHaveResourceWithProperties(passEvaluation)(
          received,
          resource,
          {},
        ),
      );
    },
    toHaveResourceWithProperties(received: string, resource, properties) {
      return parseResult(
        testingMatchers.getToHaveResourceWithProperties(passEvaluation)(
          received,
          resource,
          properties,
        ),
      );
    },
    toHaveDataSource(received: string, dataSourceConstructor) {
      return parseResult(
        testingMatchers.getToHaveDataSourceWithProperties(passEvaluation)(
          received,
          dataSourceConstructor,
          {},
        ),
      );
    },
    toHaveDataSourceWithProperties(
      received: string,
      dataSourceConstructor,
      properties,
    ) {
      return parseResult(
        testingMatchers.getToHaveDataSourceWithProperties(passEvaluation)(
          received,
          dataSourceConstructor,
          properties,
        ),
      );
    },

    toHaveProvider(received: string, providerConstructor) {
      return parseResult(
        testingMatchers.getToHaveProviderWithProperties(passEvaluation)(
          received,
          providerConstructor,
          {},
        ),
      );
    },
    toHaveProviderWithProperties(
      received: string,
      providerConstructor,
      properties,
    ) {
      return parseResult(
        testingMatchers.getToHaveProviderWithProperties(passEvaluation)(
          received,
          providerConstructor,
          properties,
        ),
      );
    },

    toBeValidTerraform(received: string) {
      return parseResult(testingMatchers.toBeValidTerraform(received));
    },
    toPlanSuccessfully(received: string) {
      return parseResult(testingMatchers.toPlanSuccessfully(received));
    },
  });
};
