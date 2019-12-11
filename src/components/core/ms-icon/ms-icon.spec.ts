import { TestWindow } from '@stencil/core/testing';
import { MsIcon } from './ms-icon';

describe('ms-icon', () => {
  it('should build', () => {
    expect(new MsIcon()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsIconElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsIcon],
        html: '<ms-icon></ms-icon>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
