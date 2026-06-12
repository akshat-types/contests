const cart = [
  { name: "Laptop", price: 80000, qty: 1, category: "electronics" },
  { name: "Mouse", price: 500, qty: 2, category: "electronics" },
  { name: "Shoes", price: 3000, qty: 1, category: "fashion" }
];

const coupons = {
  electronics: 0.10,   // 10% off
  fashion: 0.20        // 20% off
};

amount=0
for(x of cart){
    amount+=(1-coupons[x.category])*x.price
    console.log(amount)
}
console.log(`Total Price: ${amount}`)