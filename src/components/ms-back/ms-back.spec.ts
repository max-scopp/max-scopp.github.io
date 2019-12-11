import { TestWindow } from '@stencil/core/testing';
import { MsBack } from './ms-back';

describe('ms-back', () => {
  it('should build', () => {
    expect(new MsBack()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsBackElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsBack],
        html: '<ms-back></ms-back>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
