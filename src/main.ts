const animationTime = 120;
const $content = document.getElementById("content");
const $footer = document.getElementById("footer");

interface Page {
  render(): Promise<HTMLElement | HTMLElement[]>;
  parentClass?: string;
  renderFooter?(): Promise<HTMLElement | HTMLElement[]>;
}

async function importPage(key: string): Promise<unknown> {
  switch (key) {
    case "/":
      return import("./pages/home");
    case "/stack":
      return import("./pages/stack");
    case "/about":
      return import("./pages/about");
    case "/contact":
      return import("./pages/contact");
    default:
      return import("./pages/not-found");
  }
}

let _lastPageState;
async function setPageState(state: string) {
  document.documentElement.classList.remove(_lastPageState);
  document.documentElement.classList.add(state);
  _lastPageState = state;
}

async function load(key: string) {
  const page = <Page>await importPage(key);
  const rendered = await page.render();

  $content.innerHTML = "";
  $content.append(...(rendered instanceof Array ? rendered : [rendered]));
  $content.className = page.parentClass || "";

  $footer.innerHTML = "";

  if(page.renderFooter) {
    const footerRendered = await page.renderFooter();

    $footer.append(...(footerRendered instanceof Array ? footerRendered : [footerRendered]));
  }
}

async function go(href: string, force: boolean = false) {
  if (!force && location.pathname === href) {
    return;
  }

  return new Promise((resolve) => {
    setPageState("unloading");

    history.pushState({}, null, href);

    setTimeout(async () => {
      setPageState("loading");

      await load(href);

      setPageState("loaded");

      resolve(href);
    }, animationTime);
  });
}

window.go = go;

go(location.pathname, true);
