import h from 'hyperscript';

export const parentClass = "home";

export function render () {
  return [
    <h2>Got something?</h2>,
    <h3>
        <a href="mailto:me@maxscopp.ed">Let's talk about it.</a>
    </h3>,
  ];
};
