import "../button";
import "../icon";
import "../text";

import { LitElement, css, html } from "lit";

import { I18nController } from "../../controllers";
import { Router } from "@vaadin/router";
import { useAppStore } from "../../store";

const LANGUAGE_CODE = {
  TR: "tr",
  EN: "en",
};

// TODO: I should carry this over to patterns because it's domain specific. I can create a simple skeleton for header to keep under components later on.
export class EmsHeader extends LitElement {
  static properties = {
    title: { type: String },
    currentLanguage: { type: String, state: true },
    currentPath: { type: String, state: true },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-x-small) var(--spacing-medium);
      background-color: var(--color-background-primary);
    }

    img {
      width: 1.5rem;
    }

    .ems-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-medium);
    }

    .menu-items {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-small);
    }

    .route-menu[active] {
      opacity: 1;
    }

    .route-menu:not([active]) {
      opacity: 0.5;
    }
  `;

  constructor() {
    super();
    this.title = "ING";
    this.currentLanguage = useAppStore.getState().language || LANGUAGE_CODE.TR;
    this.currentPath = window.location.pathname;
    this.i18n = new I18nController(this);
  }

  _navigateTo(path) {
    Router.go(path);
  }

  connectedCallback() {
    super.connectedCallback();
    this.currentPath = window.location.pathname;
    window.addEventListener("popstate", this._onRouteChange);
    this._unsubscribe = useAppStore.subscribe((state) => {
      this.currentLanguage = state.language;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onRouteChange);
    this._unsubscribe?.();
  }

  _onRouteChange = () => {
    this.currentPath = window.location.pathname;
    this.requestUpdate();
  };

  async _handleLanguageToggle() {
    const newLanguage = this.currentLanguage === LANGUAGE_CODE.TR ? LANGUAGE_CODE.EN : LANGUAGE_CODE.TR;
    await I18nController.changeLanguage(newLanguage);
    useAppStore.getState().setLanguage(newLanguage);
  }

  render() {
    return html`
      <div class="ems-details">
        <img src="/public/logo.webp" alt="EMS Logo" />
        <ems-text variant="body" color="black">${this.title}</ems-text>
      </div>
      <div class="menu-items">
        <ems-button
          type="menu"
          variant="text"
          color="primary"
          class="route-menu"
          ?active=${this.currentPath === "/"}
          @click=${() => this._navigateTo("/")}
        >
          <ems-icon slot="icon" name="employee-badge" size="medium"></ems-icon>
          <ems-text variant="body" color="primary">${this.i18n.t("header.employees")}</ems-text>
        </ems-button>
        <ems-button
          type="menu"
          variant="text"
          color="secondary"
          class="route-menu"
          ?active=${this.currentPath === "/employee/add"}
          @click=${() => this._navigateTo("/employee/add")}
        >
          <ems-icon slot="icon" name="add-record" size="medium" color="primary"></ems-icon>
          <ems-text variant="body" color="primary">${this.i18n.t("header.addNew")}</ems-text>
        </ems-button>
        <ems-button type="menu" variant="text" color="primary" @click=${this._handleLanguageToggle}>
          ${this.currentLanguage === LANGUAGE_CODE.TR
            ? html`<ems-icon slot="icon" name="turkey-flag" size="medium"></ems-icon>`
            : html`<ems-icon slot="icon" name="usa-flag" size="medium"></ems-icon>`}
        </ems-button>
      </div>
    `;
  }
}

customElements.define("ems-header", EmsHeader);
