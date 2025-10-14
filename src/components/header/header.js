import { LitElement, html } from "lit";

export class EmsHeader extends LitElement {
  static properties = {
    logo: { type: String },
    title: { type: String },
  };

  constructor() {
    super();
    this.logo = "";
    this.title = "ING";
  }

  render() {
    return html`
      <div class="company-details">
        <img src=${this.logo} alt="EMS Logo" />
        <span>${this.title}</span>
      </div>
      <div class="menu-items">
        <ems-button type="menu" label="Employees" variant="text"></ems-button>
      </div>
    `;
  }
}

customElements.define("ems-header", EmsHeader);
