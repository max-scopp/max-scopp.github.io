import { Component, h } from '@stencil/core';


@Component({
  tag: 'ms-page-content',
  styleUrl: 'ms-page-content.css'
})
export class MsPageContent {

  componentDidLoad() {
    debugger
  }

  render() {
    return (
      <div>
        <p>Hello MsPageContent!</p>
      </div>
    );
  }
}
