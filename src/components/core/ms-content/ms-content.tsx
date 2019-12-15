import { Component, Prop, h, Element, Watch, State } from '@stencil/core';
import marked from 'meta-marked';

interface Link {
  name: string;
  link: string;
  description?: string;
}

interface MarkdownMeta {
  layout: string;
  title: string;
  preview?: string;
  body?: string;
  links?: Link[];
  date?: Date;

  [k: string]: any;
}

@Component({
  tag: 'ms-content',
  styleUrl: 'ms-content.scss',
  shadow: true
})
export class MsContent {

  @Element()
  host: HTMLElement;

  @Prop()
  file: string;

  @Watch('file')
  async validateFileExistence(newValue) {
    if (newValue) {
      const touch = await fetch(
        this.fileAsUrl,
        {
          method: 'OPTIONS',
          headers: {
            Accept: "text/plain"
          }
        });
      if (touch.status >= 200 && touch.status < 300) {
        return true;
      } else {
        throw new Error('Content could not be found, status: ' + touch.status)
      }
    } else {
      throw new Error('File cannot be empty');
    }
  }

  @State()
  fileContents: string = "";

  @State()
  fileMeta: MarkdownMeta;

  async componentDidLoad() {
    await this.validateFileExistence(this.file);
    await this.loadFileContents();
  }

  get fileAsUrl() {
    return [location.origin, this.file].join('/');
  }

  async loadFileContents() {
    const document = await fetch(this.fileAsUrl);

    if (document.ok) {
      const documentBody = await document.text();

      switch (document.headers.get('content-type')) {
        case 'text/plain': {
          this.fileContents = documentBody;
        }
        case 'text/markdown': {
          const { meta, html: content } = marked(documentBody);
          this.fileContents = content;
          this.fileMeta = meta;
        }
      }
    } else {
      throw new Error('Document response not OK: ' + [document.status, document.statusText])
    }
  }

  render() {
    if (this.fileContents) {
      this.host.shadowRoot.innerHTML = this.fileContents;
      if (this.fileMeta) {
        const { title, layout, ...meta } = this.fileMeta;
        document.head.querySelector('title').text = title;
        this.host.classList.add('layout--' + layout);
        console.log('Unused meta', meta);
      }
    } else {
      return <span>Loading</span>
    }
  }
}
