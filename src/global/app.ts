import config from './client-config';

export default async () => {
  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */

  if (config.emulateToucHover) {
    window.addEventListener('touchstart',
      (event: TouchEvent) =>
        (event.target as HTMLElement).classList.add(config.emulatedToucHoverClassName)
    );

    window.addEventListener('touchend',
      (event: TouchEvent) =>
        (event.target as HTMLElement).classList.remove(config.emulatedToucHoverClassName)
    );
  }
};
