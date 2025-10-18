import { LitElement, css, html } from "lit";

// TODO: Height jumps happen due to pagination and data difference.
export class EmsTable extends LitElement {
  static properties = {
    columns: { type: Array },
    selectable: { type: Boolean },
    data: { type: Array },
    selectedRows: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .table-wrapper {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      background-color: var(--color-white);
      box-shadow: var(--shadow-small);
    }

    table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    thead {
      border-bottom: 1px solid var(--color-background-secondary);
    }

    th {
      padding: var(--spacing-medium);
      text-align: left;
      font-weight: var(--font-weight-medium);
      white-space: nowrap;
      text-align: center;

      * {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    th:first-child {
      width: 40px;
      padding-left: var(--spacing-medium);
    }

    tbody tr {
      border-bottom: 1px solid var(--color-background-secondary);
      text-align: center;
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    tbody tr:hover {
      background-color: var(--color-background-secondary);
    }

    td {
      padding: var(--spacing-x-small) var(--spacing-medium);
      vertical-align: middle;
      white-space: nowrap;
      max-width: 15rem;

      * {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    td:first-child {
      padding-left: var(--spacing-medium);
    }

    .checkbox-cell {
      width: 40px;
      cursor: pointer;
    }

    .actions-cell {
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      th,
      td {
        padding: var(--spacing-small);
        font-size: var(--font-size-small);
      }
    }
  `;

  constructor() {
    super();
    this.columns = [];
    this.selectable = false;
    this.data = [];
    this.selectedRows = [];
  }

  _handleSelectRow(e, rowIndex) {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.selectedRows = [...this.selectedRows, rowIndex];
    } else {
      this.selectedRows = this.selectedRows.filter((index) => index !== rowIndex);
    }

    this.dispatchEvent(
      new CustomEvent("selection-change", {
        detail: {
          selectedRows: this.selectedRows.map((index) => this.data[index]),
          selectedIndices: this.selectedRows,
          areAllSelected: this.selectedRows.length === this.data.length,
        },
      }),
    );
  }

  _handleSelectAll(e) {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.selectedRows = this.data.map((_, index) => index);
    } else {
      this.selectedRows = [];
    }

    this.dispatchEvent(
      new CustomEvent("selection-change", {
        detail: {
          selectedRows: this.selectedRows.map((index) => this.data[index]),
          selectedIndices: this.selectedRows,
          areAllSelected: isChecked,
        },
      }),
    );
  }

  _isRowSelected(rowIndex) {
    return this.selectedRows.includes(rowIndex);
  }

  _areAllRowsSelected() {
    return this.data.length > 0 && this.selectedRows.length === this.data.length;
  }

  _renderCell(row, column, rowIndex) {
    if (column.key === "actions") {
      return html`
        <div class="actions-cell">
          <ems-button
            type="icon"
            variant="text"
            color="primary"
            @click=${() => this._handleAction("edit", row, rowIndex)}
          >
            <ems-icon slot="icon" name="edit-record" size="small"></ems-icon>
          </ems-button>
          <ems-button
            type="icon"
            variant="text"
            color="primary"
            @click=${() => this._handleAction("delete", row, rowIndex)}
          >
            <ems-icon slot="icon" name="delete-record" size="small"></ems-icon>
          </ems-button>
        </div>
      `;
    }

    return row[column.key] || "";
  }

  _handleAction(action, row, rowIndex) {
    this.dispatchEvent(
      new CustomEvent("row-action", {
        detail: { action, row, rowIndex },
      }),
    );
  }

  render() {
    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              ${this.selectable
                ? html`
                    <th class="checkbox-cell">
                      <input type="checkbox" .checked=${this._areAllRowsSelected()} @change=${this._handleSelectAll} />
                    </th>
                  `
                : null}
              ${this.columns.map(
                (column) => html`<th><ems-text variant="caption" color="primary">${column.label}</ems-text></th>`,
              )}
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              (row, rowIndex) => html`
                <tr>
                  ${this.selectable
                    ? html`<td>
                        <input
                          type="checkbox"
                          .checked=${this._isRowSelected(rowIndex)}
                          @change=${(e) => this._handleSelectRow(e, rowIndex)}
                        />
                      </td>`
                    : null}
                  ${this.columns.map(
                    (column) =>
                      html`<td>
                        <ems-text variant="caption" color="black">${this._renderCell(row, column, rowIndex)}</ems-text>
                      </td>`,
                  )}
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define("ems-table", EmsTable);
