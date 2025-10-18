import { i18next } from "../i18n/setup.js";

export class I18nController {
  static instances = new Set();

  constructor(host) {
    this.host = host;
    host.addController(this);
    I18nController.instances.add(this);

    this._onLanguageChanged = () => {
      this.host.requestUpdate();
    };
    i18next.on("languageChanged", this._onLanguageChanged);
  }

  hostDisconnected() {
    I18nController.instances.delete(this);
    i18next.off("languageChanged", this._onLanguageChanged);
  }

  t(key, options) {
    return i18next.t(key, options);
  }

  static async changeLanguage(lng) {
    await i18next.changeLanguage(lng);
  }
}
