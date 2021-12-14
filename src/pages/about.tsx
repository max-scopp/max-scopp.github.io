import h from "hyperscript";

export const parentClass = "home";
let ytMusicPage: Window;

const openInYtMusic = (url) => () => {
  ytMusicPage = window.open(url.toString(), "ms_YoutubeMusic");
  ytMusicPage.focus();
};

export function render() {
  return [
    <h2>
      <span>Growing </span>
      <span>with </span>
      <span>web </span>
      <span>standards.</span>
    </h2>,
    <h3>With more than 10 years of experience.</h3>,
    <p>
      I am a young, introverted individual whose ambition is to create the best possible user
      interface while maintaining an understandable code base. I've been
      programming since I was 10 years old, and like to keep up with the
      times.
    </p>,
    <p>
      Besides creating user interfaces, I also like to create designs before
      development.
    </p>,
    <p>
      In my spare time, I support open source projects and tinker with my 3D
      printer. I also enjoy diving into hardware development from time to time.
    </p>,
    <p>
      If you think I can help you out, <br/> feel free to&nbsp;
      <a href="mailto:me@maxscopp.de">contact me</a>.
    </p>
  ];
}

export async function renderFooter() {
  const key = "907fab706b867060e58e352de7eb550a";
  const topsReq = await fetch(
    Math.random() * 100 >= 50
      ? `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=smaxiii&api_key=${key}&format=json`
      : `https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=smaxiii&api_key=${key}&format=json`
  );
  const tops = await topsReq.json();
  const topsList = (tops.weeklytrackchart || tops.toptracks)?.track;

  const random = topsList[Math.floor(Math.random() * topsList.length)];
  const artistName = random.artist["#text"] || random.artist.name;
  const text = `${random.name} - ${artistName}`;
  const url = new URL("https://music.youtube.com/search");
  url.searchParams.set("q", text);

  return (
    <div className="my-song">
      <a onclick={openInYtMusic(url)} target="_blank">
        {text}
      </a>
      <button
        onclick={paintFooter}
        innerHTML={`<svg width="24" height="24"><use href="#reload"/></svg>`}
      ></button>
    </div>
  );
}
