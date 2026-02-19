# cdktn-vitest

cdktn matchers library for Vitest.

This library provides a set of matchers that allow you to write clear and expressive tests for your Terraform infrastructure code written with CDKTN.

Check out the CDKTN documentation at [https://cdktn.io/docs/test/unit-tests#write-assertions](https://cdktn.io/docs/test/unit-tests#write-assertions) to learn more.

## Installation

```bash
npm install cdktn-vitest
# or
pnpm add cdktn-vitest
```

## Setup

### 1. Create `vitest.setup.ts`

Create a new file in your project root:

```typescript
// vitest.setup.ts
import { setupVitest } from "cdktn-vitest";

setupVitest();
```

### 2. Update `vitest.config.ts`

Add the setup file to your Vitest configuration:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

### 3. Update `tsconfig.json`

Add the library types to your TypeScript configuration:

```json
{
  "compilerOptions": {
    "types": ["cdktn-vitest"]
  }
}
```

## Available Matchers

### Resource Testing

#### `toHaveResource(resourceConstructor)`

Verify that a resource exists in the synthesized Terraform output.

```typescript
expect(synthesized).toHaveResource(MyResource);
```

#### `toHaveResourceWithProperties(resourceConstructor, properties)`

Verify that a resource exists with specific properties.

```typescript
expect(synthesized).toHaveResourceWithProperties(MyResource, {
  name: "my-resource",
  region: "us-east-1",
});
```

### Data Source Testing

#### `toHaveDataSource(dataSourceConstructor)`

Verify that a data source exists in the synthesized output.

```typescript
expect(synthesized).toHaveDataSource(MyDataSource);
```

#### `toHaveDataSourceWithProperties(dataSourceConstructor, properties)`

Verify that a data source exists with specific properties.

```typescript
expect(synthesized).toHaveDataSourceWithProperties(MyDataSource, {
  filter: "value",
});
```

### Provider Testing

#### `toHaveProvider(providerConstructor)`

Verify that a provider is configured.

```typescript
expect(synthesized).toHaveProvider(AwsProvider);
```

#### `toHaveProviderWithProperties(providerConstructor, properties)`

Verify that a provider is configured with specific properties.

```typescript
expect(synthesized).toHaveProviderWithProperties(AwsProvider, {
  region: "us-east-1",
});
```

### Terraform Validation

#### `toBeValidTerraform()`

Check if the synthesized Terraform code is valid.

```typescript
expect(synthesized).toBeValidTerraform();
```

#### `toPlanSuccessfully()`

Verify that `terraform plan` executes successfully.

```typescript
expect(synthesized).toPlanSuccessfully();
```

## Example Test

```typescript
import { describe, it, expect } from "vitest";
import { MyStack } from "./my-stack";
import { MyResource } from "cdktn/lib/resources";

describe("MyStack", () => {
  it("should create a resource with correct properties", () => {
    const stack = new MyStack();
    const synthesized = stack.synth().toString();

    expect(synthesized).toHaveResourceWithProperties(MyResource, {
      name: "my-resource",
      enabled: true,
    });
  });

  it("should be valid Terraform", () => {
    const stack = new MyStack();
    const synthesized = stack.synth().toString();

    expect(synthesized).toBeValidTerraform();
  });
});
```

## Peer Dependencies

This library requires the following peer dependencies:

- `cdktn@>= 0.22.0`
- `vitest@>= 4.0`

## License

MIT
