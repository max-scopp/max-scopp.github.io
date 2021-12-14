import h from "hyperscript";

export const parentClass = "dev-stack";

export function render() {
  return [
    <h2>
      <span>Power </span>
      <span>of </span>
      <span>the </span>
      <span>Web.</span>
      </h2>,
    <h3>Simple website, web-app, hybrid app and beyond.</h3>,
    <section>
      <p>
      I'm very specialized in everything to do with JavaScript, but that wasn't always the case.
      Below is a small collection of other languages and frameworks I have worked with
      or would work with again - if it makes sense for the project scope.
      </p>

      <ul className="list-yes-yes">
        <li>
          JavaScript/TypeScript <span>React, Angular, Vue</span>
        </li>
        <li>
          Ruby <span>Ruby on Rails</span>
        </li>
        <li>
          Python <span>Django</span>
        </li>
        <li>
          PHP <span>Typo3, Wordpress, Symfony</span>
        </li>
        <li>
          C# <span>.NET Core, Xamarin</span>
        </li>
        <li>
          C++ <span>Arduino, Marlin</span>
        </li>
      </ul>
    </section>,
    <section>
      <p>
      Over the years I have tried many different languages and frameworks.
      But there were also things that didn't add much value to most of my projects.
      Below are things I would rather <b>not</b> work with again.
      </p>

      <ul className="list-no-go">
        <li>Java <span>anything Java related</span></li>
        <li>
          PHP <span>Magento, Drupal, Laravel, Joomla</span>
        </li>
        <li>CoffeeScript</li>
        <li>Visual Basic</li>
        <li>SQL</li>
        <li>Go</li>
        <li>Dart</li>
      </ul>
    </section>,
  ];
}
