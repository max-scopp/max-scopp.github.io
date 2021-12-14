enum PageEvents {
  Loading = "loading",
  Loaded = "loaded",
  unload = "unload",
  FooterLoaded = "footer-loaded",
  Footerunload = "footer-unload",
}

type PageStatus = "loading" | "loaded" | "unload";
type AdditionalStatus = "footer-loaded" | "footer-unload";

interface Page {
  render(): Promise<HTMLElement | HTMLElement[]>;
  parentClass?: string;
  renderFooter?(): Promise<HTMLElement | HTMLElement[]>;
}

const animationTime = 240;
const $content = <HTMLElement>document.getElementById("content");
const $footer = <HTMLElement>document.getElementById("footer");

let page: Page;
let state: { [key: string]: any };

async function importPage(key: string): Promise<unknown> {
  switch (key) {
    case "/":
      return import("./pages/home");
    case "/stack":
      return import("./pages/stack");
    case "/about":
      return import("./pages/about");
    case "/legal":
      return import("./pages/legal");
    default:
      return import("./pages/not-found");
  }
}

function dispatch(ev: PageEvents) {
  dispatchEvent(new Event(`ms:${ev}`));
}

async function paintFooter() {
  dispatch(PageEvents.Footerunload);

  $footer.innerHTML = "";

  if (page.renderFooter) {
    const footerRendered = await page.renderFooter();

    $footer.append(
      ...(footerRendered instanceof Array ? footerRendered : [footerRendered])
    );
  }

  dispatch(PageEvents.FooterLoaded);
}

async function paintContent() {
  const rendered = await page.render();

  $content.innerHTML = "";
  $content.append(...(rendered instanceof Array ? rendered : [rendered]));
  $content.className = page.parentClass || "";
}

async function repaint() {
  await paintContent();
  paintFooter(); // lazy
}

async function setState(newState: any) {
  state = newState;
  repaint();
}

async function load(key: string) {
  dispatch(PageEvents.Loading);

  page = <Page>await importPage(key);

  await repaint();

  dispatch(PageEvents.Loaded);
}

async function go(href: string, force: boolean = false) {
  if (!force && location.pathname === href) {
    return;
  }

  return new Promise((resolve) => {
    dispatch(PageEvents.unload);
    history.pushState({}, "", href);

    setTimeout(async () => {
      await load(href);

      scrollTo({
        left: 0,
        top: 0,
      });

      resolve(href);
    }, animationTime);
  });
}

function main() {
  let _lastPageStatus: PageStatus, _lastAdditionalStatus: AdditionalStatus;

  const changePageStatus = (state: PageStatus) => () => {
    document.documentElement.classList.remove(_lastPageStatus);
    document.documentElement.classList.add(state);
    _lastPageStatus = state;
  };

  const changeAdditionalStatus = (state: AdditionalStatus) => () => {
    document.documentElement.classList.remove(_lastAdditionalStatus);
    document.documentElement.classList.add(state);
    _lastAdditionalStatus = state;
  };

  addEventListener("ms:loading", changePageStatus("loading"));
  addEventListener("ms:loaded", changePageStatus("loaded"));
  addEventListener("ms:unload", changePageStatus("unload"));

  addEventListener("ms:footer-loaded", changeAdditionalStatus("footer-loaded"));
  addEventListener("ms:footer-unload", changeAdditionalStatus("footer-unload"));

  go(location.pathname, true);

  Object.assign(window, {
    go,
    repaint,
    setState,
    repaint,
    paintContent,
    paintFooter
  });
}

main();
