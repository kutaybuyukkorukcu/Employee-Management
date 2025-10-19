import { LitElement, css, html } from "lit";

export class EmsInput extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    name: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean },
    required: { type: Boolean },
    label: { type: String },
    value: { type: String },
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

  static get formAssociated() {
    return true;
  }

  static shadowRootOptions = { mode: "open", delegatesFocus: true };

  constructor() {
    super();
    /** @type {'text'|'password'|'email'|'number'|'tel'|'url'|'search'|'date'|'time'|'datetime-local'|'month'|'week'|'color'|'checkbox'|'radio'|'file'|'hidden'|'range'} */
    this.type = "text";
    this.name = "";
    this.placeholder = "";
    this.disabled = false;
    this.required = false;
    this.value = "";
    this.internals = this.attachInternals();
  }

  willUpdate() {
    this.internals.setFormValue(this.value);

    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, "This field is required", this);
      return;
    }
    if (this.type === "email" && this.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.value)) {
        this.internals.setValidity({ typeMismatch: true }, "Please enter a valid email address", this);
        return;
      }
    }
    if (this.type === "date" && this.value) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(this.value)) {
        this.internals.setValidity({ typeMismatch: true }, "Please enter a valid date in DD-MM-YYYY format", this);
        return;
      }
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
    this.shadowRoot.querySelector("input").focus();
  }

  _onInput(event) {
    this.value = event.target.value;
    this.internals.setFormValue(this.value);
  }

  render() {
    return html`
      <label ?hidden=${!this.label} for=${this.name}>
        <ems-text variant="body" color="black">${this.label}</ems-text></label
      >
      <input
        class="ems-input"
        type=${this.type}
        name=${this.name}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?required=${this.required}
        .value=${this.value}
        @input=${this._onInput}
        @change=${this._onInput}
      />
    `;
  }
}

customElements.define("ems-input", EmsInput);
