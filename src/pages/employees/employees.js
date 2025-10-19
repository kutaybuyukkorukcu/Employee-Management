import { LitElement, css, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { useAppStore } from "../../store";
import { Router } from "@vaadin/router";

import "../../components/dialog";
import "../../components/pagination";
import "../../components/header";
import "../../patterns/layout";
import "../../patterns/employee-card";
import "../../patterns/employee-table";

export class EmsEmployeesPage extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String }, // table or grid
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    selectedEmployee: { type: Object, state: true },
  };

  static styles = css`
    .page-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .view-mode-toggle {
      display: flex;
      gap: var(--spacing-small);
    }

    .view-mode-toggle ems-button:not([active]) {
      opacity: 0.5;
    }

    .view-mode-toggle ems-button[active] {
      opacity: 1;
    }

    .employees-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(18.75rem, 35rem));
      grid-template-rows: repeat(2, auto);
      gap: var(--spacing-large) var(--spacing-xx-large);
      justify-content: center;
    }

    .page-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: var(--spacing-large);
    }

    @media (max-width: 1024px) {
      .employees-grid {
        gap: var(--spacing-large);
      }
    }

    @media (max-width: 768px) {
      .employees-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.viewMode = "table";
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.selectedEmployee = null;
    this._dialogRef = createRef();
  }

  connectedCallback() {
    super.connectedCallback();
    this.employees = useAppStore.getState().employees;
    this._unsubscribe = useAppStore.subscribe((state) => {
      this.employees = state.employees;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe?.();
  }

  _handleEmployeeEdit(e) {
    const { employee } = e.detail;
    Router.go(`/employee/edit/${employee.id}`);
  }

  _handleEmployeeDelete(e) {
    const { employee } = e.detail;
    this.selectedEmployee = employee;
    this.updateComplete.then(() => {
      this._dialogRef.value?.show();
    });
  }

  _handlePageChange(e) {
    this.currentPage = e.detail.page;
  }

  _getItemsPerPage() {
    return this.viewMode === "grid" ? 4 : 9;
  }

  _getPaginatedEmployees() {
    const itemsPerPage = this._getItemsPerPage();
    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.employees.slice(startIndex, endIndex);
  }

  _getTotalPages() {
    const itemsPerPage = this._getItemsPerPage();
    return Math.ceil(this.employees.length / itemsPerPage);
  }

  _handleDialogProceed() {
    useAppStore.getState().deleteEmployee(this.selectedEmployee.id);
    this._dialogRef.value?.close();
    this.selectedEmployee = null;
  }

  _handleDialogCancel() {
    this._dialogRef.value?.close();
    this.selectedEmployee = null;
  }

  render() {
    return html`
      <ems-layout>
        <ems-header slot="header"></ems-header>
        <div class="page-container">
          <div class="page-header">
            <ems-text variant="title" color="primary">Employee List</ems-text>
            <div class="view-mode-toggle">
              <ems-button
                type="icon"
                @click="${() => {
                  this.viewMode = "table";
                  this.currentPage = 1;
                }}"
                ?active="${this.viewMode === "table"}"
                variant="text"
              >
                <ems-icon name="table" slot="icon" size="medium"></ems-icon>
              </ems-button>
              <ems-button
                type="icon"
                @click="${() => {
                  this.viewMode = "grid";
                  this.currentPage = 1;
                }}"
                ?active="${this.viewMode === "grid"}"
                variant="text"
              >
                <ems-icon name="grid" slot="icon" size="medium"></ems-icon>
              </ems-button>
            </div>
          </div>
          ${this.viewMode === "table"
            ? html`<ems-employee-table
                .employees=${this._getPaginatedEmployees()}
                @employee-edit=${this._handleEmployeeEdit}
                @employee-delete=${this._handleEmployeeDelete}
              ></ems-employee-table>`
            : html`<div class="employees-grid">
                ${this._getPaginatedEmployees().map(
                  (employee) =>
                    html`<ems-employee-card
                      .employee=${employee}
                      @employee-edit=${this._handleEmployeeEdit}
                      @employee-delete=${this._handleEmployeeDelete}
                    ></ems-employee-card>`,
                )}
              </div>`}
        </div>
        <ems-pagination
          slot="footer"
          .currentPage=${this.currentPage}
          .totalPages=${this._getTotalPages()}
          .siblingCount=${1}
          @page-change=${this._handlePageChange}
        ></ems-pagination>
      </ems-layout>
      <ems-dialog
        ${ref(this._dialogRef)}
        .title=${"Are you sure?"}
        @dialog-close=${() => {
          this.selectedEmployee = null;
        }}
      >
        <ems-text variant="body" color="black">
          Are you sure you want to delete ${this.selectedEmployee?.firstName} ${this.selectedEmployee?.lastName}?
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

customElements.define("ems-employees-page", EmsEmployeesPage);
