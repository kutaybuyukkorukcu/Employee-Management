import "../button/index.js";
import "../icon/index.js";
import "../text/index.js";

import { LitElement, css, html } from "lit";
import { I18nController } from "../../controllers/i18n-controller.js";
import { useAppStore } from "../../store/store.js";

const LANGUAGE_CODE = {
  TR: "tr",
  EN: "en",
};

// TODO: I should carry this over to patterns because it's domain specific. I can create a simple skeleton for header to keep under components later on.
export class EmsHeader extends LitElement {
  static properties = {
    title: { type: String },
    currentLanguage: { type: String, state: true },
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
  `;

  constructor() {
    super();
    this.title = "ING";
    this.currentLanguage = useAppStore.getState().language || LANGUAGE_CODE.TR;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribe = useAppStore.subscribe((state) => {
      this.currentLanguage = state.language;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe?.();
  }

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
        <ems-button type="menu" variant="text" color="primary">
          <ems-icon slot="icon" name="employee-badge" size="medium"></ems-icon>
          <ems-text variant="body" color="primary">Employees</ems-text>
        </ems-button>
        <ems-button type="menu" variant="text" color="secondary">
          <ems-icon slot="icon" name="add-record" size="medium" color="primary"></ems-icon>
          <ems-text variant="body" color="primary">Add new</ems-text>
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
