import { LitElement, css, html } from "lit";

export class EmsText extends LitElement {
  static properties = {
    variant: { type: String, reflect: true }, // title, subtitle, body, caption
    color: { type: String, reflect: true }, // primary, secondary, tertiary
    weight: { type: Boolean, reflect: true }, // true, false
  };

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--font-family-sans);
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
      max-width: 100%;
    }

    :host([variant="title"]) {
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-large);
    }

    :host([variant="subtitle"]) {
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-medium);
    }

    :host([variant="body"]) {
      font-size: var(--font-size-regular);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-regular);
    }

    :host([variant="caption"]) {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-small);
    }

    :host([color="primary"]) {
      color: var(--color-primary);
    }

    :host([color="secondary"]) {
      color: var(--color-secondary);
    }

    :host([color="tertiary"]) {
      color: var(--color-tertiary);
    }

    :host([color="black"]) {
      color: var(--color-black);
    }

    :host([color="white"]) {
      color: var(--color-white);
    }

    :host([color="inherit"]) {
      color: inherit;
    }

    :host([weight]) {
      font-weight: var(--font-weight-bold);
    }

    :host([disabled]) {
      color: var(--color-disabled);
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
