import { Component, Element, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'ms-back',
  styleUrl: 'ms-back.scss'
})
export class MsBack {

  @Element()
  public host: HTMLElement;

  @State()
  public currentPathname: string = null;

  componentWillLoad() {
    this.checkHref();
  }

  componentDidLoad() {
    this.host.addEventListener('click', () => {
      ((this.host as any).history as RouterHistory).push('/')
    });

    const root = document.querySelector('app-root');
    root.appendChild(this.host);
  }

  checkHref = () => {
    const newPathname = location.pathname;

    if (this.currentPathname !== newPathname) {
      this.currentPathname = newPathname;
    }

    requestAnimationFrame(this.checkHref)
  }

  render() {
    this.host.hidden = this.currentPathname === '/';

    return (
      <ms-icon name="back"></ms-icon>
    );
  }
}
