import { LitElement, css, html } from "lit";

export class EmsButton extends LitElement {
  static properties = {
    type: { type: String },
    label: { type: String },
    variant: { type: String, reflect: true }, // outlined, filled, text
    color: { type: String, reflect: true }, // primary, secondary, info, error
    maxWidth: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([variant="filled"][color="primary"]) {
      --button-background: var(--color-primary);
      --button-color: var(--color-text-white);
      --button-border-radius: var(--radius-small);
    }

    :host([variant="outlined"][color="primary"]) {
      --button-background: var(--color-white);
      --button-color: var(--color-black);
      --button-border-radius: var(--radius-small);
      --button-border-color: var(--color-black);
    }

    :host([type="menu"][variant="text"][color="primary"]) {
      --button-background: var(--color-white);
      --button-color: var(--color-text-primary);
      --button-border-radius: var(--radius-small);
    }

    :host([type="menu"][variant="text"][color="secondary"]) {
      --button-background: var(--color-white);
      --button-color: var(--color-text-secondary);
      --button-border-radius: var(--radius-small);
    }

    :host([maxWidth]) {
      width: 100%;
      max-width: 100%;
    }

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      gap: var(--gap-small);
      padding: var(--spacing-x-small);
      color: var(--button-color);
      background: var(--button-background);
      background-color: var(--button-background);
      border-radius: var(--button-border-radius);
      border: 1px solid var(--button-border-color);
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();
    /** @type {'button' | 'submit' | 'reset' | 'menu'} */
    this.type = "button";
    this.color = "primary";
    this.variant = "filled";
    this.label = "";
  }

  render() {
    return html` <button type=${this.type}>
      <slot name="icon"></slot>
      ${this.label}
    </button>`;
  }
}

customElements.define("ems-button", EmsButton);
