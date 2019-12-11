import { TestWindow } from '@stencil/core/testing';
import { MsWork } from './ms-work';

describe('ms-work', () => {
  it('should build', () => {
    expect(new MsWork()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsWorkElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsWork],
        html: '<ms-work></ms-work>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
