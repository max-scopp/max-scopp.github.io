import { Component, h } from '@stencil/core';


@Component({
  tag: 'ms-post-content',
  styleUrl: 'ms-post-content.css'
})
export class MsPostContent {

  componentDidLoad() {
    debugger
  }

  render() {
    return (
      <div>
        <p>Hello MsPostContent!</p>
      </div>
    );
  }
}
