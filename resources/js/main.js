// services data (unchanged)
const services = [
  { id: 1, name: "Dry Cleaning", price: 200 },
  { id: 2, name: "Wash & Fold", price: 100 },
  { id: 3, name: "Ironing", price: 30 },
  { id: 4, name: "Stain Removal", price: 500 },
  { id: 5, name: "Leather & Suede Cleaning", price: 999 },
  { id: 6, name: "Wedding Dress Cleaning", price: 2800 }
];

let cart = [];

// get serviceList container
const serviceList = document.getElementById("serviceList");

// show message when cart empty
function displayCartMessage(){
  const container = document.getElementById("container");
  let messageEl = document.getElementById("cartMessage");

  if(cart.length === 0){
    if(!messageEl){
      messageEl = document.createElement("h4");
      messageEl.id = "cartMessage";
      messageEl.className = "cartMessage";
      container.insertBefore(messageEl, container.firstChild);
    }
    messageEl.textContent = "Add items to cart";
    messageEl.style.color = "#ff5b5b";
    messageEl.style.textAlign = "center";
    messageEl.style.marginBottom = "20px";
    messageEl.style.fontWeight = "bold";
  } else {
    if(messageEl){
      messageEl.remove();
    }
  }
}

window.addEventListener('DOMContentLoaded', function(){
  displayCartMessage();
});

// create service list with icons and proper structure
services.forEach(service => {
  const div = document.createElement("div");
  div.className = "service-item";

  // left group (icon + name)
  const leftGroup = document.createElement("div");
  leftGroup.className = "service-left";

  const icon = document.createElement("img");
  icon.className = "service-icon";

  // Assign correct icon based on service id
  switch (service.id) {
    case 1:
      icon.src = "https://img.icons8.com/stickers/100/drying-clothes.png";
      break;
    case 2:
      icon.src = "https://img.icons8.com/color/48/wash-by-hand.png";
      break;
    case 3:
      icon.src = "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-iron-sewing-icongeek26-linear-colour-icongeek26.png";
      break;
    case 4:
      icon.src = "https://img.icons8.com/dusk/64/dirty-clothes.png";
      break;
    case 5:
      icon.src = "https://img.icons8.com/fluency/48/leather.png";
      break;
    case 6:
      icon.src = "https://img.icons8.com/dotty/80/wedding-dress.png";
      break;
    default:
      icon.src = "";
  }

  // ensure reasonable size (can be overridden by CSS)
  icon.width = 40;
  icon.height = 40;
  icon.alt = service.name + " icon";

  const nameWrap = document.createElement("div");
  nameWrap.className = "service-name-wrap";

  const name = document.createElement("h3");
  name.className = "service-name";
  name.textContent = service.name;

  // optional small subtitle (if needed)
  const subtitle = document.createElement("div");
  subtitle.className = "service-subtitle";
  // leave empty by default; if you want small text below name, set subtitle.textContent = "some text";

  nameWrap.appendChild(name);
  nameWrap.appendChild(subtitle);

  leftGroup.appendChild(icon);
  leftGroup.appendChild(nameWrap);

  // right group (price + button)
  const rightGroup = document.createElement("div");
  rightGroup.className = "service-right";

  const pricespan = document.createElement("span");
  pricespan.className = "price";
  pricespan.textContent = "₹" + service.price;

  const button = document.createElement("button");
  button.textContent = "Add item";
  button.className = "btn add";
  button.id = "btn" + service.id;

  button.onclick = function () {
    addtocart(service.id);
  };

  rightGroup.appendChild(pricespan);
  rightGroup.appendChild(button);

  // assemble row
  div.appendChild(leftGroup);
  div.appendChild(rightGroup);

  serviceList.appendChild(div);
});

function addtocart(id){
  let foundservice = null;
  services.forEach(service=>{
    if(service.id===id){
      foundservice = service;
    }
  });

  if(!foundservice) return;

  let incart = false;
  cart.forEach(item=>{
    if(item.id===id){
      incart = true;
    }
  });

  if(!incart){
    cart.push(foundservice);
  }

  updatecart();
  togglebutton(id,true);
}

function removecart(id){
  let newcart=[];
  for(let i=0;i<cart.length;i++){
    if(cart[i].id!==id){
      newcart.push(cart[i]);
    }
  }
  cart=newcart;

  updatecart();
  togglebutton(id,false);
}

function togglebutton(id,isadded){
  const bt = document.getElementById("btn"+id);
  if(bt==null) return;
  if(isadded){
    bt.textContent="Remove Item";
    bt.classList.add("remove");
    bt.classList.remove("add");
    bt.onclick=function(){ removecart(id); }
  }
  else{
    bt.textContent="Add Item";
    bt.classList.add("add");
    bt.classList.remove("remove");
    bt.onclick=function(){ addtocart(id); }
  }
}

function updatecart(){
  const cartbody = document.getElementById("cartBody");
  const totalamount = document.getElementById("totalAmount");

  cartbody.innerHTML = "";
  let total = 0;

  cart.forEach(item=>{
    total = total + item.price;
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = item.id;

    const td2 = document.createElement("td");
    td2.textContent = item.name;

    const td3 = document.createElement("td");
    td3.textContent = "₹" + item.price;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    cartbody.appendChild(tr);
  });

  totalamount.textContent = "₹" + total;
  displayCartMessage();
}

function sendemails(){
  if(cart.length === 0){
    alert("Please add items to cart");
    return;
  }

  const templateParam = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    number: document.querySelector("#number").value
  }

  if(!templateParam.name || !templateParam.email || !templateParam.number){
    alert("Please fill all fields");
    return;
  }

  emailjs.send('service_vvfb85q', 'template_q6dupu2', templateParam).then(
    (response) => {
      alert('Confirmation mail sent successfully');
      document.querySelector("form").reset();
      cart = [];
      updatecart();
    },
    (error) => {
      alert('Failed to send confirmation mail. Please try again.');
    },
  );
}
