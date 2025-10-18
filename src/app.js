import "./components/input/index.js";
import "./components/icon/index.js";
import "./components/button/index.js";
import "./components/header/index.js";
import "./components/text/index.js";
import "./components/select/index.js";
import "./components/dialog/index.js";
import "./components/pagination/index.js";
import "./components/card/index.js";
import "./patterns/layout/index.js";
import "./patterns/employee-card/index.js";
import "./pages/employees/index.js";

import { LitElement, css, html } from "lit";

export class EmsApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html` <ems-employees-page></ems-employees-page> `;
  }
}

customElements.define("ems-app", EmsApp);
