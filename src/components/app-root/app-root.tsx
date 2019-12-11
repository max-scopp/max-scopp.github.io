import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss'
})
export class AppRoot {

  render() {
    return [
      <cookie-notice />,
      <template id="intro">
        <ms-intro />
      </template>,

      <template id="hire">
        <ms-hire />
      </template>,

      <template id="work">
        <ms-work />
      </template>,

      <template id="background">
        <ms-background />
      </template>,

      <template id="open-source">
        <ms-opensource />
      </template>,

      <main>
        <h1>Maximilian Scopp</h1>
        <ms-render-target />
      </main>,

      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <ms-back />
          <stencil-route
            url='/'
            exact={true}
            component='ms-activate'
            componentProps={{ template: 'intro' }}
          />

          <stencil-route
            url='/commercial/work'
            component='ms-activate'
            componentProps={{ template: 'hire' }}
          />

          <stencil-route
            url='/my/work'
            component='ms-activate'
            componentProps={{ template: 'work' }}
          />

          <stencil-route
            url='/about/my/background'
            component='ms-activate'
            componentProps={{ template: 'background' }}
          />

          <stencil-route
            url='/about/my/open-source-projects'
            component='ms-activate'
            componentProps={{ template: 'open-source' }}
          />
        </stencil-route-switch>
      </stencil-router>
    ];
  }
}
