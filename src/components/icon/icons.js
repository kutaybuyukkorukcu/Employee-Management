import { html } from "lit";

export const icons = {
  "add-record": html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12H20M12 4V20"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  "edit-record": html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
        fill="currentColor"
      />
    </svg>
  `,
  "delete-record": html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"
        fill="currentColor"
      />
      <path
        d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"
        fill="currentColor"
      />
    </svg>
  `,
  "employee-badge": html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.5 19.5L20 21M11 14C7.13401 14 4 17.134 4 21H11M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  "chevron-left": html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  "chevron-right": html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  "turkey-flag": html`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 -30000 90000 60000">
      <title>Flag of Turkey</title>
      <path fill="#e30a17" d="m0-30000h90000v60000H0z" />
      <path
        fill="#fff"
        d="m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z"
      />
    </svg>
  `,
  "usa-flag": html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24"
      height="16"
      viewBox="0 0 7410 3900"
    >
      <path d="M0,0h7410v3900H0" fill="#b31942" />
      <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#FFF" stroke-width="300" />
      <path d="M0,0h2964v2100H0" fill="#0a3161" />
      <g fill="#FFF">
        <g id="s18">
          <g id="s9">
            <g id="s5">
              <g id="s4">
                <path
                  id="s"
                  d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"
                />
                <use xlink:href="#s" y="420" />
                <use xlink:href="#s" y="840" />
                <use xlink:href="#s" y="1260" />
              </g>
              <use xlink:href="#s" y="1680" />
            </g>
            <use xlink:href="#s4" x="247" y="210" />
          </g>
          <use xlink:href="#s9" x="494" />
        </g>
        <use xlink:href="#s18" x="988" />
        <use xlink:href="#s9" x="1976" />
        <use xlink:href="#s5" x="2470" />
      </g>
    </svg>
  `,
  calendar: html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  `,
  table: html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 6H21M3 12H21M3 18H21M8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  grid: html`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM14 14H21V21H14V14ZM3 14H10V21H3V14Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
};
