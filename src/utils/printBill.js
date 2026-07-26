export function printBill(sale) {

  const win = window.open("", "_blank", "width=420,height=700");

  if (!win) {
    alert("Popup blocked. Please allow popups.");
    return;
  }

  win.document.write(`
<!DOCTYPE html>
<html>

<head>

<title>${sale.billNo}</title>

<style>

body{
font-family:Arial,sans-serif;
width:58mm;
margin:auto;
padding:15px;
font-size:13px;
color:#000;
}

h2{
margin:0;
text-align:center;
}

.center{
text-align:center;
}

hr{
border:none;
border-top:1px dashed #555;
margin:10px 0;
}

.row{
display:flex;
justify-content:space-between;
margin:4px 0;
}

.total{
font-size:18px;
font-weight:bold;
}

</style>

</head>

<body>

<h2>🌿 PBL PLANTS</h2>

<div class="center">

Walk-in Customer Bill

</div>

<hr>

<div><b>Bill :</b> ${sale.billNo}</div>

<div><b>Date :</b> ${new Date().toLocaleString("en-IN")}</div>

${sale.customerName ? `<div><b>Customer :</b> ${sale.customerName}</div>` : ""}

${sale.phone ? `<div><b>Phone :</b> ${sale.phone}</div>` : ""}

<hr>

${sale.items.map(item => `

<div>

<div>${item.name}</div>

<div class="row">

<span>${item.qty} × ₹${item.price}</span>

<b>₹${item.qty * item.price}</b>

</div>

</div>

`).join("")}

<hr>

<div class="row">

<span>Subtotal</span>

<span>₹${sale.subtotal}</span>

</div>

<div class="row">

<span>Discount</span>

<span>₹${sale.discount}</span>

</div>

<div class="row total">

<span>TOTAL</span>

<span>₹${sale.finalTotal}</span>

</div>

<hr>

<div>

Payment :
<b>${sale.paymentMode}</b>

</div>

<hr>

<div class="center">

🌿 Thank You 🌿

<br>

Visit Again

</div>

<script>

window.onload=function(){

window.print();

setTimeout(()=>{

window.close();

},500);

}

</script>

</body>

</html>

`);

  win.document.close();

}