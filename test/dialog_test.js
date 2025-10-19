import "../src/components/dialog";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-dialog", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-dialog></ems-dialog>`);
    expect(el.open).to.be.false;
    expect(el.title).to.equal("");
  });

  it("renders with title", async () => {
    const el = await fixture(html`<ems-dialog title="Test Dialog"></ems-dialog>`);
    expect(el.title).to.equal("Test Dialog");
  });

  it("shows and closes dialog", async () => {
    const el = await fixture(html`<ems-dialog></ems-dialog>`);
    el.show();
    expect(el.open).to.be.true;

    el.close();
    expect(el.open).to.be.false;
  });
});
