import { TestWindow } from '@stencil/core/testing';
import { MsCookieNotice } from './ms-cookie-notice';

describe('ms-cookie-notice', () => {
  it('should build', () => {
    expect(new MsCookieNotice()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsCookieNoticeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsCookieNotice],
        html: '<ms-cookie-notice></ms-cookie-notice>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
