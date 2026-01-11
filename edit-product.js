// import supabase from "./config.js";

// const params = new URLSearchParams(window.location.search)
// const productId =  Number(params.get("id"))
// console.log("Product ID:", productId);


// async function getProducts (){
//      const { data, error } = await supabase
//         .from("adminProd")
//         .select("*")
//         .eq("id", productId)
//         .single();
//         if (error){
//             console.log(error);
            
//         }else{
//             console.log(data);
            
//         }
//     document.getElementById("title").value = data.title;
//     document.getElementById("description").value = data.description;
//     document.getElementById("price").value = data.price;
//     document.getElementById("imgUrl").value = data.imgUrl;
// }
// getProducts()



// document.getElementById("updateBtn").addEventListener("click", async () => {
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const price = document.getElementById("price").value;
//     const imgUrl = document.getElementById("imgUrl").value;

//     const { error } = await supabase
//         .from("adminProd")
//         .update({
//             title,
//             description,
//             price,
//             imgUrl
//         })
//         .eq("id", productId);

//     if (!error) {
//         alert("Product Updated Successfully");
//         window.location.href = "admin-products.html";
//     } else {
//         console.log(error);
//     }
// });








// import supabase from "./config.js";


// const params = new URLSearchParams(window.location.search)
// const productId =  Number(params.get("id"))
// console.log("Product ID:", productId);


// async function getProducts() {
//     const { data, error } = await supabase
//         .from("adminProd")
//         .select("*")
//         .eq("id", productId)
//         .maybeSingle(); // 🔥 safer than single

//     if (error || !data) {
//         console.log("Product not found", error);
//         alert("Product not found");
//         // window.location.href = "adminAddpro.html";
//         return;
//     }

//     document.getElementById("title").value = data.title;
//     document.getElementById("description").value = data.description;
//     document.getElementById("price").value = data.price;
//    document.getElementById("previewImg").src = data.imgUrl;
   

// }
// getProducts();



// document.getElementById("updateBtn").addEventListener("click", async () => {

    
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const price = document.getElementById("price").value;

//     const fileInput = document.getElementById("imgFile");
//     console.log(fileInput.files);
    
//     let imgUrl = null;

//     // Agar new image select ki ho
//     if (fileInput.files.length > 0) {
//         const file = fileInput.files[0];

//         const fileName = `${Date.now()}-${file.name}`;

//         const { error: uploadError } = await supabase.storage
//             .from("admin")
//             .upload(fileName, file);

//         if (uploadError) {
//             console.log(uploadError);
//             return;
//         }

//     //   get publbic url

//         const { data } = supabase.storage
//             .from("admin")
//             .getPublicUrl(fileName);

//         imgUrl = data.publicUrl;
//     }

//     const updateData = {
//         title,
//         description,
//         price
//     };

//     // Sirf tab imgUrl update karo jab new image ho
//     if (imgUrl) {
//         updateData.imgUrl = imgUrl;
//     }

//     const { error } = await supabase
//         .from("adminProd")
//         .update(updateData)
//         .eq("id", productId);

//     if (!error) {
//         alert("Product Updated Successfully");
//     } else {
//         console.log(error);
//     }
//     window.location.href = "admin.html"
// });












import supabase from "./config.js";

/* ================= GET PRODUCT ID FROM URL ================= */
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

if (!productId) {
  alert("Invalid Product ID");
  window.location.href = "admin.html";
}

/* ================= FETCH PRODUCT ================= */
async function getProduct() {
  const { data, error } = await supabase
    .from("postapp")
    .select("*")
    .eq("id", productId)
    .maybeSingle();

  if (error || !data) {
    alert("Product not found");
    window.location.href = "admin.html";
    return;
  }

  // Fill form
  document.getElementById("title").value = data.titlepost;
  document.getElementById("description").value = data.postdes;
//   document.getElementById("price").value = data.price;

  const previewImg = document.getElementById("previewImg");
  const placeholderText = document.getElementById("placeholderText");

  previewImg.src = data.postimgUrl;
  previewImg.classList.remove("hidden");
  placeholderText.classList.add("hidden");
}

getProduct();

/* ================= IMAGE PREVIEW ================= */
const imgFile = document.getElementById("imgFile");
const previewImg = document.getElementById("previewImg");
const placeholderText = document.getElementById("placeholderText");

imgFile.addEventListener("change", () => {
  const file = imgFile.files[0];

  if (file) {
    previewImg.src = URL.createObjectURL(file);
    previewImg.classList.remove("hidden");
    placeholderText.classList.add("hidden");
  }
});

/* ================= UPDATE PRODUCT ================= */
document.getElementById("updateBtn").addEventListener("click", async () => {

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
//   const price = document.getElementById("price").value;

  if (!title || !description) {
    alert("Please fill all fields");
    return;
  }

  let imgUrl = null;

  /* ---------- IMAGE UPLOAD (OPTIONAL) ---------- */
  if (imgFile.files.length > 0) {
    const file = imgFile.files[0];
    const fileName = `${Date.now()}-${file.name}`;
// console.log(fileName);

    const { error: uploadError } = await supabase.storage
      .from("postimg")
      .upload(fileName, file);

    if (uploadError) {
      alert("Image upload failed");
      console.log(uploadError);
      return;
    }

    const { data } = supabase.storage
      .from("postimg")
      .getPublicUrl(fileName);

    imgUrl = data.publicUrl;
  }

  /* ---------- UPDATE DATA ---------- */
  const updateData = {
   titlepost: title,
    postdes:description
  };

  if (imgUrl) updateData.postimgUrl = imgUrl;

  const { error } = await supabase
    .from("postapp")
    .update(updateData)
    .eq("id", productId);

  if (error) {
    alert("Update failed");
    console.log(error);
    return;
  }

  alert("Product Updated Successfully");
  window.location.href = "index.html";
});
