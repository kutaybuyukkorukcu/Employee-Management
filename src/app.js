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
    // i18n();
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
          await useAppStore.getState().fetchEmployees();
          await import("./pages/employees/employees");
        },
      },
      {
        path: "/employee/add",
        component: "ems-employee-add-page",
        action: async () => {
          await import("./pages/employee-add/employee-add");
        },
      },
      {
        path: "/employee/edit/:id",
        component: "ems-employee-edit-page",
        action: async (context) => {
          const { id } = context.params;
          await useAppStore.getState().getEmployeeById(id);
          await import("./pages/employee-edit/employee-edit");
        },
      },
    ]);
  }

  render() {
    return html``;
  }
}

customElements.define("ems-app", EmsApp);
