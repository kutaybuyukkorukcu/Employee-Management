import { LitElement, css } from "lit";

import { icons } from "./icons.js";

export class EmsIcon extends LitElement {
  static properties = {
    name: { type: String },
    color: { type: String, reflect: true }, // primary, secondary, info, error
    size: { type: String, reflect: true }, // small, medium
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([size="small"]) {
      --icon-size: var(--size-small);
    }

    :host([size="medium"]) {
      --icon-size: var(--size-medium);
    }

    :host([color="primary"]) {
      --icon-color: var(--color-primary);
    }

    :host([color="secondary"]) {
      --icon-color: var(--color-secondary);
    }

    :host([color="info"]) {
      --icon-color: var(--color-info);
    }

    :host([color="error"]) {
      --icon-color: var(--color-error);
    }

    .ems-icon {
      color: var(--icon-color);
      width: var(--icon-size);
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.color = "primary";
    this.size = "medium";
  }

  render() {
    const icon = icons[this.name];
    return icon;
  }
}

customElements.define("ems-icon", EmsIcon);
