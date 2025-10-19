import { LitElement, css, html } from "lit";

export class EmsDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
  };

  constructor() {
    super();
    this.open = false;
    this.title = "";
  }

  static styles = css`
    :host {
      display: contents;
    }

    dialog {
      outline: none;
      border: none;
      border-radius: var(--radius-small);
      box-shadow: var(--shadow-medium);
      min-width: 25rem;
      max-width: 30rem;
      padding: var(--spacing-medium);
    }

    dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .dialog-container {
      display: flex;
      flex-direction: column;
      gap: var(--gap-large);
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-border);
    }

    .dialog-content {
      flex: 1;
      overflow-y: auto;
    }

    .dialog-footer {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
      justify-content: flex-end;
      align-items: center;
      margin-top: var(--spacing-medium);
    }

    .dialog-footer:empty {
      display: none;
    }

    slot[name="footer"]::slotted(*) {
      width: 100%;
    }
  `;

  show() {
    const dialog = this.shadowRoot.querySelector("dialog");
    if (dialog && !dialog.open) {
      dialog.showModal();
      this.open = true;
      this.dispatchEvent(new CustomEvent("dialog-open"));
    }
  }

  close() {
    const dialog = this.shadowRoot.querySelector("dialog");
    if (dialog && dialog.open) {
      dialog.close();
      this.open = false;
      this.dispatchEvent(new CustomEvent("dialog-close"));
    }
  }

  _handleClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("dialog-close", {}));
  }

  updated(changedProperties) {
    if (changedProperties.has("open")) {
      const dialog = this.shadowRoot.querySelector("dialog");
      if (this.open && dialog && !dialog.open) {
        this.show();
      } else if (!this.open && dialog && dialog.open) {
        this.close();
      }
    }
  }

  render() {
    return html`
      <dialog @close=${this._handleClose}>
        <div class="dialog-container">
          <div class="dialog-header">
            <ems-text variant="subtitle">${this.title}</ems-text>
            <ems-button type="menu" variant="text" @click=${this.close}>
              <ems-icon slot="icon" name="close" size="medium"></ems-icon>
            </ems-button>
          </div>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

customElements.define("ems-dialog", EmsDialog);
