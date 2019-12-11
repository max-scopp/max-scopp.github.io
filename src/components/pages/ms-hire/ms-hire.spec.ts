import { TestWindow } from '@stencil/core/testing';
import { MsHire } from './ms-hire';

describe('ms-hire', () => {
  it('should build', () => {
    expect(new MsHire()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsHireElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsHire],
        html: '<ms-hire></ms-hire>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
