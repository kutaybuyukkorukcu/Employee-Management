import "../../components/header";
import "../../patterns/layout";
import "../../patterns/employee-form";

import { LitElement, css, html } from "lit";

import { I18nController } from "../../controllers";
import { Router } from "@vaadin/router";
import { useAppStore } from "../../store";

export class EmsEmployeeAdd extends LitElement {
  static styles = css`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      height: 100%;
    }

    @media (max-width: 768px) {
      .page-container {
        height: unset;
      }
    }
  `;

  constructor() {
    super();
    this.i18n = new I18nController(this);
  }

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
          <ems-text variant="title" color="primary">${this.i18n.t("employee.add.title")}</ems-text>
          <ems-employee-form @save=${this._handleSave} @cancel=${this._handleCancel}></ems-employee-form>
        </div>
      </ems-layout>
    `;
  }
}

customElements.define("ems-employee-add-page", EmsEmployeeAdd);
