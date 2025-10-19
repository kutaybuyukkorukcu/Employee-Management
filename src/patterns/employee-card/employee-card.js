import "../../components/card";
import "../../components/text";
import "../../components/button";
import "../../components/icon";

import { LitElement, css, html } from "lit";
import { formatDate, formatPhoneNumber, formatText } from "../../utils";

import { I18nController } from "../../controllers";

export class EmsEmployeeCard extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
    }

    .employee-card-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-medium);
      min-height: 15rem;
    }

    .employee-field {
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }

    @media (max-width: 768px) {
      .employee-card-content {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    this.i18n = new I18nController(this);
  }

  _handleEdit() {
    this.dispatchEvent(
      new CustomEvent("employee-edit", {
        detail: { employee: this.employee },
      }),
    );
  }

  _handleDelete() {
    this.dispatchEvent(
      new CustomEvent("employee-delete", {
        detail: { employee: this.employee },
      }),
    );
  }

  render() {
    if (!this.employee) return html``;

    return html`
      <ems-card>
        <div class="employee-card-content">
          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.firstName")}</ems-text>
            <ems-text variant="body" color="black">${formatText(this.employee.firstName)}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.lastName")}</ems-text>
            <ems-text variant="body" color="black">${formatText(this.employee.lastName)}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.dateOfEmployment")}</ems-text>
            <ems-text variant="body" color="black">${formatDate(this.employee.dateOfEmployment)}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.dateOfBirth")}</ems-text>
            <ems-text variant="body" color="black">${formatDate(this.employee.dateOfBirth)}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.phone")}</ems-text>
            <ems-text variant="body" color="black">${formatPhoneNumber(this.employee.phone)}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.email")}</ems-text>
            <ems-text variant="body" color="black">${this.employee.email}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.department")}</ems-text>
            <ems-text variant="body" color="black">${formatText(this.employee.department)}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>${this.i18n.t("employee.details.position.label")}</ems-text>
            <ems-text variant="body" color="black">${formatText(this.employee.position)}</ems-text>
          </div>
        </div>

        <ems-button slot="footer" variant="filled" color="secondary" size="medium" @click=${this._handleEdit}>
          <ems-icon slot="icon" name="edit-record" size="small" color="white"></ems-icon>
          <ems-text variant="body" color="white">${this.i18n.t("common.edit")}</ems-text>
        </ems-button>

        <ems-button slot="footer" variant="filled" color="tertiary" size="medium" @click=${this._handleDelete}>
          <ems-icon slot="icon" name="delete-record" size="small" color="white"></ems-icon>
          <ems-text variant="body" color="white">${this.i18n.t("common.delete")}</ems-text>
        </ems-button>
      </ems-card>
    `;
  }
}

customElements.define("ems-employee-card", EmsEmployeeCard);
