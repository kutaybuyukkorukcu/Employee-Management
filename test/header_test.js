import "../src/components/header";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-header", () => {
  it("renders with default title", async () => {
    const el = await fixture(html`<ems-header></ems-header>`);
    expect(el.title).to.equal("ING");
  });

  it("renders with given title", async () => {
    const el = await fixture(html`<ems-header title="Custom Title"></ems-header>`);
    expect(el.title).to.equal("Custom Title");
  });

  it("has default language", async () => {
    const el = await fixture(html`<ems-header></ems-header>`);
    expect(el.currentLanguage).to.equal("tr");
  });
});
