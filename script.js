/**
 * PRIME GOURMET - JAVASCRIPT LOGIC
 * مطعم برايم جورميه (Prime Gourmet Restaurant)
 * Interactive Menu, Cart System, Customizer Modal, Live Search & Filters
 */

// --- Global Application State ---
const AppState = {
  restaurantName: "برايم جورميه",
  restaurantEnglish: "PRIME GOURMET",
  tableNumber: "07",
  diningMode: "dine-in", // 'dine-in', 'takeaway', 'delivery'
  currentBasePrice: 68,
  currentSizeDelta: 12,
  currentSizeLabel: "دبل (260g)",
  currentModalDish: {
    name: "",
    price: 0,
    desc: ""
  },
  cart: [
    {
      id: "cart-init-1",
      name: "برايم دبل بلاك أنجوس برجر",
      price: 74,
      qty: 1,
      options: "حجم دبل + جبنة شيدر إضافية"
    },
    {
      id: "cart-init-2",
      name: "ترافل سموكي برجر",
      price: 75,
      qty: 1,
      options: "بدون فطر سوتيه"
    }
  ]
};

// --- Initialization on DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupEventListeners();
  syncAllCardCounters();
});

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Sync top header search with menu search
  const headerSearch = document.getElementById("headerSearchInput");
  const menuSearch = document.getElementById("dishSearchInput");

  if (headerSearch && menuSearch) {
    headerSearch.addEventListener("input", (e) => {
      menuSearch.value = e.target.value;
      filterDishesLive(e.target.value);
      // If user typed in header search, scroll smoothly to the menu grid
      const menuSection = document.getElementById("menuSection");
      if (menuSection && e.target.value.trim().length > 0) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    menuSearch.addEventListener("input", (e) => {
      headerSearch.value = e.target.value;
      filterDishesLive(e.target.value);
    });
  }

  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCustomizerModal();
      toggleCartDrawer(false);
    }
  });

  // Modal backdrop click
  const modal = document.getElementById("customizerModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCustomizerModal();
      }
    });
  }

  // Drawer backdrop click
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", () => {
      toggleCartDrawer(false);
    });
  }
}

// ==========================================================================
// 1. CART DRAWER OPERATIONS
// ==========================================================================

function toggleCartDrawer(open) {
  const drawer = document.getElementById("sideCartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");

  if (!drawer) return;

  if (open) {
    drawer.classList.remove("drawer-closed");
    drawer.classList.add("drawer-open");
    if (backdrop) {
      backdrop.classList.remove("hidden");
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");
    }
  } else {
    drawer.classList.add("drawer-closed");
    drawer.classList.remove("drawer-open");
    if (backdrop) {
      backdrop.classList.remove("opacity-100");
      backdrop.classList.add("opacity-0");
      setTimeout(() => {
        backdrop.classList.add("hidden");
      }, 300);
    }
  }
}

