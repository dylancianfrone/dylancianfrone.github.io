purchases = [];
amountSpent = 0;
totalBudget = 100;
listField = document.getElementById('purchasesField');
remainingBudgetField = document.getElementById('remaining_budget');
totalBudgetField = document.getElementById('total_budget');
amountSpentField = document.getElementById('amount_spent');

detailsForm = document.getElementById('detailsPageForm');

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
    amountSpent+=cost;
    amountSpentField.innerHTML = "Amount spent: $"+Math.abs(amountSpent).toFixed(2);
    remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2);
}
}

purchaseButton = document.getElementById('budgetSubmit');
purchaseButton.onclick = function(){
  form = document.getElementById("edit_budget");
  new_budget = parseFloat(form.elements[0].value);
  if(!isNaN(new_budget)){
    totalBudget = new_budget;
    amountSpentField.innerHTML = "Amount spent: $"+amountSpent.toFixed(2);
    remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2);
    totalBudgetField.innerHTML = "Total budget: $"+Math.abs(totalBudget).toFixed(2);
  }
}

function swapToDetails(){
  (document.getElementById('main_left')).style.display = 'none';
  (document.getElementById('main_right')).style.display = 'none';
  (document.getElementById('details_left')).style.display = 'block';
  (document.getElementById('details_right')).style.display = 'block';
}
function swapToMain(){
  (document.getElementById('main_left')).style.display = 'block';
  (document.getElementById('main_right')).style.display = 'block';
  (document.getElementById('details_left')).style.display = 'none';
  (document.getElementById('details_right')).style.display = 'none';
}

detailsButton = document.getElementById('detailsPage');
detailsButton.onclick = function(){
  console.log("HEY")
  swapToDetails();
}

mainPageButton = document.getElementById('mainPage');
mainPageButton.onclick = function(){
  swapToMain();
}

sortedPurchasesField = document.getElementById('sorted_purchasesField');

function sortByCost(p1, p2){
  if(p1.cost < p2.cost) return -1;
  else if(p1.cost > p2.cost) return 1;
  return 0;
}

function sortByVendor(p1, p2){
  compare = (p1.vendor.toLowerCase()).localeCompare(p2.vendor.toLowerCase());
  if(compare == 0) return sortByCost(p1, p2);
  else return compare;
}

function sortByCategory(p1, p2){
    return (p1.category.toLowerCase()).localeCompare(p2.category.toLowerCase());
    if(compare == 0) return sortByVendor(p1, p2);
    else return compare;
}

function getSorted(sortFunction){

  if(purchases.length == 0) return [];
  sorted = [];
  for(i=0;i<purchases.length;i++) sorted.push(purchases[i])
  for(i=0;i<sorted.length;i++){
    index = i;
    for(j=i;j<sorted.length;j++){
      if(sortFunction(sorted[index], sorted[j]) < 0){
        index = j;
      }
    }
    tmp = sorted[i];
    sorted[i] = sorted[index];
    sorted[index] = tmp;
  }
  return sorted;
}

costSort = document.getElementById('cost_button');
categorySort = document.getElementById('category_button');
vendorSort = document.getElementById('vendor_button');

costSort.onclick = function(){
  sortedPurchasesField.innerHTML=buildTable(getSorted(sortByCost));
  costSort.style.fontWeight = 'bold'
  vendorSort.style.fontWeight = 'normal'
  categorySort.style.fontWeight= 'normal'
}
vendorSort.onclick = function(){
  costSort.style.fontWeight = 'normal'
  vendorSort.style.fontWeight = 'bold'
  categorySort.style.fontWeight= 'normal'
  sortedPurchasesField.innerHTML=buildTable(getSorted(sortByVendor));
}
categorySort.onclick = function(){
  costSort.style.fontWeight = 'normal'
  vendorSort.style.fontWeight = 'normal'
  categorySort.style.fontWeight= 'bold'
  sortedPurchasesField.innerHTML=buildTable(getSorted(sortByCategory));
}
sortedPurchasesField.innerHTML=buildTable(getSorted(sortByCost));
costSort.style.fontWeight = 'bold'

spendingInfo = document.getElementById('spending_info');
spendingInfo.innerHTML = calculatePercentages(purchases);
console.log("done")
/*THIS CODE TAKEN FROM MY CS321 PROJECT*/

function calculatePercentages(purchases){
  if(purchases.length == 0) return "Make a purchase to see data here.";
  totalSpent = 0;
  categories = {};
  for(i=0;i<purchases.length;i++){
    purchase = purchases[i];
    if(!(purchase.category in categories)){
      categories[purchase.category] = purchase.cost;
    } else {
      //purchase is in category
      categories[purchase.category]+=purchase.cost;
    } //close if purchase in category
    totalSpent+=purchase.cost;
  } //close for all purchases
  str = "You spent ";
  keys = Object.keys(categories);
  if(keys.length == 1) return "You spent 100% on "+keys[0]+".";
  for(i=0;i<keys.length;i++){
    proportion = categories[keys[i]]/totalSpent;
    percent = Math.round(proportion*100);
    if(i == 0 && keys.length == 2) str+=(percent+"% on "+keys[i]+" ");
    else if(i != keys.length-1) str+=(percent+"% on "+keys[i]+", ");
    else str+=("and "+percent+"% on "+keys[i]+".");
  }
  return str;
}

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
