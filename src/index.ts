export { RelationMetrics } from "./metrics";
export { RelationKind, Relation, RelationFactory } from "./relations";
export { Familiar, FamiliarDomain } from "./familiar";
export { RelationSet } from "./collections";

function hello(name: string = "Ivan"): string {
  return `Hello, ${name}`;
}

export default hello;
