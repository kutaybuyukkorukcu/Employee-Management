import "../src/components/card";

import { expect, fixture, html } from "@open-wc/testing";

describe("ems-card", () => {
  it("renders with content", async () => {
    const el = await fixture(html`<ems-card><p>Card content</p></ems-card>`);
    expect(el.textContent.trim()).to.equal("Card content");
  });

  it("renders footer slot", async () => {
    const el = await fixture(html`
      <ems-card>
        <p>Card content</p>
        <div slot="footer">Footer content</div>
      </ems-card>
    `);
    const footer = el.querySelector('[slot="footer"]');
    expect(footer.textContent.trim()).to.equal("Footer content");
  });
});
