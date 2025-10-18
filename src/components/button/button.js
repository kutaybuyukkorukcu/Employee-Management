import { LitElement, css, html } from "lit";

export class EmsButton extends LitElement {
  static properties = {
    type: { type: String },
    variant: { type: String, reflect: true }, // outlined, filled, text
    color: { type: String, reflect: true }, // primary, secondary, tertiary
    maxWidth: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([maxWidth]) {
      width: 100%;
      max-width: 100%;
    }

    :host([variant="filled"][color="primary"]) button {
      background: var(--color-primary);
      color: var(--color-white);
      border: 1px solid transparent;
      border-radius: var(--radius-small);
    }

    :host([variant="filled"][color="secondary"]) button {
      background: var(--color-secondary);
      color: var(--color-white);
      border: 1px solid transparent;
      border-radius: var(--radius-small);
    }

    :host([variant="filled"][color="tertiary"]) button {
      background: var(--color-tertiary);
      color: var(--color-white);
      border: 1px solid transparent;
      border-radius: var(--radius-small);
    }

    :host([variant="outlined"][color="primary"]) button {
      background: var(--color-white);
      color: var(--color-black);
      border: 1px solid var(--color-black);
      border-radius: var(--radius-small);
    }

    :host([variant="outlined"][color="secondary"]) button {
      background: var(--color-white);
      color: var(--color-secondary);
      border: 1px solid var(--color-black);
      border-radius: var(--radius-small);
    }

    :host([variant="text"]) button {
      background: transparent;
      color: inherit;
      border: 1px solid transparent;
    }

    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      gap: var(--gap-small);
      padding: var(--spacing-x-small);
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
  }

  render() {
    return html` <button type=${this.type}>
      <slot name="icon"></slot>
      <ems-text variant="body" color="inherit">
        <slot></slot>
      </ems-text>
    </button>`;
  }
}

customElements.define("ems-button", EmsButton);
