import { Component, h } from '@stencil/core';


@Component({
  tag: 'ms-hire',
  styleUrl: 'ms-hire.css'
})
export class MsHire {



  render() {
    return (
      <article>
        <h2>Hire me!</h2>
        <p>I am available to hire for various activities - regardless of a simple design request, implementing a simple one-page, or re-conception of your front-end infrastructure: don't hesitate to ask.</p>
        <p>Every request is handled individually for your specific use-case.</p>
      </article>
    );
  }
}
