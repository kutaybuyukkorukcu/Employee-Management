import "./components/input/index.js";
import "./components/icon/index.js";
import "./components/button/index.js";
import "./components/header/index.js";
import "./components/text/index.js";
import "./components/select/index.js";
import "./components/dialog/index.js";
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
            <h3>Form Components</h3>
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
            <ems-icon name="add-record" color="primary" size="small"></ems-icon>
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
