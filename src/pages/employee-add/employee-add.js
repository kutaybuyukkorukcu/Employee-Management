import { LitElement, css, html } from "lit";

export class EmsEmployeeAdd extends LitElement {
  static styles = css`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      height: 100%;
    }
  `;

  render() {
    return html`
      <ems-layout>
        <ems-header slot="header"></ems-header>
        <div class="page-container">
          <ems-text variant="title" color="primary">Add Employee</ems-text>
          <ems-employee-form></ems-employee-form>
        </div>
      </ems-layout>
    `;
  }
}

customElements.define("ems-employee-add-page", EmsEmployeeAdd);
