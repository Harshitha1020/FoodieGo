import { sum } from "../sum";

test("adds 1 + 2 to equal 3", () => {
  const results = sum(3,2);
  //assertion
  expect(results).toBe(5);
});
