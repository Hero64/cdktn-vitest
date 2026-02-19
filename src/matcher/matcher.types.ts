import type { testingMatchers } from "cdktn";

export interface CdktnVitestMatchers<R = unknown> {
  toHaveResource(resource: testingMatchers.TerraformConstructor): R;
  toHaveResourceWithProperties(
    resource: testingMatchers.TerraformConstructor,
    properties: Record<string, any>,
  ): R;
  toHaveDataSource(
    dataSourceConstructor: testingMatchers.TerraformConstructor,
  ): R;
  toHaveDataSourceWithProperties(
    dataSourceConstructor: testingMatchers.TerraformConstructor,
    properties: Record<string, any>,
  ): R;

  toHaveProvider(providerConstructor: testingMatchers.TerraformConstructor): R;
  toHaveProviderWithProperties(
    providerConstructor: testingMatchers.TerraformConstructor,
    properties: Record<string, any>,
  ): R;

  toBeValidTerraform(): R;
  toPlanSuccessfully(): R;
}
