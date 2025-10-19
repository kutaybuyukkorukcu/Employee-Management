import { Router } from "@vaadin/router";
import { html, LitElement, css } from "lit";
import { useAppStore } from "../../store/store.js";

export class EmsEmployeeEdit extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = css`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      height: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.employee = useAppStore.getState().selectedEmployee;
  }

  _handleSave(e) {
    const { employee } = e.detail;
    useAppStore.getState().updateEmployee(employee.id, employee);
    Router.go("/");
  }

  _handleCancel() {
    Router.go("/");
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
    `;
  }
}

customElements.define("ems-employee-edit-page", EmsEmployeeEdit);
