import { LitElement, css, html } from "lit";

export class EmsSelect extends LitElement {
  static properties = {
    options: { type: Array, attribute: false },
    required: { type: Boolean },
    disabled: { type: Boolean },
    name: { type: String },
    placeholder: { type: String },
    label: { type: String },
    value: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
    }

    select {
      padding: var(--spacing-small);
      font-size: var(--font-size-regular);
      border-radius: var(--radius-small);
      outline: none;
      cursor: pointer;
    }

    select:disabled {
      background-color: var(--color-disabled);
      cursor: not-allowed;
    }
  `;

  static get formAssociated() {
    return true;
  }

  static shadowRootOptions = { mode: "open", delegatesFocus: true };

  constructor() {
    super();
    /** @type {Array<{label: string, value: string}>} */
    this.options = [];
    this.value = "";
    this.internals = this.attachInternals();
  }

  willUpdate() {
    this.internals.setFormValue(this.value);
    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, "This field is required");
      return;
    }
    this.internals.setValidity({});
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  get validity() {
    return this.internals.validity;
  }

  checkValidity() {
    return this.validity.valid;
  }

  focus() {
    this.shadowRoot.querySelector("select").focus();
  }

  _onChange(event) {
    this.value = event.target.value;
    this.internals.setFormValue(this.value);
  }

  render() {
    return html`
      <label ?hidden=${!this.label} for=${this.name}
        ><ems-text variant="body" color="black">${this.label}</ems-text></label
      >
      <select
        name=${this.name}
        ?disabled=${this.disabled}
        ?required=${this.required}
        .value=${this.value}
        @change=${this._onChange}
      >
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
