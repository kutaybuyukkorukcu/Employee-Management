import { LitElement, css } from "lit";

import { icons } from "./icons.js";

export class EmsIcon extends LitElement {
  static properties = {
    name: { type: String },
    color: { type: String, reflect: true }, // primary, secondary, tertiary
    size: { type: String, reflect: true }, // small, medium
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([size="small"]) {
      --icon-size: var(--icon-size-small);
    }

    :host([size="medium"]) {
      --icon-size: var(--icon-size-medium);
    }

    :host([color="primary"]) {
      --icon-color: var(--color-primary);
    }

    :host([color="secondary"]) {
      --icon-color: var(--color-secondary);
    }

    :host([color="tertiary"]) {
      --icon-color: var(--color-tertiary);
    }

    svg {
      color: var(--icon-color);
      width: var(--icon-size);
      height: var(--icon-size);
      display: block;
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
