import { TestWindow } from '@stencil/core/testing';
import { MsRenderTarget } from './ms-render-target';

describe('ms-render-target', () => {
  it('should build', () => {
    expect(new MsRenderTarget()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsRenderTargetElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsRenderTarget],
        html: '<ms-render-target></ms-render-target>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
