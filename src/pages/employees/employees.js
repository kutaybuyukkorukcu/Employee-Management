import { LitElement, css, html } from "lit";
import { useAppStore } from "../../store/store.js";

export class EmsEmployeesPage extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String }, // table or grid
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
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

  _handleEmployeeEdit(employee) {
    console.log("Edit employee:", employee);
  }

  _handleEmployeeDelete(employee) {
    console.log("Delete employee:", employee);
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
                  (employee) => html`<ems-employee-card .employee=${employee}></ems-employee-card>`,
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
    `;
  }
}

customElements.define("ems-employees-page", EmsEmployeesPage);
