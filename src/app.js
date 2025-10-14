import "./components/input/index.js";
import "./components/icon/index.js";
import "./components/button/index.js";
import "./components/header/index.js";

import { LitElement, css, html } from "lit";

export class EmsApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <ems-header></ems-header>
      <ems-input label="First Name"></ems-input>
      <ems-icon name="add-record" color="primary" size="small"></ems-icon>
      <ems-button label="Save" type="submit" color="primary"></ems-button>
      <ems-button label="Cancel" type="submit" variant="outlined"></ems-button>
    `;
  }
}

customElements.define("ems-app", EmsApp);
