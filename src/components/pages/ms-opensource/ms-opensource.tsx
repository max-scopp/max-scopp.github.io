import { Component, h } from '@stencil/core';


@Component({
  tag: 'ms-opensource',
  styleUrl: 'ms-opensource.css'
})
export class MsOpensource {



  render() {
    return (
      <article>
        <h2>Contributions</h2>
        <p>I currently mostly contribute to Ionic's toolchain <a target="_blank" href="https://stenciljs.com/">Stencil</a>. <br />Publishing and refining core-components that beatuifully scale across React, Angular and any other Framework.</p>
        <p>I also have been contributing to Marius Tennøe's (employee at Microsoft) open-source project, <a target="_blank" href="https://github.com/mtennoe/swagger-typescript-codegen"><code>swagger-typescript-codegen</code></a>.</p>
        <p>Before <a target="_blank" href="https://webpack.js.org/">webpack</a> indirectly became the norm, I've contributed a lot to <a href="https://brunch.io/" target="_blank">Brunch</a>, solving the never ending hell of project configuration.</p>
        <section>
          <p>Below is a collection of various open-source Project's that I have been contributing.</p>
          <p>If you're interested in more, you can visit my <a href="https://github.com/max-scopp">GitHub Profile</a>, or see what <a href="https://codepen.io/max-scopp">CodePen</a>'s I create.</p>
          <ul>
            <li>
              <a href='https://github.com/mtennoe/swagger-typescript-codegen/issues/85' target='_blank'>Custom Swagger-CodeGen for TypeScript</a>
            </li>
            <li>
              <a href='https://github.com/alesgenova/split-me' target='_blank'>split-me</a>
            </li>
            <li>
              <a href='https://github.com/max-scopp/svg-fonts-brunch' target='_blank'>svg-fonts-brunch</a>
            </li>
          </ul>
        </section>
      </article>
    );
  }
}
