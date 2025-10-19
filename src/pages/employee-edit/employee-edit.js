import "../../components/header";
import "../../patterns/layout";
import "../../patterns/employee-form";

import { LitElement, css, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

import { I18nController } from "../../controllers";
import { Router } from "@vaadin/router";
import { useAppStore } from "../../store";

export class EmsEmployeeEdit extends LitElement {
  static properties = {
    employee: { type: Object },
    updatedEmployee: { type: Object, state: true },
  };

  static styles = css`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      height: 100%;
    }
  `;

  constructor() {
    super();
    this._dialogRef = createRef();
    this.i18n = new I18nController(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.employee = useAppStore.getState().selectedEmployee;
  }

  _handleSave(e) {
    const { employee } = e.detail;
    this.updatedEmployee = employee;
    this._dialogRef.value?.show();
  }

  _handleCancel() {
    Router.go("/");
  }

  _handleDialogProceed() {
    useAppStore.getState().updateEmployee(this.updatedEmployee.id, this.updatedEmployee);
    Router.go("/");
  }

  _handleDialogCancel() {
    this._dialogRef.value?.close();
  }

  render() {
    return html`
      <ems-layout>
        <ems-header slot="header"></ems-header>
        <div class="page-container">
          <ems-text variant="title" color="primary">${this.i18n.t("employee.edit.title")}</ems-text>
          <ems-employee-form
            .employee=${this.employee}
            @save=${this._handleSave}
            @cancel=${this._handleCancel}
          ></ems-employee-form>
        </div>
      </ems-layout>
      <ems-dialog ${ref(this._dialogRef)} .title=${this.i18n.t("employee.edit.dialog.title")}>
        <ems-text variant="body" color="black">
          ${this.i18n.t("employee.edit.dialog.message", {
            firstName: this.employee?.firstName,
            lastName: this.employee?.lastName,
          })}
        </ems-text>
        <ems-button slot="footer" variant="filled" color="primary" @click=${this._handleDialogProceed}>
          <ems-text variant="body" color="white">${this.i18n.t("common.proceed")}</ems-text>
        </ems-button>
        <ems-button slot="footer" type="button" variant="outlined" color="secondary" @click=${this._handleDialogCancel}>
          <ems-text variant="body" color="secondary">${this.i18n.t("common.cancel")}</ems-text>
        </ems-button>
      </ems-dialog>
    `;
  }
}

customElements.define("ems-employee-edit-page", EmsEmployeeEdit);
