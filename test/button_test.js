import "../src/components/button";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-button", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-button></ems-button>`);
    expect(el.type).to.equal("button");
    expect(el.color).to.equal("primary");
    expect(el.variant).to.equal("filled");
    expect(el.size).to.equal("small");
  });

  it("renders with custom properties", async () => {
    const el = await fixture(
      html`<ems-button type="submit" variant="filled" color="primary" maxWidth disabled size="small">
        Click me
      </ems-button>`,
    );
    expect(el.type).to.equal("submit");
    expect(el.color).to.equal("primary");
    expect(el.variant).to.equal("filled");
    expect(el.maxWidth).to.be.true;
    expect(el.disabled).to.be.true;
    expect(el.size).to.equal("small");
    expect(el.textContent.trim()).to.equal("Click me");
  });

  it("reflects properties to attributes", async () => {
    const el = await fixture(
      html`<ems-button variant="outlined" color="secondary" maxWidth disabled size="medium"></ems-button>`,
    );
    expect(el.getAttribute("variant")).to.equal("outlined");
    expect(el.getAttribute("color")).to.equal("secondary");
    expect(el.hasAttribute("maxWidth")).to.be.true;
    expect(el.hasAttribute("disabled")).to.be.true;
    expect(el.getAttribute("size")).to.equal("medium");
  });
});
