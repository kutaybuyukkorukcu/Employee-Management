import { LitElement, css } from "lit";

import { icons } from "./icons.js";

export class EmsIcon extends LitElement {
  static properties = {
    name: { type: String },
    color: { type: String }, // primary, secondary, info, error
    size: { type: String }, // small, medium
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .icon[color="primary"] {
      color: var(--color-primary);
      fill: var(--color-primary);
    }

    .icon[color="secondary"] {
      color: var(--color-secondary);
      fill: var(--color-secondary);
    }

    .icon[color="info"] {
      color: var(--color-info);
      fill: var(--color-info);
    }

    .icon[color="error"] {
      color: var(--color-error);
      fill: var(--color-error);
    }

    .icon[size="small"] {
      font-size: var(--size-small);
    }

    .icon[size="medium"] {
      font-size: var(--size-medium);
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
