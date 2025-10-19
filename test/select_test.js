import "../src/components/select";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-select", () => {
  it("renders with options", async () => {
    const el = await fixture(html`
      <ems-select
        .options=${[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      ></ems-select>
    `);
    expect(el.options.length).to.equal(2);
    expect(el.options[0].value).to.equal("1");
    expect(el.options[0].label).to.equal("Option 1");
  });

  it("sets value", async () => {
    const el = await fixture(html`
      <ems-select
        value="2"
        .options=${[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      ></ems-select>
    `);
    expect(el.value).to.equal("2");
  });

  it("validates required field", async () => {
    const el = await fixture(html`
      <ems-select required .options=${[{ value: "1", label: "Option 1" }]}></ems-select>
    `);
    el.value = "";
    await el.updateComplete;
    expect(el.internals.validity.valueMissing).to.be.true;
  });

  it("renders placeholder", async () => {
    const el = await fixture(html`
      <ems-select placeholder="Choose option" .options=${[{ value: "1", label: "Option 1" }]}></ems-select>
    `);
    const select = el.shadowRoot.querySelector("select");
    expect(select.querySelector("option").textContent).to.equal("Choose option");
  });
});
