import { LitElement, css, html } from "lit";

export class EmsCard extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      display: block;
      background-color: var(--color-white);
      box-shadow: var(--shadow-small);
      padding: var(--spacing-medium);
    }

    .card-footer {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-medium);
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      margin-top: var(--spacing-large);
    }
  `;

  render() {
    return html`
      <div class="card-content">
        <slot></slot>
      </div>
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
}

customElements.define("ems-card", EmsCard);
