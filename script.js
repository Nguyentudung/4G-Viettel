// Bảng giá (từ lớn đến bé)
const priceTable = {
  FreeFire: [
    { amount: 2830, price: 500000 },
    { amount: 1132, price: 200000 },
    { amount: 566, price: 100000 },
    { amount: 283, price: 50000 },
    { amount: 113, price: 20000 },
    { amount: 51,  price: 10000 },
    { amount: 25,  price: 5000 }
  ],
  LienQuan: [
    { amount: 1020, price: 500000 },
    { amount: 408,  price: 200000 },
    { amount: 204,  price: 100000 },
    { amount: 102,  price: 50000 },
    { amount: 40,   price: 20000 },
    { amount: 20,   price: 10000 },
    { amount: 10,   price: 5000 }
  ]
};

const gameSelect = document.getElementById("game");
const totalInput = document.getElementById("total");
const convertBtn = document.querySelector(".convert");
const resultDiv = document.getElementById("result");

// Modal
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

// Khi bấm nút
convertBtn.addEventListener("click", () => {
  const game = gameSelect.value;
  const total = parseInt(totalInput.value);

  const unit = (game === "LienQuan") ? "Quân Huy" : "Kim Cương";

  if (isNaN(total) || total <= 0) {
    resultDiv.innerHTML = `
      <div class="modal-header">Kết quả</div>
      <div class="modal-body"><p style='color:red;text-align:center;'>Vui lòng nhập số hợp lệ!</p></div>
    `;
    modal.style.display = "flex";
    return;
  }

    const table = priceTable[game];
    let remaining = total;
    let totalCost = 0;
    let totalReceived = 0;
    let breakdown = [];
    let extraNote = ""; // Thông báo khi có bù

    for (let pack of table) {
    let count = Math.floor(remaining / pack.amount);
    if (count > 0) {
        breakdown.push(`${count} gói ${pack.amount} ${unit} = ${(count * pack.price).toLocaleString()} VND`);
        totalCost += count * pack.price;
        totalReceived += count * pack.amount;
        remaining -= count * pack.amount;
    }
    }

    // Nếu còn thiếu → thêm 1 gói nhỏ nhất để bù
    if (remaining > 0) {
    const smallestPack = table[table.length - 1];
    breakdown.push(`+ 1 gói ${smallestPack.amount} ${unit} (bù thêm) = ${smallestPack.price.toLocaleString()} VND`);
    totalCost += smallestPack.price;
    totalReceived += smallestPack.amount;

    // Thông báo đặc biệt
    extraNote = `<div style="
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary-color);
        text-align: center;
        margin-top: 1rem;
    ">
        Số ${unit} bạn nhận được là ${totalReceived.toLocaleString()} ${unit}.
    </div>`;
    }

    resultDiv.innerHTML = `
    <div class="modal-header">Kết quả</div>
    <div class="modal-body">
        <div class="total-cost">Tổng tiền: ${totalCost.toLocaleString()} VND</div>
        <ul class="pack-list">${breakdown.map(item => `<li>${item}</li>`).join("")}</ul>
        ${extraNote}
    </div>
    `;

    modal.style.display = "flex";
});

// Đóng modal
closeBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
