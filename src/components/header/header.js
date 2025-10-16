import "../button/index.js";
import "../icon/index.js";

import { LitElement, css, html } from "lit";

export class EmsHeader extends LitElement {
  static properties = {
    title: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-x-small) var(--spacing-small);
      background-color: var(--color-background-primary);
    }

    img {
      width: 1.5rem;
    }

    .ems-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--spacing-small);
    }

    .menu-items {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  `;

  constructor() {
    super();
    this.title = "ING";
  }

  render() {
    return html`
      <div class="ems-details">
        <img src="/public/logo.webp" alt="EMS Logo" />
        <ems-text variant="caption" color="black">${this.title}</ems-text>
      </div>
      <div class="menu-items">
        <ems-button type="menu" label="Employees" variant="text" color="primary">
          <ems-icon slot="icon" name="add-record" size="medium"></ems-icon>
        </ems-button>
        <ems-button type="menu" label="Add new" variant="text" color="secondary">
          <ems-icon slot="icon" name="add-record" size="medium" color="secondary"></ems-icon>
        </ems-button>
        <ems-button type="menu" variant="text" color="primary">
          <ems-icon slot="icon" name="add-record" size="medium"></ems-icon>
        </ems-button>
      </div>
    `;
  }
}

customElements.define("ems-header", EmsHeader);
