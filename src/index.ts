import "vitest";

import { setupVitest } from "./matcher/matcher.js";
import type { CdktnVitestMatchers } from "./matcher/matcher.types.js";
export { setupVitest };

declare module "vitest" {
  interface Matchers<T = any> extends CdktnVitestMatchers<T> {}
}
