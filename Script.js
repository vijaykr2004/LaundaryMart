/* ==========================
   MODAL LOGIN / SIGNUP
========================== */
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("authModal");
const closeModalBtn = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalTagline = document.getElementById("modalTagline");
const modalBtn = document.getElementById("modalBtn");
const switchText = document.getElementById("switchText");

let isLogin = true;

loginBtn.addEventListener("click", () => {
  modal.classList.add("active");
  showLogin();
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("active");
});

function toggleAuthMode() {
  isLogin = !isLogin;
  isLogin ? showLogin() : showSignup();
}

function showLogin() {
  modalTitle.innerText = "Welcome Back";
  modalTagline.innerText = "Login to LaundryMart";
  modalBtn.innerText = "Login";

  switchText.innerHTML = `Don’t have an account? <span id="switchBtn">Sign Up</span>`;
  bindSwitch();
}

function showSignup() {
  modalTitle.innerText = "Create Account";
  modalTagline.innerText = "Join LaundryMart Today";
  modalBtn.innerText = "Sign Up";

  switchText.innerHTML = `Already have an account? <span id="switchBtn">Login</span>`;
  bindSwitch();
}

function bindSwitch() {
  const switchBtn = document.getElementById("switchBtn");
  switchBtn.addEventListener("click", toggleAuthMode);
}


/* ==========================
   CART SYSTEM
========================== */
let cart = [];

function toggleItem(btn, name, price) {
  const index = cart.findIndex(item => item.name === name);

  if (index === -1) {
    cart.push({ name, price });
    btn.innerText = "Remove";
    btn.classList.remove("add");
    btn.classList.add("remove");
  } else {
    cart.splice(index, 1);
    btn.innerText = "Add";
    btn.classList.remove("remove");
    btn.classList.add("add");
  }

  updateCart();
}

function updateCart() {
  const cartBody = document.getElementById("cartBody");
  const totalPrice = document.getElementById("totalPrice");

  cartBody.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
    `;
    cartBody.appendChild(row);
  });

  totalPrice.innerText = `₹${total}`;
}


/* ==========================
   EMAILJS BOOKING
========================== */
const bookBtn = document.getElementById("bookBtn");

if(bookBtn){
  bookBtn.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!name || !email || !phone) {
      // alert("Please fill all details!");
        const successMsg = document.getElementById("successMsg");
        const errorMsg = document.getElementById("errorMsg");

        successMsg.style.display = "none";

        errorMsg.style.display = "block";
        errorMsg.innerText = "Please fill all details!";

        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 4000);
    }

    if (cart.length === 0) {
      // alert("Please add at least one service!");
     
      const successMsg = document.getElementById("successMsg");
      const errorMsg = document.getElementById("errorMsg");

      successMsg.style.display = "none";

      errorMsg.style.display = "block";
      errorMsg.innerText = "Please add at least one service!";

      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 4000);

return;


      return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const templateParams = {
      user_name: name,
      user_email: email,
      user_phone: phone,
      services: cart.map(item => `${item.name} - ₹${item.price}`).join(", "),
      total_price: `₹${total}`
    };

    emailjs.send("service_r5wej5o", "template_pc6wu59", templateParams)
      .then(() => {
        // alert("Booking Successful! Confirmation email sent ✅");
        const successMsg = document.getElementById("successMsg");
          successMsg.style.display = "block";
          successMsg.innerText = "Booking Successful! Confirmation email sent ✅";

          setTimeout(() => {
            successMsg.style.display = "none";
          }, 4000);

        cart = [];
        updateCart();

        document.querySelectorAll(".btn.remove").forEach(btn => {
          btn.innerText = "Add";
          btn.classList.remove("remove");
          btn.classList.add("add");
        });

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
      })
      .catch(() => {
        // alert("Booking failed. Please try again ❌");
        const successMsg = document.getElementById("successMsg");
        const errorMsg = document.getElementById("errorMsg");

        successMsg.style.display = "none";

        errorMsg.style.display = "block";
        errorMsg.innerText = "Please fill all details!";

        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 4000);
      });
  });
}
