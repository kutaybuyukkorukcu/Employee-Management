import { LitElement, css, html } from "lit";

export class EmsEmployeesPage extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String }, // table or grid
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

    .employees-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--spacing-medium);
      margin-top: var(--spacing-medium);
    }

    @media (max-width: 768px) {
      .employees-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    this.employees = [
      {
        firstName: "Ahmet",
        lastName: "Sourtimes",
        dateOfEmployment: "23/09/2022",
        dateOfBirth: "23/09/2022",
        phone: "+(90) 532 123 45 67",
        email: "ahmet@sourtimes.org",
        department: "Analytics",
        position: "Junior",
      },
    ];
    this.viewMode = "table";
  }

  render() {
    return html`
        <ems-layout>
            <ems-header slot="header"></ems-header>
            <div class="page-header">
                <ems-text variant="title" color="black">Employee List</ems-text>
                <div class="view-mode-toggle">
                <ems-button type="icon" @click="${() => (this.viewMode = "table")}" ?active="${this.viewMode === "table"}">
                    <ems-icon name="table" slot="icon"></ems-icon>
                </ems-button>
                <ems-button type="icon" @click="${() => (this.viewMode = "grid")}" ?active="${this.viewMode === "grid"}">
                    <ems-icon name="grid" slot="icon"></ems-icon>
                </ems-button>
                </div>
            </div>
            <div class="employee-list"></div>
                ${
                  this.viewMode === "table"
                    ? html`<ems-employee-table .employees=${this.employees}></ems-employee-table>`
                    : html`<div class="employees-grid">
                        ${this.employees.map(
                          (employee) => html`<ems-employee-card .employee=${employee}></ems-employee-card>`,
                        )}
                      </div>`
                }
            </div>
        </ems-layout>
    `;
  }
}

customElements.define("ems-employees-page", EmsEmployeesPage);
