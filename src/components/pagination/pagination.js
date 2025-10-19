import "../button";
import "../text";

import { LitElement, css, html } from "lit";

import { classMap } from "lit/directives/class-map.js";

export class EmsPagination extends LitElement {
  static properties = {
    currentPage: { type: Number, attribute: "current-page" },
    totalPages: { type: Number, attribute: "total-pages" },
    siblingCount: { type: Number, attribute: "sibling-count" },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-small);
    }

    .pagination-item {
      min-width: 2rem;
      height: 2rem;
    }

    .pagination-item.active {
      background: var(--color-primary);
      color: var(--color-white);
      border-radius: var(--radius-max);
    }
  `;

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.siblingCount = 1;
  }

  _getPageRange() {
    const totalPageNumbers = this.siblingCount * 2 + 5;

    if (totalPageNumbers >= this.totalPages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < this.totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = 3 + 2 * this.siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "ellipsis", this.totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = 3 + 2 * this.siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => this.totalPages - rightItemCount + i + 1);
      return [1, "ellipsis", ...rightRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [1, "ellipsis", ...middleRange, "ellipsis", this.totalPages];
    }

    return [];
  }

  _handlePageChange(newPage) {
    if (newPage === this.currentPage || newPage < 1 || newPage > this.totalPages) {
      return;
    }

    const previousPage = this.currentPage;
    this.currentPage = newPage;

    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page: newPage, previousPage },
      }),
    );
  }

  _renderPageButton(page, active = false) {
    const ellipsis = typeof page === "string" && page === "ellipsis";

    if (ellipsis) {
      return html`
        <ems-button class="pagination-item" variant="text" color="inherit" disabled>
          <ems-text variant="body" color="inherit">...</ems-text>
        </ems-button>
      `;
    }

    return html`
      <ems-button
        class=${classMap({
          "pagination-item": true,
          active: active,
        })}
        variant="text"
        color="black"
        @click=${() => this._handlePageChange(page)}
      >
        <ems-text variant="body" color="inherit" ?weight=${active}> ${page} </ems-text>
      </ems-button>
    `;
  }

  _renderNavButton(type) {
    const configs = {
      prev: {
        page: this.currentPage - 1,
        disabled: this.currentPage === 1,
      },
      next: {
        page: this.currentPage + 1,
        disabled: this.currentPage === this.totalPages,
      },
    };

    const config = configs[type];

    return html`
      <ems-button
        class="pagination-item"
        variant="text"
        color="inherit"
        ?disabled=${config.disabled}
        @click=${() => this._handlePageChange(config.page)}
      >
        <ems-icon name=${type === "prev" ? "chevron-left" : "chevron-right"} size="medium" color="primary"></ems-icon>
      </ems-button>
    `;
  }

  render() {
    if (this.totalPages <= 1) {
      return html``;
    }

    const pageRange = this._getPageRange();

    return html`
      <nav class="pagination" role="navigation">
        ${this._renderNavButton("prev")}
        ${pageRange.map((page) => this._renderPageButton(page, page === this.currentPage))}
        ${this._renderNavButton("next")}
      </nav>
    `;
  }
}

customElements.define("ems-pagination", EmsPagination);