function renderCart() {
  const cartList = document.getElementById("cartItemsList");
  if (!cartList) return;

  cartList.innerHTML = "";

  if (AppState.cart.length === 0) {
    cartList.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant">
        <span class="material-symbols-outlined text-5xl text-outline mb-2">shopping_basket</span>
        <p class="font-headline-sm text-headline-sm font-semibold mb-1">سلة الطلبات فارغة</p>
        <p class="font-body-sm text-body-sm text-outline">أضف بعض الأطباق والمشروبات الفاخرة لتظهر هنا</p>
      </div>
    `;
  } else {
    AppState.cart.forEach((item, index) => {
      const itemRow = document.createElement("div");
      itemRow.className = "cart-item-row flex items-center justify-between p-space-sm bg-surface-container rounded-lg border border-white/5 transition-all";
      itemRow.dataset.index = index;
      itemRow.dataset.dish = item.name;

      itemRow.innerHTML = `
        <div class="flex-1 pr-1">
          <h4 class="font-label-md text-label-md font-bold text-on-surface">${item.name}</h4>
          <span class="font-label-sm text-label-sm text-outline block">${item.options || "طلب كلاسيكي"}</span>
          <div class="text-primary font-bold font-label-sm text-label-sm mt-0.5 tabular-numbers">${item.price} ر.س</div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center bg-surface-container-high rounded-lg p-0.5">
            <button onclick="updateCartItemQty(${index}, -1)" class="w-6 h-6 rounded flex items-center justify-center text-on-surface hover:text-primary transition-colors font-bold" title="تقليل">-</button>
            <span class="px-2 font-label-sm text-label-sm font-bold item-qty tabular-numbers">${item.qty}</span>
            <button onclick="updateCartItemQty(${index}, 1)" class="w-6 h-6 rounded flex items-center justify-center text-on-surface hover:text-primary transition-colors font-bold" title="زيادة">+</button>
          </div>
          <button onclick="removeCartItem(${index})" class="text-outline hover:text-error transition-colors p-1" title="حذف">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      `;
      cartList.appendChild(itemRow);
    });
  }

  updateCartSummaryDisplay();
  syncAllCardCounters();
}

function addToCart(name, price, qty = 1, options = "طلب كلاسيكي") {
  // Check if identical item already exists (same name & options)
  const existing = AppState.cart.find(
    (item) => item.name === name && item.options === options
  );

  if (existing) {
    existing.qty += qty;
  } else {
    AppState.cart.push({
      id: "cart-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: name,
      price: price,
      qty: qty,
      options: options
    });
  }

  renderCart();
  showToast(`تمت إضافة "${name}" إلى السلة 🍔`, "check_circle");
}

function updateCartItemQty(index, change) {
  if (!AppState.cart[index]) return;

  AppState.cart[index].qty += change;

  if (AppState.cart[index].qty <= 0) {
    AppState.cart.splice(index, 1);
  }

  renderCart();
}

function removeCartItem(index) {
  if (!AppState.cart[index]) return;
  const removedName = AppState.cart[index].name;
  AppState.cart.splice(index, 1);
  renderCart();
  showToast(`تم حذف "${removedName}" من السلة`, "delete");
}

function updateCartSummaryDisplay() {
  let subtotal = 0;
  let totalCount = 0;

  AppState.cart.forEach((item) => {
    subtotal += item.price * item.qty;
    totalCount += item.qty;
  });

  const vat = subtotal * 0.15;
  const grandTotal = subtotal + vat;

  // Drawer totals
  const billSubtotal = document.getElementById("billSubtotal");
  const billVat = document.getElementById("billVat");
  const billGrandTotal = document.getElementById("billGrandTotal");

  if (billSubtotal) billSubtotal.textContent = subtotal.toFixed(2) + " ر.س";
  if (billVat) billVat.textContent = vat.toFixed(2) + " ر.س";
  if (billGrandTotal) billGrandTotal.textContent = grandTotal.toFixed(2) + " ر.س";

  // Header badges & totals
  const headerTotal = document.getElementById("headerCartTotal");
  const headerCount = document.getElementById("headerCartCount");
  if (headerTotal) headerTotal.textContent = grandTotal.toFixed(0) + " ر.س";
  if (headerCount) headerCount.textContent = totalCount;

  // Mobile sticky bar totals & badges
  const mobileTotal = document.getElementById("mobileCartTotal");
  const mobileCount = document.getElementById("mobileCartCount");
  if (mobileTotal) mobileTotal.textContent = grandTotal.toFixed(2) + " ر.س";
  if (mobileCount) mobileCount.textContent = totalCount;
}

// Quick add from Hero Section
function quickAddToCart(title, price) {
  addToCart(title, price, 1, "عرض الشيف الملكي مع صوص الترافل");
  toggleCartDrawer(true);
}

// ==========================================================================
// 2. DISH CARD ACTION BUTTONS & QUANTITY SYNC
// ==========================================================================

function handleItemAdd(button) {
  const parent = button.closest(".dish-action-area");
  if (!parent) return;

  const dishName = parent.dataset.name;
  const price = parseFloat(parent.dataset.price);

  addToCart(dishName, price, 1, "طلب كلاسيكي");
}

function syncAllCardCounters() {
  const cards = document.querySelectorAll(".dish-card");

  cards.forEach((card) => {
    const actionArea = card.querySelector(".dish-action-area");
    if (!actionArea) return;

    const dishName = actionArea.dataset.name;
    const price = parseFloat(actionArea.dataset.price);

    // Calculate total quantity of this dish in cart
    const inCartQty = AppState.cart
      .filter((item) => item.name.includes(dishName))
      .reduce((sum, item) => sum + item.qty, 0);

    if (inCartQty > 0) {
      actionArea.innerHTML = `
        <div class="flex items-center bg-surface-container-highest rounded-lg p-0.5 shadow-sm border border-primary-container/20">
          <button onclick="decrementCardDish('${dishName}', ${price})" class="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:text-primary font-bold transition-colors" title="تقليل">-</button>
          <span class="px-space-sm font-label-sm text-label-sm font-bold text-primary active-counter-val tabular-numbers">${inCartQty}</span>
          <button onclick="incrementCardDish('${dishName}', ${price})" class="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:text-primary font-bold transition-colors" title="إضافة">+</button>
        </div>
      `;
    } else {
      actionArea.innerHTML = `
        <button class="add-btn px-space-md py-space-xs bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md font-bold rounded-lg shadow-sm transition-all flex items-center gap-1" onclick="handleItemAdd(this)">
          <span class="material-symbols-outlined text-sm">add</span>
          <span>إضافة</span>
        </button>
      `;
    }
  });
}

function incrementCardDish(name, price) {
  addToCart(name, price, 1, "طلب كلاسيكي");
}

function decrementCardDish(name, price) {
  // Find index of first matching item in cart
  const index = AppState.cart.findIndex((item) => item.name.includes(name));
  if (index !== -1) {
    updateCartItemQty(index, -1);
  }
}

// ==========================================================================
// 3. CUSTOMIZER MODAL LOGIC
// ==========================================================================

function openCustomizerModal(dishTitle, price, desc) {
  AppState.currentBasePrice = price;
  AppState.currentSizeDelta = 12;
  AppState.currentSizeLabel = "دبل (260g)";
  AppState.currentModalDish = {
    name: dishTitle,
    price: price,
    desc: desc
  };

  const modal = document.getElementById("customizerModal");
  const modalName = document.getElementById("modalDishName");
  const modalDesc = document.getElementById("modalDishDesc");

  if (modalName) modalName.textContent = dishTitle;
  if (modalDesc) modalDesc.textContent = desc;

  // Reset checkboxes
  document.querySelectorAll(".addon-checkbox").forEach((cb) => {
    cb.checked = false;
  });

  // Reset notes
  const notesInput = document.getElementById("modalChefNotes");
  if (notesInput) notesInput.value = "";

  // Reset size buttons
  document.querySelectorAll(".size-btn").forEach((b, idx) => {
    if (idx === 1) {
      b.className = "size-btn active-size px-space-sm py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold text-center transition-all";
    } else {
      b.className = "size-btn px-space-sm py-space-sm rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md font-semibold text-center transition-all";
    }
  });

  calculateModalTotal();

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
  }
}

function closeCustomizerModal() {
  const modal = document.getElementById("customizerModal");
  if (modal) {
    modal.classList.remove("modal-visible");
    modal.classList.add("modal-hidden");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 250);
  }
}

function selectSize(btn, delta, label) {
  AppState.currentSizeDelta = delta;
  AppState.currentSizeLabel = label || "محدد";

  document.querySelectorAll(".size-btn").forEach((b) => {
    b.className = "size-btn px-space-sm py-space-sm rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md font-semibold text-center transition-all";
  });

  btn.className = "size-btn active-size px-space-sm py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold text-center transition-all";
  calculateModalTotal();
}

function calculateModalTotal() {
  let total = AppState.currentBasePrice + AppState.currentSizeDelta;

  document.querySelectorAll(".addon-checkbox:checked").forEach((cb) => {
    total += parseFloat(cb.dataset.price || 0);
  });

  const priceElem = document.getElementById("modalFinalPrice");
  if (priceElem) {
    priceElem.textContent = total + " ر.س";
  }
}

function confirmModalAddToCart() {
  const dishName = AppState.currentModalDish.name;
  const finalPriceStr = document.getElementById("modalFinalPrice").textContent;
  const priceNum = parseFloat(finalPriceStr);

  // Collect options summary
  const selectedSpice = document.querySelector('input[name="spice"]:checked')?.nextElementSibling?.textContent.trim() || "عادي";
  
  const chosenAddons = [];
  document.querySelectorAll(".addon-checkbox:checked").forEach((cb) => {
    const label = cb.closest("label").querySelector(".addon-name")?.textContent.trim();
    if (label) chosenAddons.push(label);
  });

  const notes = document.getElementById("modalChefNotes")?.value.trim();

  let optionsStr = `حجم: ${AppState.currentSizeLabel} • درجة: ${selectedSpice}`;
  if (chosenAddons.length > 0) {
    optionsStr += ` • إضافات: ${chosenAddons.join(", ")}`;
  }
  if (notes) {
    optionsStr += ` • ملاحظات: "${notes}"`;
  }

  addToCart(dishName, priceNum, 1, optionsStr);
  closeCustomizerModal();
  toggleCartDrawer(true);
}

// ==========================================================================
// 4. CATEGORY & DIETARY FILTERS & SEARCH
// ==========================================================================

function setActiveCategory(cat, el) {
  document.querySelectorAll(".category-pill").forEach((btn) => {
    btn.className = "category-pill flex items-center gap-space-xs px-space-lg py-space-xs rounded-full font-label-md text-label-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-all";
  });
  el.className = "category-pill active flex items-center gap-space-xs px-space-lg py-space-xs rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container font-bold shadow-md shadow-primary-container/20 whitespace-nowrap transition-all";

  const cards = document.querySelectorAll(".dish-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    if (cat === "all" || cardCategory === cat) {
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const countLabel = document.getElementById("itemCountLabel");
  if (countLabel) {
    countLabel.textContent = `(${visibleCount} أطباق مختارة)`;
  }
}

function filterByTag(tag, el) {
  document.querySelectorAll(".diet-filter-btn").forEach((b) => {
    b.className = "diet-filter-btn px-space-md py-1 rounded-full font-label-md text-label-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant transition-all flex items-center gap-1";
  });
  el.className = "diet-filter-btn active px-space-md py-1 rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container font-semibold transition-all flex items-center gap-1";

  const cards = document.querySelectorAll(".dish-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const tags = card.dataset.tags || "";
    if (tag === "all" || tags.includes(tag)) {
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const countLabel = document.getElementById("itemCountLabel");
  if (countLabel) {
    countLabel.textContent = `(${visibleCount} أطباق مختارة)`;
  }
}

function filterDishesLive(query) {
  const normalized = query.trim().toLowerCase();
  const cards = document.querySelectorAll(".dish-card");
  let count = 0;

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (text.includes(normalized)) {
      card.style.display = "flex";
      count++;
    } else {
      card.style.display = "none";
    }
  });

  const countLabel = document.getElementById("itemCountLabel");
  if (countLabel) {
    countLabel.textContent = normalized.length > 0 ? `(${count} نتائج بحث)` : `(${count} أصناف مختارة)`;
  }
}

function clearSearch() {
  const menuSearch = document.getElementById("dishSearchInput");
  const headerSearch = document.getElementById("headerSearchInput");
  if (menuSearch) menuSearch.value = "";
  if (headerSearch) headerSearch.value = "";
  filterDishesLive("");
}

// ==========================================================================
// 5. DINING ORDER TYPE SWITCHER
// ==========================================================================

function setOrderType(type, el) {
  AppState.diningMode = type;

  // Update drawer switcher
  document.querySelectorAll(".order-type-btn").forEach((b) => {
    b.className = "order-type-btn flex-1 py-1 rounded font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-all";
  });
  if (el) {
    el.className = "order-type-btn flex-1 py-1 rounded font-label-sm text-label-sm font-bold bg-primary-container text-on-primary-container transition-all";
  }

  // Update header dining buttons
  document.querySelectorAll(".header-mode-btn").forEach((b) => {
    b.className = "header-mode-btn px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all";
  });
  const headerActive = document.getElementById("headerMode-" + type);
  if (headerActive) {
    headerActive.className = "header-mode-btn px-space-md py-space-xs rounded-full font-label-md text-label-md bg-primary-container text-on-primary-container font-semibold transition-all";
  }

  let modeName = "داخل المطعم (طاولة 07)";
  if (type === "takeaway") modeName = "استلام سفري من الفرع";
  if (type === "delivery") modeName = "توصيل منزلي سريع";

  showToast(`تم تعيين نوع الطلب: ${modeName}`, "restaurant");
}

// ==========================================================================
// 6. CHECKOUT SIMULATION & WHATSAPP SHARING
// ==========================================================================

function simulateOrderCheckout() {
  if (AppState.cart.length === 0) {
    alert("السلة فارغة حالياً! يرجى إضافة أطباق أولاً.");
    return;
  }

  const grandTotal = document.getElementById("billGrandTotal")?.textContent || "0 ر.س";
  let modeName = "طاولة رقم 07";
  if (AppState.diningMode === "takeaway") modeName = "استلام سفري";
  if (AppState.diningMode === "delivery") modeName = "توصيل منزلي";

  const message = `✨ تم تأكيد طلبك بنجاح في مطعم برايم جورميه!\n\n` +
    `📍 النوع: ${modeName}\n` +
    `💰 الإجمالي النهائي: ${grandTotal}\n` +
    `👨‍🍳 جارٍ تحضير أطباقك بكل عناية وشغف...`;

  alert(message);
  toggleCartDrawer(false);
}

function shareOrderViaWhatsapp() {
  if (AppState.cart.length === 0) {
    alert("السلة فارغة حالياً! يرجى إضافة أطباق أولاً.");
    return;
  }

  const grandTotal = document.getElementById("billGrandTotal")?.textContent || "";
  let itemsSummary = AppState.cart
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.qty}x) - ${item.price * item.qty} ر.س\n   [${item.options}]`)
    .join("\n");

  let modeText = "طاولة VIP رقم 07";
  if (AppState.diningMode === "takeaway") modeText = "استلام سفري";
  if (AppState.diningMode === "delivery") modeText = "توصيل منزلي";

  const fullText = 
    `مرحباً مطعم برايم جورميه (Prime Gourmet) 🍔✨\n` +
    `أود تأكيد طلبي الجديد:\n\n` +
    `نوع الطلب: ${modeText}\n` +
    `الأصناف المطلوبة:\n${itemsSummary}\n\n` +
    `الإجمالي النهائي: ${grandTotal}\n\n` +
    `شكراً لكم!`;

  const url = `https://wa.me/966500000000?text=${encodeURIComponent(fullText)}`;
  window.open(url, "_blank");
}

// ==========================================================================
// 7. TOAST NOTIFICATION UTILITY
// ==========================================================================

function showToast(message, icon = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `
    <span class="material-symbols-outlined text-primary text-xl">${icon}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}
