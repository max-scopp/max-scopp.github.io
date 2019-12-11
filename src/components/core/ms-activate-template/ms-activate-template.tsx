import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';


@Component({
  tag: 'ms-activate',
  styleUrl: 'ms-activate-template.css'
})
export class MsActivateTemplate {

  @Prop()
  template: string;

  @Prop() history: RouterHistory;

  componentDidLoad() {
    // monkey patching...
    (document.querySelector('ms-back') as any).history = this.history;
  }

  componentWillLoad() {
    if (!this.template) {
      throw new Error('Unable to active template with unknown name!');
    }

    const primaryRenderTarget = document.querySelector('ms-render-target');
    if (primaryRenderTarget) {
      // TODO: Possibly get all props rather than explicitly?
      primaryRenderTarget.setActiveTemplate(this.template, {
        history: this.history
      })
    }
  }
}
