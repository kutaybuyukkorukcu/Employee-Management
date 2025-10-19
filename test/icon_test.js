import "../src/components/icon";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-icon", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-icon></ems-icon>`);
    expect(el.name).to.equal("");
    expect(el.color).to.equal("primary");
    expect(el.size).to.equal("medium");
  });

  it("sets custom properties", async () => {
    const el = await fixture(html`<ems-icon name="edit" color="secondary" size="small"></ems-icon>`);
    expect(el.name).to.equal("edit");
    expect(el.color).to.equal("secondary");
    expect(el.size).to.equal("small");
  });

  it("reflects properties to attributes", async () => {
    const el = await fixture(html`<ems-icon color="tertiary" size="small"></ems-icon>`);
    expect(el.getAttribute("color")).to.equal("tertiary");
    expect(el.getAttribute("size")).to.equal("small");
  });
});
