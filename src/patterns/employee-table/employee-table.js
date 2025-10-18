import "../../components/table/table.js";
import "../../components/text/text.js";
import "../../components/button/button.js";
import "../../components/icon/icon.js";

import { LitElement, css, html } from "lit";

export class EmsEmployeeTable extends LitElement {
  static properties = {
    employees: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
    }

    .table-row {
      display: contents;
    }

    .actions-cell {
      display: flex;
      gap: var(--spacing-x-small);
      align-items: center;
    }

    input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.columns = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "dateOfEmployment", label: "Date of Employment" },
      { key: "dateOfBirth", label: "Date of Birth" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "department", label: "Department" },
      { key: "position", label: "Position" },
      { key: "actions", label: "Actions" },
    ];
  }

  _handleEdit(employee) {
    this.dispatchEvent(
      new CustomEvent("edit", {
        detail: { employee },
      }),
    );
  }

  _handleDelete(employee) {
    this.dispatchEvent(
      new CustomEvent("delete", {
        detail: { employee },
      }),
    );
  }

  _handleSelectAll(e) {
    this.dispatchEvent(
      new CustomEvent("select-all", {
        detail: { checked: e.target.checked },
      }),
    );
  }

  _handleSelectRow(employee, e) {
    this.dispatchEvent(
      new CustomEvent("select-row", {
        detail: { employee, checked: e.target.checked },
      }),
    );
  }

  render() {
    return html`
      <ems-table .columns=${this.columns} selectable>
        <input slot="header-checkbox" type="checkbox" @change=${this._handleSelectAll} />

        ${this.employees.map(
          (employee) => html`
            <tr class="table-row" slot="body">
              <td>
                <input type="checkbox" @change=${(e) => this._handleSelectRow(employee, e)} />
              </td>
              <td><ems-text variant="body" color="black">${employee.firstName}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.lastName}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.dateOfEmployment}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.dateOfBirth}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.phone}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.email}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.department}</ems-text></td>
              <td><ems-text variant="body" color="black">${employee.position}</ems-text></td>
              <td>
                <div class="actions-cell">
                  <ems-button type="icon" variant="text" color="secondary" @click=${() => this._handleEdit(employee)}>
                    <ems-icon slot="icon" name="edit-record" size="small" color="secondary"></ems-icon>
                  </ems-button>
                  <ems-button type="icon" variant="text" color="tertiary" @click=${() => this._handleDelete(employee)}>
                    <ems-icon slot="icon" name="delete-record" size="small" color="tertiary"></ems-icon>
                  </ems-button>
                </div>
              </td>
            </tr>
          `,
        )}
      </ems-table>
    `;
  }
}

customElements.define("ems-employee-table", EmsEmployeeTable);
