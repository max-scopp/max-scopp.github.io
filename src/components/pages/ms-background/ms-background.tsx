import { Component, h } from '@stencil/core';


@Component({
  tag: 'ms-background',
  styleUrl: 'ms-background.css'
})
export class MsBackground {



  render() {
    return (
      <article>
        <h2>Personal Background</h2>
        <p>Growing up with a passion for computers isn't that uncommon nowadays. But unlike most others, I've always been interested in simple and self-explainatory software that <i>just works</i>. Starting with <a rel="noreferrer" href="https://de.wikipedia.org/wiki/Microsoft_Windows_Vista" target="_blank" data-tip="Windows Vista™ was released 30th January, 2007">Windows Vista</a>, I've been exploring what make's a fast, visually pleasing and efficient software.</p>
        <p>Continuing with this target in mind, I've been exploring techniques in various languages and frameworks:</p>
        <h3>Professional Experiences</h3>
        <h4>Languages</h4>
        <p>Languages are ordered by timeline.</p>
        <ul>
          <li>VB.NET</li>
          <li>Partially C# due to Microsoft's Ribbon concept</li>
          <li>Ruby</li>
          <li>Python</li>
          <li>PHP</li>
          <li>Java</li>
          <li>ActionScript</li>
          <li>CoffeeScript (transpiles to JavaScript)</li>
          <li>EcmaScript (formerly known as JavaScript)</li>
          <li>Node.js (formerly known as JS-as-Backend)</li>
          <li>TypeScript</li>
        </ul>
        <h3>Frameworks, Libraries and other software experiences</h3>
        <p>Mentioned Tools are ordered by timeline.</p>
        <ul>
          <li>&dot;NET Framework (and it's Ribbon libraries)</li>
          <li>Ruby on Rails</li>
          <li>Django</li>
          <li>WordPress</li>
          <li>Drupal</li>
          <li>Laravel</li>
          <li>Symfony</li>
          <li>Joomla</li>
          <li>Typo3</li>
          <li>Magento</li>
        </ul>
      </article>
    );
  }
}
