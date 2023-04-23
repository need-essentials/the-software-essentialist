import { literalNodeFactory } from "./literal_node";

describe("LiteralNode", () => {
  describe("factory", () => {
    it("should return a LiteralNode", () => {
      const node = literalNodeFactory(true);
      expect(node).toEqual({
        type: "Literal",
        value: true,
      });
    });
  });
});
