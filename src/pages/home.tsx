import h from 'hyperscript';

export const parentClass = "home";

export function render() {
  return [
    <h2>
<span>I'm </span>
<span>a </span>
<span>web </span>
<span>developer </span>
<span>working  </span>
<span>to </span>
<span>create  </span>
<span>great  </span>
<span>user </span>
<span>experiences. </span>
    </h2>,
    <h3>Based in Bremen, Germany</h3>,
    <ul className="tag-bubble">
      <li>TypeScript</li>
      <li>React</li>
      <li>Angular</li>
      <li>Stencil</li>
      <li>Electron</li>
      <li>PWA</li>
    </ul>
  ];
};

// export function renderFooter() {
//   return <a onClick={() => go("/stack")}>Technologies I use</a>
// };
