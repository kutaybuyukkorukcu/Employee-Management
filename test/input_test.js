import "../src/components/input";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-input", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-input></ems-input>`);
    expect(el.type).to.equal("text");
    expect(el.name).to.equal("");
    expect(el.placeholder).to.equal("");
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
    expect(el.value).to.equal("");
  });

  it("renders with custom properties", async () => {
    const el = await fixture(
      html`<ems-input
        type="email"
        name="email"
        placeholder="Enter email"
        required
        .value=${"test@example.com"}
      ></ems-input>`,
    );
    expect(el.type).to.equal("email");
    expect(el.name).to.equal("email");
    expect(el.placeholder).to.equal("Enter email");
    expect(el.required).to.be.true;
    expect(el.value).to.equal("test@example.com");
  });

  it("validates email", async () => {
    const el = await fixture(html`<ems-input type="email" required></ems-input>`);
    el.value = "invalid-email";
    await el.updateComplete;
    expect(el.internals.validity.typeMismatch).to.be.true;
  });

  it("validates required field", async () => {
    const el = await fixture(html`<ems-input required></ems-input>`);
    el.value = "";
    await el.updateComplete;
    expect(el.internals.validity.valueMissing).to.be.true;
  });
});
