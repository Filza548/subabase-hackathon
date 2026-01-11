import supabase from "./config.js";

// ================= AUTH CHECK =================
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
    alert("Please login first");
    window.location.href = "./index.html";
}

// ================= GET PRODUCT ID FROM URL =================
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    alert("No product selected");
}

// ================= FETCH SINGLE PRODUCT =================
const prodcard = document.getElementById("onlyUserPro");


async function fetchSingleProduct() {

    const { data, error } = await supabase
        .from("postapp")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.log(error);
        return;
    }
let isOwner = user && data.user_id === user.id;

prodcard.innerHTML = `
<div class="bg-white rounded-3xl shadow-xl overflow-hidden max-w-xl mx-auto mt-10">

    <!-- HERO IMAGE -->
    <div class="relative w-full h-[260px] bg-gray-100">
        <img src="${data.postimgUrl}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>

    <div class="p-8">

        <h2 class="text-3xl font-extrabold text-gray-900 mb-5">
            ${data.titlepost}
        </h2>

        <p class="text-gray-700 text-lg whitespace-pre-line mb-10">
            ${data.postdes}
        </p>

        <div class="flex justify-between items-center border-t pt-6">

            <div class="flex gap-8 text-gray-600">
                <button class="flex items-center gap-2 hover:text-red-500">
                    <i class="fa-regular fa-heart text-xl"></i> Like
                </button>
                <button class="flex items-center gap-2 hover:text-indigo-500">
                    <i class="fa-regular fa-comment text-xl"></i> Comment
                </button>
            </div>

            <!-- OWNER ONLY -->
            ${isOwner ? `
            <div class="flex gap-3">
                <button class="editBtn bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full">
                    Edit
                </button>
                <button class="deltBtn bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full">
                    Delete
                </button>
            </div>
            ` : ""}
        </div>
    </div>
</div>
`;


    // ================= DELETE =================
    document.querySelector(".deltBtn").addEventListener("click", async () => {
        const { error } = await supabase
            .from("postapp")
            .delete()
            .eq("id", productId);

        if (!error) {
            window.location.href = "dashboard.html";
        }
    });

    // ================= EDIT =================
    document.querySelector(".editBtn").addEventListener("click", () => {
        window.location.href = `edit-product.html?id=${productId}`;
    });
}

fetchSingleProduct();














// import supabase from "./config.js";
// //   get user

// const { data: { user } } = await supabase.auth.getUser();
// if (!user) {
//     alert("Please login first");
//     window.location.href = "./index.html";
// }


// // ================= FETCH PRODUCTS =================
// const prodcard = document.getElementById("showUser");

// async function fetchProductsAdmin() {
//     const { data, error } = await supabase
//         .from("postapp")
//         .select("*");
//     if (error) return console.log(error);
//     console.log(data);


// prodcard.innerHTML = data.map(product => {
//     // Check if logged-in user is the owner of the post
//     // const isOwner = user && product.user_id === user.id;

//     return `
//   <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 mt-5">

//     <!-- Post Image -->
//     <div class="w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-3">
//       <img src="${product.postimgUrl}" class="w-full h-full object-cover">
//     </div>

//     <!-- Post Content -->
//     <h3 class="font-bold text-lg text-gray-800 mb-1">
//       ${product.titlepost}
//     </h3>
//     <p class="text-sm text-gray-600 line-clamp-2">
//       ${product.postdes}
//     </p>

//     <!-- Actions -->
//     <div class="flex justify-between items-center mt-4">
//       <div class="flex gap-4 text-gray-600 text-sm">
//         <button class="hover:text-red-500 transition">
//           <i class="fa-regular fa-heart"></i> Like
//         </button>
//         <button class="hover:text-indigo-500 transition">
//           <i class="fa-regular fa-comment"></i> Comment
//         </button>
//       </div>

//        <button class="viewdetailBtn text-xs bg-red-500 text-white px-3 py-1 rounded-lg"
//            data-id="${product.id}">
//            View Detail
//          </button>
//       </div>
//       <!-- ONLY SHOW EDIT/DELETE IF OWNER -->
//       <div class="flex gap-2">
//         <button class="editBtn text-xs bg-yellow-500 text-white px-3 py-1 rounded-lg"
//           data-id="${product.id}">
//           Edit
//         </button>
//         <button class="deltBtn text-xs bg-red-500 text-white px-3 py-1 rounded-lg"
//           data-id="${product.id}">
//           Delete
//         </button>
//       </div>
//       </div>`;
// }).join("");

