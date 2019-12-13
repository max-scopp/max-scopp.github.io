import { Component, Prop, Element, h } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'ms-intro',
  styleUrl: 'ms-intro.scss'
})
export class MsIntro {

  @Prop({
    mutable: true,
    reflectToAttr: true,
    attr: 'history'
  }) history: RouterHistory;

  @Element()
  host: HTMLElement;

  componentDidLoad() {
    const tagContainer = this.host.querySelector('[data-randomize-tags]');

    tagContainer.childNodes.forEach((tagNode) => {
      const beforeNode = tagContainer.childNodes.item(
        Math.floor((Math.random() * tagContainer.childNodes.length))
      );

      tagContainer.insertBefore(beforeNode, tagNode);
    })
  }

  render() {
    return [
      <h2 class='subhead'>JavaScript Specialist, Designer</h2>,
      <article class='center'>
        <p>A young, passionate individual who loves to support open-source projects. To hire. Simplification over complexity.</p>
        <nav class='actions'>

          <button aria-label="Sub Page" on-click={() => this.history.push("/commercial/work")}>Hire me</button>
          <button aria-label="Sub Page" on-click={() => this.history.push("/about/my/background")}>Background</button>
          <button aria-label="Sub Page" on-click={() => this.history.push("/my/work")}>My Work</button>
          <button aria-label="Sub Page" on-click={() => this.history.push("/about/my/open-source-projects")}>
            <ms-icon name="github" width="1em" />
          </button>
        </nav>
        <ul class='tags' data-randomize-tags>
          <li class='tag util'>Git</li>
          <li class='tag framework'>Stencil</li>
          <li class='tag tech'>JavaScript</li>
          <li class='tag util'>GoAbstract</li>
          <li class='tag framework'>Angular >4</li>
          <li class='tag tech'>EcmaScript</li>
          <li class='tag util'>Sketch</li>
          <li class='tag tech'>Node.js</li>
          <li class='tag util'>VSCode</li>
          <li class='tag tech'>TypeScript</li>
          <li class='tag util'>Slack</li>
          <li class='tag tech'>PWA</li>
          <li class='tag metholigy'>SCSS</li>
          <li class='tag tech'>Flow</li>
          <li class='tag metholigy'>ACSS</li>
          <li class='tag framework'>Electron</li>
          <li class='tag metholigy'>BEM</li>
          <li class='tag framework'>React</li>
          <li class='comment'>
            <span>... and always curious</span>
            <span class='emoji'>🧐</span>
          </li>
        </ul>
      </article>
    ];
  }
}
