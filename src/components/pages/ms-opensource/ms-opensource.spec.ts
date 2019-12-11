import { TestWindow } from '@stencil/core/testing';
import { MsOpensource } from './ms-opensource';

describe('ms-opensource', () => {
  it('should build', () => {
    expect(new MsOpensource()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsOpensourceElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsOpensource],
        html: '<ms-opensource></ms-opensource>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
