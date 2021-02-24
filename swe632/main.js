purchases = [];

listField = document.getElementById('purchasesField');

purchaseButton = document.getElementById('purchaseSubmit');
purchaseButton.onclick = function(){
form = document.getElementById("new_purchase");
vendor = form.elements[0].value;
cost = form.elements[1].value;
category = form.elements[2].value;
description = form.elements[3].value;
cost = parseFloat(cost);
if(!isNaN(cost)){
    purchases.push(Purchase(vendor, cost, category, description))
    listField.innerHTML=buildTable(purchases);
}
}



/*THIS CODE TAKEN FROM MY CS321 PROJECT*/

function Purchase(vendor, cost, category, description){
    purchase = {};
    purchase.vendor = vendor;
    purchase.cost = cost;
    purchase.category = category;
    purchase.description = description;
    return purchase;
}

function buildTable(purchases){
  finalStr = "<tr>\n<th>Vendor</th><th>Cost</th><th>Category</th><th>Description</th></tr>";
  for(i=0;i<purchases.length;i++){
    purchase = purchases[i];
    newline = "<tr>";
    newline += "<td>";
    newline += purchase.vendor;
    newline += "</td>\n";
    //Newline:   vendor__________(fixed length)
    newline += "<td>$";
    newline += purchase.cost.toFixed(2);
    newline += "</td>";
    // Vendor___________$XX.XX___________
    newline += "<td>";
    newline += purchase.category;
    newline += "</td>";
    // Vendor__________$XX.XX_________Category___________
    newline+="<td>";
    newline+=purchase.description;
    newline+="</td>\n</tr>";
    finalStr+=newline;
  } //close for purchase in purchases
  return finalStr;
}
