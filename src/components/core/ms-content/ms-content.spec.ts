import { TestWindow } from '@stencil/core/testing';
import { MsContent } from './ms-content';

describe('ms-content', () => {
  it('should build', () => {
    expect(new MsContent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsContentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsContent],
        html: '<ms-content></ms-content>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
