document.documentElement.classList.add("js-enabled");

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  siteNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

// Theme switch: remembers the choice on this device when browser storage is available.
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  if (themeToggle) {
    themeToggle.textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", dark ? "ライトモードに切り替え" : "ダークモードに切り替え");
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", dark ? "#202123" : "#f4f4f2");
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("zouni-theme") || "light"; } catch (_) {}
applyTheme(savedTheme);
themeToggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("zouni-theme", next); } catch (_) {}
});

// Search by work title, listed characters, and common abbreviations.
const search = document.getElementById("characterSearch");
const clearSearch = document.getElementById("clearSearch");
const works = Array.from(document.querySelectorAll(".work"));
const status = document.getElementById("searchStatus");
const searchAliases = new Map([
  ["転生したらスライムだった件", "転スラ てんすら tensura"],
  ["プロジェクトセカイ カラフルステージ feat.初音ミク", "プロセカ pjsk project sekai"],
  ["ツイステッドワンダーランド", "ツイステ twst"],
  ["SHOW BY ROCK!!", "sb69 ショウバイロック"],
  ["呪術廻戦", "じゅじゅつ jujutsu"],
  ["薬屋のひとりごと", "薬屋 くすりや kusuriya"],
  ["ラブライブ！", "ラブライブ lovelive μ's aqours 虹ヶ咲"],
  ["ピュティフィ", "ぷてぃふぃ"],
  ["アイカツ！", "アイカツ aikatsu"]
]);
function runSearch() {
  const query = (search?.value || "").trim().toLocaleLowerCase("ja");
  let shown = 0;
  works.forEach((work) => {
    const title = work.querySelector("summary")?.textContent || "";
    const aliases = searchAliases.get(title.trim()) || "";
    const haystack = `${work.textContent} ${aliases}`.toLocaleLowerCase("ja");
    const matches = !query || haystack.includes(query);
    work.hidden = !matches;
    if (matches) {
      shown++;
      if (query) work.open = true;
    }
  });
  if (clearSearch) clearSearch.hidden = !query;
  if (!query) status.textContent = "作品名・キャラクター名・一部の略称で検索できます。";
  else if (shown) status.textContent = `${shown}件の作品が見つかりました。該当作品を開いて表示しています。`;
  else status.textContent = "該当する作品・キャラクターは見つかりませんでした。別の表記でも試してみてください。";
}
search?.addEventListener("input", runSearch);
clearSearch?.addEventListener("click", () => { if (search) { search.value = ""; runSearch(); search.focus(); } });

// Soft reveal when sections enter the screen; no animation for reduced-motion settings.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Floating back-to-top button.
const floatingTop = document.getElementById("floatingTop");
function updateTopButton() { floatingTop?.classList.toggle("visible", window.scrollY > 360); }
window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();
floatingTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
