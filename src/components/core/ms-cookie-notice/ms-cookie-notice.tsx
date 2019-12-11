import { Component, h } from '@stencil/core';


@Component({
  tag: 'cookie-notice',
  styleUrl: 'ms-cookie-notice.scss'
})
export class MsCookieNotice {
  render() {
    return (
      <span>If you continue to visit this website, you agree to the use of cookies. If you do not agree, don't come back.</span>
    );
  }
}
