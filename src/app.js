import "./components/input/index.js";
import "./components/icon/index.js";
import "./components/button/index.js";
import "./components/header/index.js";
import "./components/text/index.js";
import "./components/select/index.js";
import "./components/dialog/index.js";
import "./components/pagination/index.js";
import "./components/card/index.js";
import "./components/table/index.js";
import "./patterns/layout/index.js";
import "./patterns/employee-card/index.js";
import "./patterns/employee-table/index.js";
import "./pages/employees/index.js";

import { LitElement, css, html } from "lit";
import { Router } from "@vaadin/router";
import { useAppStore } from "./store/store.js";

export class EmsApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._initApp();
  }

  _initApp() {
    this._initRouter();
    // TODO: Will add i18n setup here later
  }

  _initRouter() {
    const outlet = document.getElementById("outlet");
    if (!outlet) {
      console.error("Router outlet not found!");
      return;
    }

    const router = new Router(outlet);
    router.setRoutes([
      {
        path: "/",
        component: "ems-employees-page",
        action: async () => {
          await useAppStore.getState().getEmployees();
        },
      },
    ]);
  }

  render() {
    return html``;
  }
}

customElements.define("ems-app", EmsApp);
