import { TestWindow } from '@stencil/core/testing';
import { MsPostContent } from './ms-post-content';

describe('ms-post-content', () => {
  it('should build', () => {
    expect(new MsPostContent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsPostContentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsPostContent],
        html: '<ms-post-content></ms-post-content>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
