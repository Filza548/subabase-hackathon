
import supabase from "./config.js";

// Get logged-in user
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
    alert("Please login first");
    window.location.href = "./index.html";
}

// Navbar profile
const profImgNavbar = document.getElementById("profimg");
const profNameNavbar = document.getElementById("profileName");
let profileImg = document.getElementById('profileImg')
console.log(profileImg);



// Fetch posts
let userId =null
const prodcard = document.getElementById("showUser");

async function fetchProductsAdmin() {
    const { data, error } = await supabase.from("postapp").select("*");
    if (error) return console.log(error);
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user.user_metadata.profile_url);
    profileImg.src= user.user_metadata.profile_url
    

console.log(data);

    prodcard.innerHTML = data.map(product => {
      console.log(product);
      

        return `
        <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 mt-5">
          

            <!-- Post Image -->
            <div class="w-40 h-48 rounded-xl overflow-hidden bg-gray-100 mb-3">
                <img src="${product.postimgUrl}" class="w-[200px] h-[200px] object-cover">
            </div>

            <!-- Post Content -->
            <h3 class="font-bold text-lg text-gray-800 mb-1">${product.titlepost}</h3>
            <p class="text-sm text-gray-600 line-clamp-2">${product.postdes}</p>
              <img src="${product.profileimg}" class="w-10 h-10 rounded-full object-cover">

            <!-- Actions -->
            <div class="flex justify-between items-center mt-4">
                <div class="flex gap-4 text-gray-600 text-sm">
                    <button class="hover:text-red-500 transition"><i class="fa-regular fa-heart"></i> Like</button>
                    <button class="hover:text-indigo-500 transition"><i class="fa-regular fa-comment"></i> Comment</button>
                </div>
                <button class="viewdetailBtn text-xs bg-red-500 text-white px-3 py-1 rounded-lg" data-id="${product.id}">View Detail</button>
            </div>
        </div>
        `;
    }).join("");

    // View detail button
    document.querySelectorAll(".viewdetailBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            window.location.href = `onlyUserPro.html?id=${id}`;
        });
    });
}

fetchProductsAdmin();


// import supabase from "./config.js";

const showUser = document.getElementById("showUser");
const categoryBar = document.getElementById("categoryBar");

let allPosts = [];
let activeCategory = "ALL";

// 1) Fetch posts
async function fetchPosts() {
  const { data, error } = await supabase
    .from("postapp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("fetchPosts error:", error);
    return;
  }

  allPosts = data || [];
  renderCategoryButtons(allPosts);
  renderPosts(allPosts);
}

// 2) Make unique categories + render buttons (ALL + categories)
function renderCategoryButtons(posts) {
  if (!categoryBar) return;

  // categories clean + unique
  const categories = Array.from(
    new Set(
      posts
        .map(p => (p.category || "").trim())
        .filter(c => c.length > 0)
        .map(c => c.toLowerCase()) // normalize
    )
  );

  // Show ALL + categories
  categoryBar.innerHTML = "";

  // ALL button
  categoryBar.appendChild(makeCategoryBtn("ALL"));

  // category buttons
  categories.forEach(cat => {
    // show with nice text (Title case)
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryBar.appendChild(makeCategoryBtn(label, cat));
  });

  highlightActiveButton();
}

// 3) Create a button
function makeCategoryBtn(label, value = "ALL") {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.value = value; // store real category value (normalized)

  btn.className =
    "px-4 py-2 rounded-full border bg-white text-gray-700 hover:bg-indigo-600 hover:text-white transition";

  btn.textContent = label;

  btn.addEventListener("click", () => {
    activeCategory = value;

    highlightActiveButton();

    if (activeCategory === "ALL") {
      renderPosts(allPosts);
    } else {
      const filtered = allPosts.filter(
        p => (p.category || "").trim().toLowerCase() === activeCategory
      );
      renderPosts(filtered);
    }
  });

  return btn;
}

// 4) Highlight selected button
function highlightActiveButton() {
  if (!categoryBar) return;

  const buttons = categoryBar.querySelectorAll("button");
  buttons.forEach(btn => {
    const val = btn.dataset.value;

    if (val === activeCategory) {
      btn.className =
        "px-4 py-2 rounded-full border bg-indigo-600 text-white transition";
    } else {
      btn.className =
        "px-4 py-2 rounded-full border bg-white text-gray-700 hover:bg-indigo-600 hover:text-white transition";
    }
  });
}

// 5) Render posts cards
function renderPosts(posts) {
  if (!showUser) return;

  if (!posts || posts.length === 0) {
    showUser.innerHTML = `<p class="text-gray-500">No posts found.</p>`;
    return;
  }

  showUser.innerHTML = posts
    .map(post => {
      const title = post.titlepost || "";
      const desc = post.postdes || "";
      const cat = post.category || "";

      // IMPORTANT: change postingUrl to postimgUrl if your DB column is postimgUrl
      const img = post.postingUrl || ""; 

      const profile = post.profileimg || "https://i.pravatar.cc/60";
      return `
        <div class="bg-white rounded-xl shadow p-4">
          <div class="flex items-center gap-3 mb-3">
            <img src="${profile}" class="w-10 h-10 rounded-full object-cover" />
            <div>
              <p class="text-sm font-semibold text-gray-800">${title}</p>
              <p class="text-xs text-gray-500">${cat}</p>
            </div>
          </div>

          ${img ? `<img src="${img}" class="w-full h-40 object-cover rounded-lg mb-3" />` : ""}

          <p class="text-sm text-gray-700">${desc}</p>
        </div>
      `;
    })
    .join("");
}

// Start
fetchPosts();

