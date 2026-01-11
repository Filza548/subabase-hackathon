
// import supabase from "./config.js";

//         const title = document.getElementById('titleInput');
//         // const proPrice = document.getElementById('priceInput');
//         // const addcolour = document.getElementById('addcolour');
     
//         const image = document.getElementById('imageInput');
//         const description = document.getElementById('description');
//         const saveBtn = document.getElementById('saveBtn');


// // Save product to Supabase
// saveBtn.addEventListener('click', async () => {


//   // 1️⃣ Get logged-in user
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     alert("Please login first");
//     return;
//   }


    
//     const file = image.files[0];
//     const fileName = `${Date.now()}-${file.name}`;

//     // Upload image
//     const { data: uploadData, error: uploadError } = await supabase
//         .storage
//         .from('postimg')
//         .upload(fileName, file);

//     if (uploadError) return console.log(uploadError);
//     if (uploadData) {
//         console.log(uploadData);

//     }

//     // Get public URL
//     const { data: publicData } = supabase
//         .storage
//         .from('postimg')
//         .getPublicUrl(fileName);

//     const imgUrl = publicData.publicUrl;






//     // Insert into database
//     const { error: insertError } = await supabase
//         .from('postapp')
//         .insert({
//             titlepost: title.value,
//             postimgUrl: imgUrl,
//             postdes: description.value,
//                 user_id: user.id,
//                 // username:user.name,
//                  userprofile:proimgUrl,

//         });

//     if (insertError) console.log(insertError);
//     else alert("Product Added!");
//     window.location.href = "showprod.html"
// });

















// import supabase from "./config.js";

// const title = document.getElementById('titleInput');
// const description = document.getElementById('description');
// const image = document.getElementById('imageInput');
// const profileImgInput = document.getElementById('profileimg'); // optional, if user wants to update profile while posting
// const saveBtn = document.getElementById('saveBtn');

