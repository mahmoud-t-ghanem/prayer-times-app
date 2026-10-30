import { t } from "./i18n.js";

export function createCombobox(
  root,
  { placeholderKey, searchKey, emptyKey = "select.noResults" },
) {
  let options = [];
  let filtered = [];
  let selected = null;
  let active = -1;
  const handlers = [];

  root.classList.add("combo");
  root.innerHTML = `
    <button type="button" class="combo__btn" aria-haspopup="listbox" aria-expanded="false">
      <span class="combo__value"></span>
      <i class="fa-solid fa-chevron-down combo__caret"></i>
    </button>
    <div class="combo__panel" hidden>
      <div class="combo__searchbox">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input class="combo__search" type="text" autocomplete="off" />
      </div>
      <ul class="combo__list" role="listbox"></ul>
    </div>`;

  const btn = root.querySelector(".combo__btn");
  const valueEl = root.querySelector(".combo__value");
  const panel = root.querySelector(".combo__panel");
  const search = root.querySelector(".combo__search");
  const list = root.querySelector(".combo__list");

  const isOpen = () => !panel.hidden;

  function makeLabel(opt) {
    const frag = document.createDocumentFragment();
    if (opt.icon) {
      const img = document.createElement("img");
      img.className = "combo__flag";
      img.src = opt.icon;
      img.alt = "";
      img.loading = "lazy";
      frag.append(img);
    }
    const text = document.createElement("span");
    text.className = "combo__text";
    text.textContent = opt.label;
    frag.append(text);
    if (opt.sub) {
      const sub = document.createElement("small");
      sub.className = "combo__sub";
      sub.textContent = opt.sub;
      frag.append(sub);
    }
    return frag;
  }

  function renderValue() {
    valueEl.replaceChildren();
    if (selected) {
      valueEl.classList.remove("is-placeholder");
      valueEl.append(makeLabel(selected));
    } else {
      valueEl.classList.add("is-placeholder");
      valueEl.textContent = t(placeholderKey);
    }
    search.placeholder = t(searchKey);
  }

  function setActive(i) {
    active = i;
    [...list.children].forEach((li, idx) =>
      li.classList.toggle("is-active", idx === i),
    );
    list.children[i]?.scrollIntoView({ block: "nearest" });
  }

  function renderList() {
    const q = search.value.trim().toLowerCase();
    filtered = q
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(q) ||
            (o.alt || "").toLowerCase().includes(q),
        )
      : options;
    list.replaceChildren();

    if (!filtered.length) {
      const li = document.createElement("li");
      li.className = "combo__empty";
      li.textContent = t(emptyKey);
      list.append(li);
      active = -1;
      return;
    }

    filtered.forEach((opt) => {
      const li = document.createElement("li");
      li.className =
        "combo__option" + (selected?.value === opt.value ? " is-selected" : "");
      li.setAttribute("role", "option");
      li.append(makeLabel(opt));
      li.addEventListener("click", () => choose(opt));
      list.append(li);
    });
    const idx = filtered.findIndex((o) => o.value === selected?.value);
    setActive(idx >= 0 ? idx : 0);
  }

  function open() {
    if (btn.disabled) return;
    panel.hidden = false;
    root.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    search.value = "";
    renderList();
    search.focus({ preventScroll: true });
  }

  function close() {
    panel.hidden = true;
    root.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  function choose(opt) {
    selected = opt;
    renderValue();
    close();
    handlers.forEach((fn) => fn(opt));
  }

  btn.addEventListener("click", () => (isOpen() ? close() : open()));
  search.addEventListener("input", renderList);
  search.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(active + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(active - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    } else if (e.key === "Escape") {
      close();
      btn.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (isOpen() && !root.contains(e.target)) close();
  });

  renderValue();

  return {
    setOptions(opts) {
      options = opts;
      if (selected)
        selected = opts.find((o) => o.value === selected.value) || null;
      renderValue();
      if (isOpen()) renderList();
    },
    getSelected: () => selected,
    clear() {
      selected = null;
      options = [];
      renderValue();
    },
    setDisabled(v) {
      btn.disabled = v;
      root.classList.toggle("is-disabled", v);
      if (v) close();
    },
    setPlaceholder(key) {
      placeholderKey = key;
      renderValue();
    },
    refreshTexts: renderValue,
    onChange(fn) {
      handlers.push(fn);
    },
  };
}
