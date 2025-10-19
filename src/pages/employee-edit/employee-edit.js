import { Router } from "@vaadin/router";
import { html, LitElement, css } from "lit";
import { useAppStore } from "../../store/store.js";
import { createRef, ref } from "lit/directives/ref.js";

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
          <ems-text variant="title" color="primary">Edit Employee</ems-text>
          <ems-employee-form
            .employee=${this.employee}
            @save=${this._handleSave}
            @cancel=${this._handleCancel}
          ></ems-employee-form>
        </div>
      </ems-layout>
      <ems-dialog ${ref(this._dialogRef)} .title=${"Are you sure?"}>
        <ems-text variant="body" color="black">
          Are you sure you want to update ${this.employee?.firstName} ${this.employee?.lastName}?
        </ems-text>
        <ems-button slot="footer" variant="filled" color="primary" @click=${this._handleDialogProceed}>
          <ems-text variant="body" color="white">Proceed</ems-text>
        </ems-button>
        <ems-button slot="footer" type="button" variant="outlined" color="secondary" @click=${this._handleDialogCancel}>
          <ems-text variant="body" color="secondary">Cancel</ems-text>
        </ems-button>
      </ems-dialog>
    `;
  }
}

customElements.define("ems-employee-edit-page", EmsEmployeeEdit);
