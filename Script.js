let cart = [];

function toggleItem(btn, name, price) {
  const index = cart.findIndex(item => item.name === name);

  if (index === -1) {
    // ADD ITEM
    cart.push({ name, price });
    btn.innerText = "Remove Item";
    btn.classList.remove("add");
    btn.classList.add("remove");
  } else {
    // REMOVE ITEM
    cart.splice(index, 1);
    btn.innerText = "Add Item";
    btn.classList.remove("remove");
    btn.classList.add("add");
  }

  renderCart();
}

function renderCart() {
  const cartBody = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    cartBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
      </tr>
    `;
  });

  totalEl.innerText = `₹${total}`;
}
function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const successMsg = document.getElementById("success-msg");

  if (!name || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  if (cart.length === 0) {
    alert("Please add at least one service");
    return;
  }

  // format services list
  let services = cart.map(
    (item, i) => `${i + 1}. ${item.name} - ₹${item.price}`
  ).join("\n");

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  const templateParams = {
    user_name: name,
    user_email: email,
    user_phone: phone,
    services: services,
    total_amount: total
  };

  emailjs.send(
    "service_r5wej5o",
    "template_pc6wu59",
    templateParams
  )
  .then(() => {
    successMsg.style.display = "block";
    successMsg.innerText =
      "Thank you For Booking the Service. We will get back to you soon!";
  })
  .catch(error => {
    alert("Email failed to send");
    console.error(error);
  });
}

//login model
function openModal() {
  document.getElementById("authModal").style.display = "flex";
  showLogin();
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

/* Close modal on outside click */
window.addEventListener("click", function (e) {
  const modal = document.getElementById("authModal");
  if (e.target === modal) {
    closeModal();
  }
});

