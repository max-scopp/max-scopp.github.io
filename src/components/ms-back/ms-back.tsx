import { Component, Element, h } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'ms-back',
  styleUrl: 'ms-back.scss'
})
export class MsBack {

  @Element()
  public host: HTMLElement;

  componentDidLoad() {
    this.host.addEventListener('click', () => {
      ((this.host as any).history as RouterHistory).push('/')
    });

    const root = document.querySelector('app-root');
    root.appendChild(this.host);
  }

  render() {
    return (
      <ms-icon name="back"></ms-icon>
    );
  }
}
