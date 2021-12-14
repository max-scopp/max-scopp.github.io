import h from "hyperscript";

export const parentClass = "home";

export function render() {
  return [
    <h2><span>Legal</span></h2>,
    <p>
      This is a personal website and does not require an imprint. The website
      does not store any kind of data and therefor does also not track you.
    </p>,
    <p>
      Icons used on this site are from{" "}
      <a href="https://iconmonstr.com/" target="_blank">
        iconmonstr.com
      </a>
    </p>,
    <p>
      Site is frameworkless and bundled with{" "}
      <a href="https://parceljs.org/" target="_blank">
        parcel.js
      </a> You can check out the source{" "}
      <a
        href="https://github.com/max-scopp/max-scopp.github.io"
        target="_blank"
      >
        here
      </a>
    </p>,
  ];
}
