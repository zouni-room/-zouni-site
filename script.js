const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const search = document.getElementById("characterSearch");
const works = Array.from(document.querySelectorAll(".work"));
const status = document.getElementById("searchStatus");

search?.addEventListener("input", () => {
  const query = search.value.trim().toLocaleLowerCase("ja");
  let shown = 0;

  works.forEach((work) => {
    const matches = work.textContent.toLocaleLowerCase("ja").includes(query);
    work.hidden = !matches;
    if (matches) {
      shown++;
      if (query) work.open = true;
    }
  });

  if (!query) {
    status.textContent = "作品名・キャラクター名で絞り込めます。";
  } else if (shown) {
    status.textContent = `${shown}件の作品が見つかりました。`;
  } else {
    status.textContent = "該当する作品・キャラクターは見つかりませんでした。";
  }
});
