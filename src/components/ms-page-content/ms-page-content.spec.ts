import { TestWindow } from '@stencil/core/testing';
import { MsPageContent } from './ms-page-content';

describe('ms-page-content', () => {
  it('should build', () => {
    expect(new MsPageContent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsPageContentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsPageContent],
        html: '<ms-page-content></ms-page-content>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
