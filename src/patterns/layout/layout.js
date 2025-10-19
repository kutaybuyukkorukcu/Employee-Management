import { LitElement, css, html } from "lit";

export class EmsLayout extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 100vh;
    }

    slot[name="header"]::slotted(*) {
      flex-shrink: 0;
    }

    slot[name="footer"]::slotted(*) {
      flex-shrink: 0;
      background-color: var(--color-background-secondary);
      padding: var(--spacing-medium);
    }

    .main {
      flex: 1;
      overflow: auto;
      background-color: var(--color-background-secondary);
      padding: var(--spacing-medium) var(--spacing-large);
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      <slot name="header"></slot>
      <div class="main">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    `;
  }
}

customElements.define("ems-layout", EmsLayout);
