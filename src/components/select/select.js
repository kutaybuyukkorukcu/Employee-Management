import { LitElement, css, html } from "lit";

export class EmsSelect extends LitElement {
  static properties = {
    options: { type: Array, attribute: false },
    required: { type: Boolean },
    disabled: { type: Boolean },
    name: { type: String },
    placeholder: { type: String },
    label: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
    }

    select {
      padding: var(--spacing-small);
      border: 1px solid #ccc;
      font-size: var(--font-size-medium);
      border-radius: var(--radius-small);
      outline: none;
    }

    select:disabled {
      background-color: var(--color-disabled);
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    /** @type {Array<{label: string, value: string}>} */
    this.options = [];
    this.value = "";
  }

  _onChange(event) {
    this.value = event.target.value;
  }

  render() {
    return html`
      <label ?hidden=${!this.label} for=${this.name}>${this.label}</label>
      <select name=${this.name} ?disabled=${this.disabled} ?required=${this.required} @change="${this._onChange}">
        <option value="" disabled selected hidden>${this.placeholder}</option>
        ${this.options.map(
          (option) => html`
            <option value="${option.value}" ?selected="${option.value === this.value}">${option.label}</option>
          `,
        )}
      </select>
    `;
  }
}

customElements.define("ems-select", EmsSelect);
