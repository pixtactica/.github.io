document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("sub-nav");
    const overlay = document.getElementById("main-overlay");
    const toggle = document.getElementById("menu-toggle");

    if (!nav || !overlay || !toggle) {
        console.error("サブメニューの要素が見つかりません");
        return;
    }

    function openMenu() {
        nav.classList.add("is-open");
        overlay.classList.add("is-active");
        toggle.classList.add("is-active");
        nav.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        nav.classList.remove("is-open");
        overlay.classList.remove("is-active");
        toggle.classList.remove("is-active");
        nav.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
            closeMenu();
        }
    });
});