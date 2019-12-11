import { TestWindow } from '@stencil/core/testing';
import { MsBackground } from './ms-background';

describe('ms-background', () => {
  it('should build', () => {
    expect(new MsBackground()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsBackgroundElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsBackground],
        html: '<ms-background></ms-background>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
