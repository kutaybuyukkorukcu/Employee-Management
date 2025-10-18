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
      new CustomEvent("employee-edit", {
        detail: { employee },
      }),
    );
  }

  _handleDelete(employee) {
    this.dispatchEvent(
      new CustomEvent("employee-delete", {
        detail: { employee },
      }),
    );
  }

  _handleSelectionChange(e) {
    const { selectedRows, selectedIndices, areAllSelected } = e.detail;

    this.dispatchEvent(
      new CustomEvent("employee-selection-change", {
        detail: {
          selectedEmployees: selectedRows,
          selectedIndices,
          areAllSelected,
        },
      }),
    );
  }

  _handleRowActionFromTable(e) {
    const { action, row } = e.detail;
    if (action === "edit") {
      this._handleEdit(row);
    } else if (action === "delete") {
      this._handleDelete(row);
    }
  }

  render() {
    return html`
      <ems-table
        .columns=${this.columns}
        .data=${this.employees}
        selectable
        @selection-change=${this._handleSelectionChange}
        @row-action=${this._handleRowActionFromTable}
      >
      </ems-table>
    `;
  }
}

customElements.define("ems-employee-table", EmsEmployeeTable);
