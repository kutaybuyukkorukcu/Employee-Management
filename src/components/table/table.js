import { LitElement, css, html } from "lit";

export class EmsTable extends LitElement {
  static properties = {
    columns: { type: Array }, // Array of column definitions
    selectable: { type: Boolean }, // Show checkboxes
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
      background-color: var(--color-white);
      border-radius: var(--radius-medium);
      box-shadow: var(--shadow-small);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    thead {
      border-bottom: 1px solid var(--color-background-secondary);
    }

    th {
      padding: var(--spacing-medium);
      text-align: left;
      font-weight: var(--font-weight-medium);
      white-space: nowrap;
    }

    th:first-child {
      width: 40px;
      padding-left: var(--spacing-medium);
    }

    tbody tr {
      border-bottom: 1px solid var(--color-background-secondary);
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    tbody tr:hover {
      background-color: var(--color-background-secondary);
    }

    td {
      padding: var(--spacing-medium);
      vertical-align: middle;
    }

    td:first-child {
      padding-left: var(--spacing-medium);
    }

    .checkbox-cell {
      width: 40px;
    }

    /* Responsive */
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
                      <slot name="header-checkbox"></slot>
                    </th>
                  `
                : null}
              ${this.columns.map(
                (column) => html`
                  <th>
                    <slot name="header-${column.key}">${column.label}</slot>
                  </th>
                `,
              )}
            </tr>
          </thead>
          <tbody>
            <slot name="body"></slot>
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define("ems-table", EmsTable);
