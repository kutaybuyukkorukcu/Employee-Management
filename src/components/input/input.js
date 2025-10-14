import { LitElement, css, html } from "lit";

export class EmsInput extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    name: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean },
    required: { type: Boolean },
    id: { type: String },
    label: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
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
    this.id = "";
  }

  render() {
    return html` <label for=${this.id}>${this.label}</label>
      <input
        class="ems-input"
        type=${this.type}
        id=${this.id}
        name=${this.name}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?required=${this.required}
      />`;
  }
}

customElements.define("ems-input", EmsInput);
