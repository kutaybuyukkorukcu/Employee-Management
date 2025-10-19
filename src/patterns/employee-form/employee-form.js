import { css, html, LitElement } from "lit";
import { parseDate, parsePhoneNumber } from "../../utils";

export class EmsEmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-x-large) var(--spacing-xx-large);
      background: #fff;
      padding: var(--spacing-x-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      max-width: 100%;
      box-sizing: border-box;
      grid-auto-rows: min-content;
      height: 100%;
    }

    .form-actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      gap: var(--spacing-x-large);

      * {
        max-width: 20rem;
        width: 100%;
      }
    }

    @media (max-width: 1024px) {
      form {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      form {
        grid-template-columns: 1fr;
      }
    }
  `;

  _handleEmployeeSubmit(e) {
    e.preventDefault();
    const form = this.shadowRoot.querySelector("form");
    if (!form.reportValidity()) {
      const elements = Array.from(form.elements);
      for (const element of elements) {
        if (element instanceof HTMLElement && !element.checkValidity()) {
          if (typeof element.focus === "function") {
            element.focus();
          }
          break;
        }
      }
      return;
    }
    const formData = new FormData(form);
    const employee = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfEmployment: parseDate(formData.get("dateOfEmployment")),
      dateOfBirth: parseDate(formData.get("dateOfBirth")),
      phone: parsePhoneNumber(formData.get("phone")),
      email: formData.get("email"),
      department: formData.get("department"),
      position: formData.get("position"),
    };

    this.dispatchEvent(new CustomEvent("save", { detail: { employee }, bubbles: true, composed: true }));
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <form>
        <ems-input
          label="First Name"
          name="firstName"
          type="text"
          .value=${this.employee?.firstName || ""}
          required
        ></ems-input>
        <ems-input
          label="Last Name"
          name="lastName"
          type="text"
          .value=${this.employee?.lastName || ""}
          required
        ></ems-input>
        <ems-input
          label="Date of Employment"
          name="dateOfEmployment"
          type="date"
          .value=${this.employee?.dateOfEmployment || ""}
          required
        ></ems-input>
        <ems-input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          .value=${this.employee?.dateOfBirth || ""}
          required
        ></ems-input>
        <ems-input label="Phone" name="phone" type="tel" .value=${this.employee?.phone || ""} required></ems-input>
        <ems-input label="Email" name="email" type="email" .value=${this.employee?.email || ""} required></ems-input>
        <ems-input
          label="Department"
          name="department"
          type="text"
          .value=${this.employee?.department || ""}
          required
        ></ems-input>
        <ems-select
          label="Position"
          name="position"
          .value=${this.employee?.position || ""}
          .options=${[
            { value: "manager", label: "Manager" },
            { value: "developer", label: "Developer" },
            { value: "designer", label: "Designer" },
          ]}
          placeholder="Select Position"
          required
        ></ems-select>
        <div class="form-actions">
          <ems-button type="button" color="primary" variant="filled" @click=${this._handleEmployeeSubmit}>
            Save
          </ems-button>
          <ems-button type="button" color="secondary" variant="outlined" @click=${this._handleCancel}>
            Cancel
          </ems-button>
        </div>
      </form>
    `;
  }
}

customElements.define("ems-employee-form", EmsEmployeeForm);
