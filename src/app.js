import "./components/input/index.js";
import "./components/icon/index.js";
import "./components/button/index.js";
import "./components/header/index.js";
import "./components/text/index.js";
import "./components/select/index.js";
import "./components/dialog/index.js";
import "./components/pagination/index.js";
import "./patterns/layout/index.js";

import { LitElement, css, html } from "lit";

export class EmsApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <ems-layout>
        <ems-header slot="header"></ems-header>
        <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem;">
          <section>
            <ems-icon name="add-record" color="primary" size="medium"></ems-icon>
            <ems-icon name="edit-record" color="primary" size="medium"></ems-icon>
            <ems-icon name="delete-record" color="primary" size="medium"></ems-icon>
            <ems-icon name="employee-badge" color="primary" size="medium"></ems-icon>
            <ems-icon name="chevron-left" color="primary" size="medium"></ems-icon>
            <ems-icon name="chevron-right" color="primary" size="medium"></ems-icon>
            <ems-icon name="turkey-flag" color="primary" size="medium"></ems-icon>
            <ems-icon name="usa-flag" color="primary" size="medium"></ems-icon>
            <ems-icon name="calendar" color="primary" size="medium"></ems-icon>
            <ems-select
              label="Position"
              name="position"
              placeholder="Select a position"
              required
              .options=${[
                { label: "Manager", value: "manager" },
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
              ]}
            ></ems-select>
            <ems-input label="First Name"></ems-input>
            
            <ems-pagination current-page="5" total-pages="99"></ems-pagination>
          </section>
        </div>

        <ems-dialog title="Are you sure?">
          <ems-text variant="caption">Selected Employee record of Ahmet Sourtimes will be deleted.</ems-text>
            <ems-button slot="footer" label="Save" type="submit" variant="filled" color="primary" maxWidth></ems-button>
            <ems-button slot="footer" label="Cancel" type="submit" variant="outlined" maxWidth></ems-button>
          </div>
        </ems-dialog>
      </ems-layout>
    `;
  }
}

customElements.define("ems-app", EmsApp);
