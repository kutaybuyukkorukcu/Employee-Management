import "../src/components/pagination";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-pagination", () => {
  it("renders with default properties", async () => {
    const el = await fixture(html`<ems-pagination></ems-pagination>`);
    expect(el.currentPage).to.equal(1);
    expect(el.totalPages).to.equal(1);
    expect(el.siblingCount).to.equal(1);
  });

  it("renders with custom properties", async () => {
    const el = await fixture(html`<ems-pagination current-page="2" total-pages="5"></ems-pagination>`);
    expect(el.currentPage).to.equal(2);
    expect(el.totalPages).to.equal(5);
  });

  it("does not render when total pages is 1", async () => {
    const el = await fixture(html`<ems-pagination total-pages="1"></ems-pagination>`);
    const nav = el.shadowRoot.querySelector("nav");
    expect(nav).to.be.null;
  });

  it("renders navigation when multiple pages", async () => {
    const el = await fixture(html`<ems-pagination total-pages="3"></ems-pagination>`);
    const nav = el.shadowRoot.querySelector("nav");
    expect(nav).to.not.be.null;
  });
});
