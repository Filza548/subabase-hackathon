

import supabase from "./config.js";

// -------------------------- SIGNUP --------------------------
const signEmail = document.getElementById("signEmail");
const signPass = document.getElementById("signPass");
const userName = document.getElementById("userName");
const signBtn = document.getElementById("signBtn");
const profileimgInput = document.getElementById("profileimg"); // your file input in HTML

signBtn?.addEventListener("click", async (e) => {
    e.preventDefault();



    const email = signEmail.value.trim();
    const password = signPass.value.trim();
    const name = userName.value.trim();

    if (!email || !password || !name) {
        alert("Please fill all fields");
        return;
    }

    // ✅ Signup
    const { data: signData, error: signError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
    });

    if (signError) {
        alert(signError.message);
        return;
    }

    let profileUrl = null;
    const file = profileimgInput?.files[0];
    if (file) {
        const fileName = `${Date.now()}-${file.name}`;

        // Upload profile image to Supabase storage
        const { error: uploadError } = await supabase.storage
            .from("profileimg")
            .upload(fileName, file);

        if (uploadError) {
            alert("Profile image upload failed");
            console.log(uploadError);
            return;
        }

        // Get public URL
        const { data: publicData } = supabase.storage
            .from("profileimg")
            .getPublicUrl(fileName);

        profileUrl = publicData.publicUrl;

        // Update user metadata with profile image
        await supabase.auth.updateUser({
            data: { name, profile_url: profileUrl }
        });
    }

    alert("Signup successful!");
    window.location.href = "addpost.html";
});

// -------------------------- LOGIN --------------------------
const userEmail = document.getElementById("inputEmail");
const userPass = document.getElementById("inputpass");
const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = userEmail.value.trim();
    const password = userPass.value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Login successful!");
    window.location.href = "addpost.html";
});

// -------------------------- LOGOUT --------------------------
const logoutBtn = document.getElementById("logBtn");

logoutBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (!error) {
        alert("Logged out successfully");
        window.location.href = "index.html";
    }
});

// -------------------------- SHOW LOGGED-IN USER PROFILE --------------------------
const profileNameEl = document.getElementById("profileName");
const profileImgEl = document.getElementById("profileImg");

async function showUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (profileNameEl) profileNameEl.textContent = user.user_metadata?.name
    if (profileImgEl) profileImgEl.src = user.user_metadata?.profile_url
}

// Call on page load
showUserProfile();