// saveBtn.addEventListener('click', async () => {
//   // 1️⃣ Get logged-in user
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) {
//     alert("Please login first");
//     return;
//   }

//   // 2️⃣ Get user's profile image (from metadata) or uploaded new one
//   let proimgUrl = user.user_metadata?.profile_url || "https://i.pravatar.cc/100";

//   const newProfileFile = profileImgInput?.files[0];
//   if (newProfileFile) {
//     const profFileName = `${Date.now()}-${newProfileFile.name}`;
//     const { error: profUploadError } = await supabase.storage
//       .from('profileimg')
//       .upload(profFileName, newProfileFile);

//     if (!profUploadError) {
//       const { data: publicProfData } = supabase.storage
//         .from('profileimg')
//         .getPublicUrl(profFileName);
//       proimgUrl = publicProfData.publicUrl;

//       // Optionally update user metadata with new profile
//       await supabase.auth.updateUser({
//         data: { profile_url: proimgUrl }
//       });
//     }
//   }

//   // 3️⃣ Upload post image
//   const file = image.files[0];
//   if (!file) return alert("Please select a post image");

//   const fileName = `${Date.now()}-${file.name}`;
//   const { data: uploadData, error: uploadError } = await supabase.storage
//       .from('postimg')
//       .upload(fileName, file);

//   if (uploadError) return console.log(uploadError);

//   const { data: publicData } = supabase.storage
//       .from('postimg')
//       .getPublicUrl(fileName);
//   const imgUrl = publicData.publicUrl;

//   // 4️⃣ Insert post into database with owner info
//   const { error: insertError } = await supabase
//       .from('postapp')
//       .insert([{
//           titlepost: title.value,
//           postdes: description.value,
//           postimgUrl: imgUrl,
//           user_id: user.id,
//           username: user.user_metadata?.name || "User",
//           profileimg: proimgUrl
//       }]);

//   if (insertError) {
//     console.log(insertError);
//     alert("Failed to add post!");
//   } else {
//     alert("Product Added!");
//     window.location.href = "showprod.html";
//   }
// });




















// import supabase from "./config.js";

// const title = document.getElementById("titleInput");
// const description = document.getElementById("description");
// const image = document.getElementById("imageInput");
// const category = document.getElementById("category");
// // const profileImgInput = document.getElementById("profileimg");/ // optional
// const saveBtn = document.getElementById("saveBtn");

// saveBtn.addEventListener("click", async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return alert("Please login first");

//     // Use user's profile from metadata
//     let proimgUrl = user.user_metadata?.profile_url;

//     // Optional: update profile if user uploads a new one while posting
//     // if (image.files[0]) {
//     //     const newProfile = image.files[0];
//     //     const fileName = `${Date.now()}-${newProfile.name}`;
//     //     const { error: uploadError } = await supabase.storage
//     //         .from("profileimg")
//     //         .upload(fileName, newProfile);
//     //     if (!uploadError) {
//     //         const { data: publicData } = supabase.storage
//     //             .from("profileimg")
//     //             .getPublicUrl(fileName);
//     //         proimgUrl = publicData.publicUrl;

//     //         // Update user metadata
//     //         await supabase.auth.updateUser({
//     //             data: { profile_url: proimgUrl }
//     //         });
//     //     }
//     // }

//     // Upload post image
//     const file = image.files[0];
//     console.log(file);
    
//     if (!file) return alert("Please select a post image");

//     const fileName = `${Date.now()}-${file.name}`;
//     const { error: uploadError } = await supabase.storage
//         .from("postimg")
//         .upload(fileName, file);
//     if (uploadError) return console.log(uploadError);

//     const { data: publicData } = supabase.storage
//         .from("postimg")
//         .getPublicUrl(fileName);
//     const imgUrl = publicData.publicUrl;

//     // Insert post with owner info
//     const { error: insertError } = await supabase.from("postapp").insert([{
//         titlepost: title.value,
//         postdes: description.value,
//         postimgUrl: imgUrl,
//         user_id: user.id,
//         category: category.value,
        
//         profileimg: proimgUrl
//     }]);

//     if (insertError) return console.log(insertError);
//     alert("Post added!");
//     window.location.href = "showprod.html";
// });
























import supabase from "./config.js";

const title = document.getElementById("titleInput");
const description = document.getElementById("description");
const image = document.getElementById("imageInput");
const category = document.getElementById("category");
// const profileImgInput = document.getElementById("profileimg"); // optional
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {
    const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return alert("Please login first");

    // Use user's profile from metadata
    let proimgUrl = user.user_metadata?.profile_url;

    // Optional: update profile if user uploads a new one while posting
    // if (image.files[0]) {
    //     const newProfile = image.files[0];
    //     const fileName = `${Date.now()}-${newProfile.name}`;
    //     const { error: uploadError } = await supabase.storage
    //         .from("profileimg")
    //         .upload(fileName, newProfile);
    //     if (!uploadError) {
    //         const { data: publicData } = supabase.storage
    //             .from("profileimg")
    //             .getPublicUrl(fileName);
    //         proimgUrl = publicData.publicUrl;

    //         // Update user metadata
    //         await supabase.auth.updateUser({
    //             data: { profile_url: proimgUrl }
    //         });
    //     }
    // }

    // Upload post image
    const file = image.files[0];
    console.log(file);
    
    if (!file) return alert("Please select a post image");

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
        .from("postimg")
        .upload(fileName, file);
    if (uploadError) return console.log(uploadError);

    const { data: publicData } = supabase.storage
        .from("postimg")
        .getPublicUrl(fileName);
    const imgUrl = publicData.publicUrl;

    // Insert post with owner info
    const { error: insertError } = await supabase.from("postapp").insert([{
        titlepost: title.value,
        postdes: description.value,
        postimgUrl: imgUrl,
        user_id: user.id,
    category: category.value,
    profileimg: proimgUrl
        
        
    }]);

    if (insertError) return console.log(insertError);
    alert("Post added!");
    window.location.href = "index.html";
});
