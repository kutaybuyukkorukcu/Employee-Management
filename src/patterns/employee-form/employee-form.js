import "../../components/input";
import "../../components/select";
import "../../components/button";

import { LitElement, css, html } from "lit";
import { formatDateForInput, parseDate, parsePhoneNumber } from "../../utils";

import { I18nController } from "../../controllers";

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
      box-shadow: var(--shadow-medium);
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

    .employee-information {
      position: absolute;
      padding-left: var(--spacing-medium);
      padding-top: var(--spacing-medium);
    }

    @media (max-width: 1024px) {
      form {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      form {
        grid-template-columns: 1fr;
        padding: var(--spacing-large);
      }

      .employee-information {
        position: unset;
        padding-bottom: var(--spacing-medium);
        padding-left: unset;
        padding-top: unset;
      }
    }
  `;

  constructor() {
    super();
    this.i18n = new I18nController(this);
  }

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
      id: this.employee?.id || crypto.randomUUID(),
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
      ${this.employee
        ? html`
            <ems-text class="employee-information" variant="body" color="black" weight>
              ${this.i18n.t("employee.edit.caption", {
                firstName: this.employee?.firstName,
                lastName: this.employee?.lastName,
              })}
            </ems-text>
          `
        : ""}
      <form>
        <ems-input
          label="${this.i18n.t("employee.details.firstName")}"
          name="firstName"
          type="text"
          .value=${this.employee?.firstName || ""}
          required
        ></ems-input>
        <ems-input
          label="${this.i18n.t("employee.details.lastName")}"
          name="lastName"
          type="text"
          .value=${this.employee?.lastName || ""}
          required
        ></ems-input>
        <ems-input
          label="${this.i18n.t("employee.details.dateOfEmployment")}"
          name="dateOfEmployment"
          type="date"
          .value=${formatDateForInput(this.employee?.dateOfEmployment) || ""}
          required
        ></ems-input>
        <ems-input
          label="${this.i18n.t("employee.details.dateOfBirth")}"
          name="dateOfBirth"
          type="date"
          .value=${formatDateForInput(this.employee?.dateOfBirth) || ""}
          required
        ></ems-input>
        <ems-input
          label="${this.i18n.t("employee.details.phone")}"
          name="phone"
          type="tel"
          .value=${this.employee?.phone || ""}
          required
        ></ems-input>
        <ems-input
          label="${this.i18n.t("employee.details.email")}"
          name="email"
          type="email"
          .value=${this.employee?.email || ""}
          required
        ></ems-input>
        <ems-select
          label="${this.i18n.t("employee.details.department.label")}"
          name="department"
          .value=${this.employee?.department || ""}
          .options=${[
            { value: "Analytics", label: "Analytics" },
            { value: "Tech", label: "Tech" },
          ]}
          placeholder="${this.i18n.t("employee.details.department.placeholder")}"
          required
        ></ems-select>
        <ems-select
          label="${this.i18n.t("employee.details.position.label")}"
          name="position"
          .value=${this.employee?.position || ""}
          .options=${[
            { value: "junior", label: "Junior" },
            { value: "medior", label: "Medior" },
            { value: "senior", label: "Senior" },
          ]}
          placeholder="${this.i18n.t("employee.details.position.placeholder")}"
          required
        ></ems-select>
        <div class="form-actions">
          <ems-button type="button" color="primary" variant="filled" @click=${this._handleEmployeeSubmit}>
            ${this.i18n.t("common.save")}
          </ems-button>
          <ems-button type="button" color="secondary" variant="outlined" @click=${this._handleCancel}>
            ${this.i18n.t("common.cancel")}
          </ems-button>
        </div>
      </form>
    `;
  }
}

customElements.define("ems-employee-form", EmsEmployeeForm);
