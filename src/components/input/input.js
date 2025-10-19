import { LitElement, css, html } from "lit";

export class EmsInput extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    name: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean },
    required: { type: Boolean },
    label: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
      justify-content: space-between;
    }

    .ems-input {
      padding: var(--space-2) var(--space-1);
    }
  `;

  constructor() {
    super();
    /** @type {'text'|'password'|'email'|'number'|'tel'|'url'|'search'|'date'|'time'|'datetime-local'|'month'|'week'|'color'|'checkbox'|'radio'|'file'|'hidden'|'range'} */
    this.type = "text";
    this.name = "";
    this.placeholder = "";
    this.disabled = false;
    this.required = false;
  }

  render() {
    return html` <label ?hidden=${!this.label} for=${this.name}>
        <ems-text variant="body" color="black">${this.label}</ems-text></label
      >
      <input
        class="ems-input"
        type=${this.type}
        name=${this.name}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?required=${this.required}
      />`;
  }
}

customElements.define("ems-input", EmsInput);
