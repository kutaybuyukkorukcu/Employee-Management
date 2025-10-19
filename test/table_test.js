import "../src/components/table";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-table", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-table></ems-table>`);
    expect(el.columns).to.deep.equal([]);
    expect(el.selectable).to.be.false;
    expect(el.data).to.deep.equal([]);
    expect(el.selectedRows).to.deep.equal([]);
  });

  it("renders with data and columns", async () => {
    const el = await fixture(html`
      <ems-table .columns=${[{ key: "name", type: "text" }]} .data=${[{ name: "John" }]}></ems-table>
    `);
    expect(el.columns.length).to.equal(1);
    expect(el.data.length).to.equal(1);
  });

  it("renders selectable table", async () => {
    const el = await fixture(html`
      <ems-table selectable .columns=${[{ key: "name", type: "text" }]} .data=${[{ name: "John" }]}></ems-table>
    `);
    expect(el.selectable).to.be.true;
    const checkbox = el.shadowRoot.querySelector('input[type="checkbox"]');
    expect(checkbox).to.not.be.null;
  });

  it("handles row selection", async () => {
    const el = await fixture(html`
      <ems-table selectable .columns=${[{ key: "name", type: "text" }]} .data=${[{ name: "John" }]}></ems-table>
    `);
    const checkbox = el.shadowRoot.querySelector('input[type="checkbox"]');
    checkbox.click();
    expect(el.selectedRows).to.deep.equal([0]);
  });

  it("renders action buttons", async () => {
    const el = await fixture(html`
      <ems-table .columns=${[{ key: "actions", type: "action" }]} .data=${[{ id: 1 }]}></ems-table>
    `);
    const buttons = el.shadowRoot.querySelectorAll("ems-button");
    expect(buttons.length).to.be.greaterThan(0);
  });
});
