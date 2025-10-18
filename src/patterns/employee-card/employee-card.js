import "../../components/card/card.js";
import "../../components/text/text.js";
import "../../components/button/button.js";
import "../../components/icon/icon.js";

import { LitElement, css, html } from "lit";

export class EmsEmployeeCard extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
    }

    .employee-card-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-medium);
      min-height: 15rem;
    }

    .employee-field {
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }

    @media (max-width: 768px) {
      .employee-card-content {
        grid-template-columns: 1fr;
      }
    }
  `;

  _handleEdit() {
    this.dispatchEvent(
      new CustomEvent("edit", {
        detail: { employee: this.employee },
      }),
    );
  }

  _handleDelete() {
    this.dispatchEvent(
      new CustomEvent("delete", {
        detail: { employee: this.employee },
      }),
    );
  }

  render() {
    if (!this.employee) return html``;

    return html`
      <ems-card>
        <div class="employee-card-content">
          <div class="employee-field">
            <ems-text variant="caption" disabled>First Name</ems-text>
            <ems-text variant="body" color="black">${this.employee.firstName}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Last Name</ems-text>
            <ems-text variant="body" color="black">${this.employee.lastName}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Date of Employment</ems-text>
            <ems-text variant="body" color="black">${this.employee.dateOfEmployment}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Date of Birth</ems-text>
            <ems-text variant="body" color="black">${this.employee.dateOfBirth}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Phone</ems-text>
            <ems-text variant="body" color="black">${this.employee.phone}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Email</ems-text>
            <ems-text variant="body" color="black">${this.employee.email}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Department</ems-text>
            <ems-text variant="body" color="black">${this.employee.department}</ems-text>
          </div>

          <div class="employee-field">
            <ems-text variant="caption" disabled>Position</ems-text>
            <ems-text variant="body" color="black">${this.employee.position}</ems-text>
          </div>
        </div>

        <ems-button slot="footer" variant="filled" color="secondary" @click=${this._handleEdit}>
          <ems-icon slot="icon" name="edit-record" size="small" color="white"></ems-icon>
          <ems-text variant="body" color="white">Edit</ems-text>
        </ems-button>

        <ems-button slot="footer" variant="filled" color="tertiary" @click=${this._handleDelete}>
          <ems-icon slot="icon" name="delete-record" size="small" color="white"></ems-icon>
          <ems-text variant="body" color="white">Delete</ems-text>
        </ems-button>
      </ems-card>
    `;
  }
}

customElements.define("ems-employee-card", EmsEmployeeCard);
