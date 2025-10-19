import { LitElement, css, html } from "lit";

import "../../components/table";

export class EmsEmployeeTable extends LitElement {
  static properties = {
    employees: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.columns = [
      { key: "firstName", label: "First Name", type: "text" },
      { key: "lastName", label: "Last Name", type: "text" },
      { key: "dateOfEmployment", label: "Date of Employment", type: "date" },
      { key: "dateOfBirth", label: "Date of Birth", type: "date" },
      { key: "phone", label: "Phone", type: "phone" },
      { key: "email", label: "Email", type: "email" },
      { key: "department", label: "Department", type: "text" },
      { key: "position", label: "Position", type: "text" },
      { key: "actions", label: "Actions", type: "action" },
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
