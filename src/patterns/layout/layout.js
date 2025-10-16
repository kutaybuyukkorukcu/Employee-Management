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

    slot:not([name])::slotted(*) {
      flex: 1;
      overflow: auto;
      background-color: var(--color-background-secondary);
    }
  `;

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
    `;
  }
}

customElements.define("ems-layout", EmsLayout);
