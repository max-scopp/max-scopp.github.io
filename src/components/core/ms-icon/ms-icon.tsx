import { Component, Prop, h, Watch } from '@stencil/core';
import IconSet from './icons.json';

export interface IconDefinition {
  viewBox: string;
  d?: string;
}

@Component({
  tag: 'ms-icon',
  styleUrl: 'ms-icon.css'
})
export class MsIcon {

  @Prop()
  public fill?: string = "currentcolor";

  @Prop()
  public width?: number | string = "100%";

  @Prop()
  public height?: number | string;

  @Prop()
  public stroke?: string;

  @Prop()
  public name: string;

  @Watch('name')
  validateName(newValue: string) {
    if (!newValue) {
      throw new Error('@ms-icon:name: Name is required to lookup icon!');
    }
  }

  get hasDefinition() {
    try {
      return !!this.def
    } catch (e) {
      return false;
    }
  }

  get def(): IconDefinition | null {
    if (this.name) {
      return IconSet[this.name] || null;
    }

    throw new Error('Cannot find icon named ' + this.name);
  }

  get isPathed() {
    return !!this.def.d;
  }

  get viewBox() {
    return this.def.viewBox;
  }

  get path() {
    return this.def.d;
  }

  get additionalProps() {
    return {
      width: this.width,
      height: this.height,
    }
  }

  render() {
    if (this.hasDefinition) {
      return (
        <svg viewBox={this.viewBox} {...this.additionalProps}>
          {this.isPathed && <path fill={this.fill} stroke={this.stroke} d={this.path} />}
        </svg>
      );
    }

    return null;
  }
}
