/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  MatchResults,
  RouterHistory,
} from '@stencil/router';

export namespace Components {
  interface AppHome {}
  interface AppProfile {
    'match': MatchResults;
  }
  interface AppRoot {}
  interface CookieNotice {}
  interface MsActivate {
    'history': RouterHistory;
    'template': string;
  }
  interface MsBack {}
  interface MsBackground {}
  interface MsHire {}
  interface MsIcon {
    'fill'?: string;
    'height'?: number | string;
    'name': string;
    'stroke'?: string;
    'width'?: number | string;
  }
  interface MsIntro {
    'history': RouterHistory;
  }
  interface MsOpensource {}
  interface MsRenderTarget {
    'setActiveTemplate': (templateName: string, additionalProps?: { [key: string]: any; }) => Promise<void>;
  }
  interface MsWork {}
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {}
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCookieNoticeElement extends Components.CookieNotice, HTMLStencilElement {}
  var HTMLCookieNoticeElement: {
    prototype: HTMLCookieNoticeElement;
    new (): HTMLCookieNoticeElement;
  };

  interface HTMLMsActivateElement extends Components.MsActivate, HTMLStencilElement {}
  var HTMLMsActivateElement: {
    prototype: HTMLMsActivateElement;
    new (): HTMLMsActivateElement;
  };

  interface HTMLMsBackElement extends Components.MsBack, HTMLStencilElement {}
  var HTMLMsBackElement: {
    prototype: HTMLMsBackElement;
    new (): HTMLMsBackElement;
  };

  interface HTMLMsBackgroundElement extends Components.MsBackground, HTMLStencilElement {}
  var HTMLMsBackgroundElement: {
    prototype: HTMLMsBackgroundElement;
    new (): HTMLMsBackgroundElement;
  };

  interface HTMLMsHireElement extends Components.MsHire, HTMLStencilElement {}
  var HTMLMsHireElement: {
    prototype: HTMLMsHireElement;
    new (): HTMLMsHireElement;
  };

  interface HTMLMsIconElement extends Components.MsIcon, HTMLStencilElement {}
  var HTMLMsIconElement: {
    prototype: HTMLMsIconElement;
    new (): HTMLMsIconElement;
  };

  interface HTMLMsIntroElement extends Components.MsIntro, HTMLStencilElement {}
  var HTMLMsIntroElement: {
    prototype: HTMLMsIntroElement;
    new (): HTMLMsIntroElement;
  };

  interface HTMLMsOpensourceElement extends Components.MsOpensource, HTMLStencilElement {}
  var HTMLMsOpensourceElement: {
    prototype: HTMLMsOpensourceElement;
    new (): HTMLMsOpensourceElement;
  };

  interface HTMLMsRenderTargetElement extends Components.MsRenderTarget, HTMLStencilElement {}
  var HTMLMsRenderTargetElement: {
    prototype: HTMLMsRenderTargetElement;
    new (): HTMLMsRenderTargetElement;
  };

  interface HTMLMsWorkElement extends Components.MsWork, HTMLStencilElement {}
  var HTMLMsWorkElement: {
    prototype: HTMLMsWorkElement;
    new (): HTMLMsWorkElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'cookie-notice': HTMLCookieNoticeElement;
    'ms-activate': HTMLMsActivateElement;
    'ms-back': HTMLMsBackElement;
    'ms-background': HTMLMsBackgroundElement;
    'ms-hire': HTMLMsHireElement;
    'ms-icon': HTMLMsIconElement;
    'ms-intro': HTMLMsIntroElement;
    'ms-opensource': HTMLMsOpensourceElement;
    'ms-render-target': HTMLMsRenderTargetElement;
    'ms-work': HTMLMsWorkElement;
  }
}

declare namespace LocalJSX {
  interface AppHome {}
  interface AppProfile {
    'match'?: MatchResults;
  }
  interface AppRoot {}
  interface CookieNotice {}
  interface MsActivate {
    'history'?: RouterHistory;
    'template'?: string;
  }
  interface MsBack {}
  interface MsBackground {}
  interface MsHire {}
  interface MsIcon {
    'fill'?: string;
    'height'?: number | string;
    'name'?: string;
    'stroke'?: string;
    'width'?: number | string;
  }
  interface MsIntro {
    'history'?: RouterHistory;
  }
  interface MsOpensource {}
  interface MsRenderTarget {}
  interface MsWork {}

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-profile': AppProfile;
    'app-root': AppRoot;
    'cookie-notice': CookieNotice;
    'ms-activate': MsActivate;
    'ms-back': MsBack;
    'ms-background': MsBackground;
    'ms-hire': MsHire;
    'ms-icon': MsIcon;
    'ms-intro': MsIntro;
    'ms-opensource': MsOpensource;
    'ms-render-target': MsRenderTarget;
    'ms-work': MsWork;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
      'app-profile': LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'cookie-notice': LocalJSX.CookieNotice & JSXBase.HTMLAttributes<HTMLCookieNoticeElement>;
      'ms-activate': LocalJSX.MsActivate & JSXBase.HTMLAttributes<HTMLMsActivateElement>;
      'ms-back': LocalJSX.MsBack & JSXBase.HTMLAttributes<HTMLMsBackElement>;
      'ms-background': LocalJSX.MsBackground & JSXBase.HTMLAttributes<HTMLMsBackgroundElement>;
      'ms-hire': LocalJSX.MsHire & JSXBase.HTMLAttributes<HTMLMsHireElement>;
      'ms-icon': LocalJSX.MsIcon & JSXBase.HTMLAttributes<HTMLMsIconElement>;
      'ms-intro': LocalJSX.MsIntro & JSXBase.HTMLAttributes<HTMLMsIntroElement>;
      'ms-opensource': LocalJSX.MsOpensource & JSXBase.HTMLAttributes<HTMLMsOpensourceElement>;
      'ms-render-target': LocalJSX.MsRenderTarget & JSXBase.HTMLAttributes<HTMLMsRenderTargetElement>;
      'ms-work': LocalJSX.MsWork & JSXBase.HTMLAttributes<HTMLMsWorkElement>;
    }
  }
}


