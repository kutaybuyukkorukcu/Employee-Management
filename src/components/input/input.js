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

    input[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      background-size: 1rem;
      background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" /> </svg>');
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
        this.internals.setValidity({ typeMismatch: true }, "Please enter a valid date", this);
        return;
      }
    }
    if (this.type === "tel" && this.value) {
      const digits = this.value.replace(/\D/g, "");
      // const phonePattern = /^(?:\d{10}|0\d{10}|90\d{9})$/;
      const phonePattern = /^(?:\s*(?:90|0)?\s*\d{3}\s*\d{3}\s*\d{2}\s*\d{2}\s*)$/;
      if (!phonePattern.test(digits)) {
        this.internals.setValidity({ typeMismatch: true }, "Please enter a valid phone number", this);
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
