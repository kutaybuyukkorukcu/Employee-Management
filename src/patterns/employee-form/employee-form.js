import { css, html, LitElement } from "lit";

export class EmsEmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-x-large) var(--spacing-xx-large);
      background: #fff;
      padding: var(--spacing-x-large);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      max-width: 100%;
      box-sizing: border-box;
      grid-auto-rows: min-content;
      height: 100%;
    }

    .form-actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      gap: var(--spacing-x-large);

      * {
        max-width: 20rem;
        width: 100%;
      }
    }

    @media (max-width: 1024px) {
      form {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      form {
        grid-template-columns: 1fr;
      }
    }
  `;

  _handleEmployeeSubmit() {
    const formData = new FormData(this.shadowRoot.querySelector("form"));
    const employee = {
      name: formData.get("name"),
      age: formData.get("age"),
    };
    console.log("Submitted Employee Data:", employee);
  }

  render() {
    return html`
      <form @submit=${this._handleEmployeeSubmit}>
        <ems-input label="First Name" name="firstName" type="text" .value=${this.employee?.firstName || ""}></ems-input>
        <ems-input label="Last Name" name="lastName" type="text" .value=${this.employee?.lastName || ""}></ems-input>
        <ems-input
          label="Date of Employment"
          name="dateOfEmployment"
          type="date"
          .value=${this.employee?.dateOfEmployment || ""}
        ></ems-input>
        <ems-input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          .value=${this.employee?.dateOfBirth || ""}
        ></ems-input>
        <ems-input label="Phone" name="phone" type="tel" .value=${this.employee?.phone || ""}></ems-input>
        <ems-input label="Email" name="email" type="email" .value=${this.employee?.email || ""}></ems-input>
        <ems-input
          label="Department"
          name="department"
          type="text"
          .value=${this.employee?.department || ""}
        ></ems-input>
        <ems-select
          label="Position"
          name="position"
          .value=${this.employee?.position || ""}
          .options=${[
            { value: "manager", label: "Manager" },
            { value: "developer", label: "Developer" },
            { value: "designer", label: "Designer" },
          ]}
          placeholder="Select Position"
        ></ems-select>
        <div class="form-actions">
          <ems-button type="submit" color="primary" variant="filled"> Save </ems-button>
          <ems-button type="button" color="secondary" variant="outlined"> Cancel </ems-button>
        </div>
      </form>
    `;
  }
}

customElements.define("ems-employee-form", EmsEmployeeForm);
