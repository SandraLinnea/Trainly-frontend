import { describe, expect, it } from "vitest";

import { TRAINLY_CONTACT_EMAIL } from "./contact";

describe("TRAINLY_CONTACT_EMAIL", () => {
  it("contains Trainly's contact email", () => {
    expect(TRAINLY_CONTACT_EMAIL).toBe("dog.trainly@gmail.com");
  });
});