//     document.querySelectorAll(".viewdetailBtn").forEach(btn =>{
//         btn.addEventListener("click",async() => {
//             const id = btn.dataset.id;
            
//         //   window.location.href = `edit-product.html?id=${id}`;
//         window.location.href="onlyUserPro.html"
//     })
//     })

//     document.querySelectorAll(".editBtn").forEach(btn => {
//         btn.addEventListener("click", async() => {
//             const id = btn.dataset.id;
//             // const { error } = await supabase
//             //     .from('adminProd')
//             //     .update({ name: 'piano' })
//             //     .eq('id', id)
//           window.location.href = `edit-product.html?id=${id}`;

//             if (error) {
//                 console.log(error);

//             }
//         });
//     });

//     document.querySelectorAll(".deltBtn").forEach(btn => {
//         btn.addEventListener("click", async e => {
//             const id = btn.dataset.id;
//             const { error } = await supabase
//                 .from("postapp")
//                 .delete()
//                 .eq("id", id);
//             if (!error) fetchProductsAdmin();
//         });
//     });
// }

// fetchProductsAdmin();


















// import supabase from "./config.js";
// // get user
// const { data: { user } } = await supabase.auth.getUser();
// if (!user) {
//     alert("Please login first");
//     window.location.href = "./index.html";
// }

// // Get post ID from URL
// const params = new URLSearchParams(window.location.search);
// const postId = params.get("id");
// if (!postId) {
//     alert("Invalid Post");
//     window.location.href = "index.html";
// }

// const prodcard = document.getElementById("onlyUserPro");

// async function fetchPost() {
//     const { data, error } = await supabase
//         .from("postapp")
//         .select("*")
//         .eq("id", postId)
//         .maybeSingle();

//     if (error || !data) {
//         alert("Post not found");
//         window.location.href = "index.html";
//         return;
//     }

//     const isOwner = user && data.user_id === user.id;
// prodcard.innerHTML = `
//     <div class="bg-white rounded-2xl w-80 h-80 shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition-all duration-300">

//         <!-- Image -->
//         <div class="flex-shrink-0  md:w-40 h-40 md:h-40 lg:h-40 rounded-xl overflow-hidden bg-gray-100">
//             <img src="${data.postimgUrl}" class="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105">
//         </div>

//         <!-- Content -->
//         <div class="flex-1 flex flex-col justify-between">
//             <div>
//                 <h2 class="text-2xl font-bold text-gray-800 mb-3">${data.titlepost}</h2>
//                 <p class="text-gray-700 text-base whitespace-pre-line">${data.postdes}</p>
//             </div>

//             <!-- Actions -->
//             <div class="mt-4 flex justify-between items-center flex-wrap gap-2">
//                 <div class="flex gap-4 text-gray-600 text-sm">
//                     <button class="hover:text-red-500 transition flex items-center gap-1">
//                         <i class="fa-regular fa-heart"></i> Like
//                     </button>
//                     <button class="hover:text-indigo-500 transition flex items-center gap-1">
//                         <i class="fa-regular fa-comment"></i> Comment
//                     </button>
//                 </div>

//                 <!-- Edit/Delete only for owner -->
//                 ${isOwner ? `
//                 <div class="flex gap-2 mt-2 md:mt-0">
//                     <button class="editBtn text-xs bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">Edit</button>
//                     <button class="deltBtn text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
//                 </div>` : ''}
//             </div>
//         </div>
//     </div>
// `;


//     // Owner actions
//     document.querySelectorAll(".editBtn").forEach(btn => {
//         btn.addEventListener("click", () => {
//             window.location.href = `edit-product.html?id=${postId}`;
//         });
//     });

//     document.querySelectorAll(".deltBtn").forEach(btn => {
//         btn.addEventListener("click", async () => {
//             const { error } = await supabase
//                 .from("postapp")
//                 .delete()
//                 .eq("id", postId);
//             if (!error) window.location.href = "showprod.html";
//         });
//     });
// }

// fetchPost();
