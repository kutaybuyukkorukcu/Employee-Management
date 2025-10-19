import { LitElement, css, html } from "lit";
import { useAppStore } from "../../store";
import { Router } from "@vaadin/router";

import "../../components/header";
import "../../patterns/layout";
import "../../patterns/employee-form";

export class EmsEmployeeAdd extends LitElement {
  static styles = css`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      height: 100%;
    }
  `;

  _handleSave(e) {
    const { employee } = e.detail;
    useAppStore.getState().addEmployee(employee);
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
          <ems-text variant="title" color="primary">Add Employee</ems-text>
          <ems-employee-form @save=${this._handleSave} @cancel=${this._handleCancel}></ems-employee-form>
        </div>
      </ems-layout>
    `;
  }
}

customElements.define("ems-employee-add-page", EmsEmployeeAdd);
