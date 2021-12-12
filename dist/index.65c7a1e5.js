document.addEventListener('DOMContentLoaded', ()=>{
    document.documentElement.classList.add("loaded");
});
function addAnimateOut(element) {
    element.addEventListener("click", (event)=>{
        event.preventDefault();
        document.documentElement.classList.remove("loaded");
        setTimeout(()=>{
            history.pushState(element.href);
        }, 800);
    });
}
document.querySelectorAll("a:not([target=_blank])").forEach(addAnimateOut);

//# sourceMappingURL=index.65c7a1e5.js.map
