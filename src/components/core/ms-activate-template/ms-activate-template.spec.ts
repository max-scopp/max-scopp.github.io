import { TestWindow } from '@stencil/core/testing';
import { MsActivateTemplate } from './ms-activate-template';

describe('ms-activate-template', () => {
  it('should build', () => {
    expect(new MsActivateTemplate()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMsActivateTemplateElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MsActivateTemplate],
        html: '<ms-activate-template></ms-activate-template>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
