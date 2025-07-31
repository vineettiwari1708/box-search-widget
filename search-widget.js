document.addEventListener("DOMContentLoaded", function () {
  const scriptTag = document.getElementById("search-widget-script");
  if (!scriptTag) return;

  let searchData = [];

  try {
    searchData = JSON.parse(scriptTag.getAttribute("data-items"));
  } catch (err) {
    console.error("❌ Invalid JSON in search widget:", err);
    return;
  }

  // --- Search Widget Container ---
  const widget = document.createElement("div");
  widget.id = "live-search-widget";
  widget.style.position = "fixed";
  widget.style.bottom = "80px";
  widget.style.right = "20px";
  widget.style.width = "300px";
  widget.style.background = "#fff";
  widget.style.border = "1px solid #ccc";
  widget.style.borderRadius = "10px";
  widget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
  widget.style.padding = "16px";
  widget.style.display = "none";
  widget.style.zIndex = "100000";

  widget.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
      <strong>Search</strong>
      <button id="search-close-btn" style="background:none; border:none; font-size:18px; cursor:pointer; color:#dc3545;">&times;</button>
    </div>
    <input id="search-input" type="text" placeholder="Type to search..." style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;" />
    <ul id="search-results" style="list-style:none; margin-top:10px; padding-left:0; max-height:150px; overflow-y:auto;"></ul>
  `;

  document.body.appendChild(widget);

  const input = widget.querySelector("#search-input");
  const results = widget.querySelector("#search-results");

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    results.innerHTML = "";

    if (term.trim() === "") return;

    const matched = searchData.filter((item) =>
      item.text.toLowerCase().includes(term)
    );

    if (matched.length === 0) {
      results.innerHTML = `<li style="padding:6px; color:#999;">No results found</li>`;
    } else {
      matched.forEach((item) => {
        const li = document.createElement("li");
        li.style.padding = "6px";
        li.style.borderBottom = "1px solid #eee";
        li.innerHTML = `<a href="${item.link}" target="_blank" style="text-decoration:none; color:#007bff;">${item.text}</a>`;
        results.appendChild(li);
      });
    }
  });

  // --- Close Button ---
  widget.querySelector("#search-close-btn").addEventListener("click", () => {
    widget.style.display = "none";
    toggleBtn.style.display = "flex";
    input.value = "";
    results.innerHTML = "";
  });

  // --- Floating Toggle Button ---
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggle-search-widget";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.bottom = "20px";
  toggleBtn.style.right = "20px";
  toggleBtn.style.zIndex = "100001";
  toggleBtn.style.height = "48px";
  toggleBtn.style.display = "flex";
  toggleBtn.style.alignItems = "center";
  toggleBtn.style.justifyContent = "flex-start";
  toggleBtn.style.backgroundColor = "#28a745";
  toggleBtn.style.border = "none";
  toggleBtn.style.borderRadius = "24px";
  toggleBtn.style.color = "#fff";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.padding = "0 12px";
  toggleBtn.style.overflow = "hidden";
  toggleBtn.style.transition = "width 0.3s ease";
  toggleBtn.style.width = "48px";

  const icon = document.createElement("i");
  icon.className = "fas fa-search";
  icon.style.fontSize = "18px";
  toggleBtn.appendChild(icon);

  const textSpan = document.createElement("span");
  textSpan.textContent = "  Search";
  textSpan.style.whiteSpace = "nowrap";
  textSpan.style.marginLeft = "8px";
  textSpan.style.opacity = "0";
  textSpan.style.transition = "opacity 0.3s ease";
  toggleBtn.appendChild(textSpan);

  toggleBtn.addEventListener("mouseenter", () => {
    toggleBtn.style.width = "150px";
    textSpan.style.opacity = "1";
  });

  toggleBtn.addEventListener("mouseleave", () => {
    toggleBtn.style.width = "48px";
    textSpan.style.opacity = "0";
  });

  toggleBtn.addEventListener("click", () => {
    toggleBtn.style.display = "none";
    widget.style.display = "block";
    input.focus();
  });

  document.body.appendChild(toggleBtn);
});
