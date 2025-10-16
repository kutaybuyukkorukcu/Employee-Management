import { LitElement, css, html } from "lit";

export class EmsText extends LitElement {
  static properties = {
    variant: { type: String, reflect: true }, // title, subtitle, body, caption
    color: { type: String, reflect: true }, // primary, secondary, info, error
    weight: { type: Boolean, reflect: true }, // true, false
  };

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--font-family-sans);
    }

    :host([variant="title"]) {
      font-size: var(--font-size-500);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-500);
    }

    :host([variant="subtitle"]) {
      font-size: var(--font-size-400);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-400);
    }

    :host([variant="body"]) {
      font-size: var(--font-size-300);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-300);
    }

    :host([variant="caption"]) {
      font-size: var(--font-size-200);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-200);
    }

    :host([color="primary"]) {
      color: var(--color-text-primary);
    }

    :host([color="secondary"]) {
      color: var(--color-text-secondary);
    }

    :host([color="info"]) {
      color: var(--color-text-info);
    }

    :host([color="error"]) {
      color: var(--color-text-error);
    }

    :host([color="black"]) {
      color: var(--color-text-black);
    }

    :host([color="white"]) {
      color: var(--color-text-white);
    }

    :host([weight]) {
      font-weight: var(--font-weight-bold);
    }
  `;

  constructor() {
    super();
    this.variant = "body";
    this.color = "primary";
    this.weight = false;
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define("ems-text", EmsText);
