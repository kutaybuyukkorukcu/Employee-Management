import "../src/components/text";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-text", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-text>Hello</ems-text>`);
    expect(el.variant).to.equal("body");
    expect(el.color).to.equal("primary");
    expect(el.weight).to.be.false;
    expect(el.textContent).to.equal("Hello");
  });

  it("renders with custom variant", async () => {
    const el = await fixture(html`<ems-text variant="title">Title</ems-text>`);
    expect(el.variant).to.equal("title");
    expect(el.getAttribute("variant")).to.equal("title");
  });

  it("renders with color and weight", async () => {
    const el = await fixture(html`<ems-text color="black" weight>Text</ems-text>`);
    expect(el.color).to.equal("black");
    expect(el.weight).to.be.true;
    expect(el.hasAttribute("weight")).to.be.true;
  });
});
