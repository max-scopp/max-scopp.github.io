import { Component, Element, State, Method } from '@stencil/core';


@Component({
  tag: 'ms-render-target',
  styleUrl: 'ms-render-target.css'
})
export class MsRenderTarget {

  @Element() host: HTMLElement;

  @State()
  activeTemplate: string = null;
  propsForTemplate: any;

  previousTemplate;

  @Method()
  async setActiveTemplate(templateName: string, additionalProps?: { [key: string]: any }) {
    this.resetPreviousTemplate();

    this.activeTemplate = templateName;
    this.propsForTemplate = additionalProps || null;
  }

  get templateNode() {
    return document.querySelector(`template#${this.activeTemplate}`) as HTMLTemplateElement;
  }

  get resolvedTemplate() {
    if (this.activeTemplate) {
      const templateNode: HTMLTemplateElement = this.templateNode;

      if (templateNode) {
        return templateNode.firstChild;
      }
    }

    return null;
  }

  resetPreviousTemplate() {
    if (this.previousTemplate && this.activeTemplate) {
      this.templateNode.append(this.previousTemplate);
      this.previousTemplate = null;
    }
  }

  componentDidUpdate() {
    const component = this.resolvedTemplate;

    if (component) {
      this.host.append(component);
      Object.assign(component, this.propsForTemplate);
      this.previousTemplate = component;
    }
  }
}
