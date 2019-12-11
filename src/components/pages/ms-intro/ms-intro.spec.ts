import { TestWindow } from '@stencil/core/testing';
import { MsIntro } from './ms-intro';

describe('ms-intro', () => {
  it('should build', () => {
    expect(new MsIntro()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsIntroElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsIntro],
        html: '<ms-intro></ms-intro>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
