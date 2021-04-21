purchases = [];
amountSpent = 0;
totalBudget = 100;
down_arrow = '↓';
up_arrow = '↑';
defaultSort = true;
listField = document.getElementById('purchasesField');
remainingBudgetField = document.getElementById('remaining_budget');
totalBudgetField = document.getElementById('total_budget');
amountSpentField = document.getElementById('amount_spent');
formError = document.getElementById("form_error")
budgetError = document.getElementById("budget_error")
detailsForm = document.getElementById('detailsPageForm');
purchaseButton = document.getElementById('purchaseSubmit');
spendingInfo = document.getElementById('spending_info');
timeSort = document.getElementById('time_button');
costSort = document.getElementById('cost_button');
categorySort = document.getElementById('category_button');
vendorSort = document.getElementById('vendor_button');
timeSortMain = document.getElementById('time_button_main');
vendorSortMain = document.getElementById('vendor_button_main');
costSortMain = document.getElementById('cost_button_main');
categorySortMain = document.getElementById('category_button_main');
sortedPurchasesField = document.getElementById('sorted_purchasesField');
detailsButton = document.getElementById('detailsPage');
resetButton = document.getElementById('reset')


purchaseButton.onclick = function(){
form = document.getElementById("new_purchase");
vendor = form.elements[0].value;
cost = form.elements[1].value;
category = form.elements[2].value;
description = form.elements[3].value;
for(i=0;i<=3;i++){
  form.elements[i].value = ""
}
if(cost.charAt(0) == '$'){
  cost = cost.replace('$', '');
}
cost = parseFloat(cost);
budgetChanged = 0
formChanged = 0
curSort = "time"
timeSortMain.style.fontWeight = 'bold'
if(!isNaN(cost)){
    addPurchase(Purchase(vendor, cost, category, description))
    if(timeSortMain.style.fontWeight == 'bold') listField.innerHTML=buildTable(purchases);
    else if(costSortMain.style.fontWeight == 'bold') listField.innerHTML = buildTable(getSorted(sortByCost));
    else if(categorySortMain.style.fontWeight == 'bold') listField.innerHTML = buildTable(getSorted(sortByCategory));
    else if(vendorSortMain.style.fontWeight == 'bold') listField.innerHTML = buildTable(getSorted(sortByVendor));
    amountSpent+=cost;
    amountSpentField.innerHTML = "Amount spent: $"+Math.abs(amountSpent).toFixed(2);
    if(totalBudget-amountSpent < 0){
      remainingBudgetField.classList.add("overBudget")
      remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2)+" over budget.";
    } else {
      if(remainingBudgetField.classList.contains("overBudget")) remainingBudgetField.classList.remove("overBudget")
      remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2);
    }
} else {
    formError.innerHTML = "Error: Cost must be a number. Try again."
    console.log("hi")
    formChanged+=1

    setTimeout(function(){
      if(formChanged == 1){
        formError.innerHTML = "<br>"
        formChanged = 0
      } else {
        formChanged-=1
      }
    }, 5000)
}
}

resetButton.onclick = function(){
  if(confirm("Reset page? This cannot be undone.")){
    while(purchases.length > 0){
      removePurchase(0)
    }
    totalBudget = 100
    amountSpentField.innerHTML = "Amount spent: $0.00"
    totalBudgetField.innerHTML = "Total budget: $100.00";
    remainingBudgetField.innerHTML = "$100.00"
  }
}

purchaseButton = document.getElementById('budgetSubmit');
purchaseButton.onclick = function(){
  form = document.getElementById("edit_budget");
  new_budget = parseFloat(form.elements[0].value);
  form.elements[0].value = ""
  if(!isNaN(new_budget)){
    totalBudget = new_budget;
    amountSpentField.innerHTML = "Amount spent: $"+amountSpent.toFixed(2);

    if(totalBudget-amountSpent < 0){
      remainingBudgetField.classList.add("overBudget")
      remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2)+" over budget.";
    } else {
      if(remainingBudgetField.classList.contains("overBudget")) remainingBudgetField.classList.remove("overBudget")
      remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2);
    }
    totalBudgetField.innerHTML = "Total budget: $"+Math.abs(totalBudget).toFixed(2);
    budgetError.classList.remove("error")
    budgetError.classList.add("success")
    budgetError.innerHTML = "Budget successfully updated!"
  } else {
    budgetError.classList.remove("success")
    budgetError.classList.add("error")
    budgetError.innerHTML = "Error: Budget must be a number. Try again."
    setTimeout(function(){
        budgetError.innerHTML = "<br>"
      }, 5000)
  }
}
costSortMain.onclick = function(){
  default_button_texts();
  if(costSortMain.style.fontWeight == 'bold'){
    if(defaultSort){
      defaultSort = false;
      listField.innerHTML=buildTable(reverse(getSorted(sortByCost)));
      costSortMain.innerHTML = 'Cost '+up_arrow
    } else {
      defaultSort = true;
      purchasesField.innerHTML=buildTable(getSorted(sortByCost));
      costSortMain.innerHTML = 'Cost '+down_arrow
    }
  }else{
    defaultSort = true;
    purchasesField.innerHTML=buildTable(getSorted(sortByCost));
    costSortMain.innerHTML = 'Cost '+down_arrow
    costSortMain.style.fontWeight = 'bold'
    vendorSortMain.style.fontWeight = 'normal'
    categorySortMain.style.fontWeight= 'normal'
    timeSortMain.style.fontWeight = 'normal'
    curSort = "cost"
  }
}
vendorSortMain.onclick = function(){
  default_button_texts();
  if(vendorSortMain.style.fontWeight == 'bold'){
    if(defaultSort){
      defaultSort = false;
      listField.innerHTML=buildTable(reverse(getSorted(sortByVendor)));
      vendorSortMain.innerHTML = 'Vendor '+up_arrow
    } else {
      defaultSort = true;
      purchasesField.innerHTML=buildTable(getSorted(sortByVendor));
      vendorSortMain.innerHTML = 'Vendor '+down_arrow
    }
  }else{
    costSortMain.style.fontWeight = 'normal'
    vendorSortMain.style.fontWeight = 'bold'
    categorySortMain.style.fontWeight= 'normal'
    timeSortMain.style.fontWeight = 'normal'
    defaultSort = true;
    vendorSortMain.innerHTML = 'Vendor '+down_arrow
    purchasesField.innerHTML=buildTable(getSorted(sortByVendor));
    curSort = "vendor"
  }
}
categorySortMain.onclick = function(){
  default_button_texts();
  if(categorySortMain.style.fontWeight == 'bold'){
    if(defaultSort){
      defaultSort = false;
      listField.innerHTML=buildTable(reverse(getSorted(sortByCategory)));
      categorySortMain.innerHTML = 'Category '+up_arrow
    } else {
      defaultSort = true;
      listField.innerHTML=buildTable(getSorted(sortByCategory));
      categorySortMain.innerHTML = 'Category '+down_arrow
    }
  }else{
    costSortMain.style.fontWeight = 'normal'
    vendorSortMain.style.fontWeight = 'normal'
    categorySortMain.style.fontWeight= 'bold'
    defaultSort = true;
    listField.innerHTML=buildTable(purchases);
    categorySortMain.innerHTML = 'Category '+down_arrow
    timeSortMain.style.fontWeight = 'normal'
    curSort = "category"
  }
}
timeSortMain.onclick = function(){
  default_button_texts();
  if(timeSortMain.style.fontWeight == 'bold'){
    if(defaultSort){
      defaultSort = false;
      listField.innerHTML=buildTable(reverse(purchases));
      timeSortMain.innerHTML = 'Time '+up_arrow
    } else {
      defaultSort = true;
      listField.innerHTML=buildTable(purchases);
      timeSortMain.innerHTML = 'Time '+down_arrow
    }
  }else{
    costSortMain.style.fontWeight = 'normal'
    vendorSortMain.style.fontWeight = 'normal'
    timeSortMain.style.fontWeight = 'bold'
    categorySortMain.style.fontWeight= 'normal'
    defaultSort = true;
    listField.innerHTML=buildTable(purchases);
    timeSortMain.innerHTML = 'Time '+down_arrow
    curSort = "time"
  }
}

function default_button_texts(){
  costSortMain.innerHTML = "Cost"
  vendorSortMain.innerHTML = "Vendor"
  timeSortMain.innerHTML = "Time"
  categorySortMain.innerHTML = "Category"
}

function swapToDetails(){
  (document.getElementById('main_left')).style.display = 'none';
  (document.getElementById('main_right')).style.display = 'none';
  (document.getElementById('details_left')).style.display = 'block';
  (document.getElementById('main_right')).style.display = 'block';
  //(document.getElementById('details_right')).style.display = 'block';
  spendingInfo.innerHTML = calculatePercentages(purchases);
  detailsButton.onclick = swapToMain;
  detailsButton.innerHTML = "Back to Main"
}
function swapToMain(){
  (document.getElementById('main_left')).style.display = 'block';
  (document.getElementById('main_right')).style.display = 'block';
  (document.getElementById('details_left')).style.display = 'none';
  (document.getElementById('details_right')).style.display = 'none';
  detailsButton.onclick = swapToDetails;
  detailsButton.innerHTML = "Details"
}


detailsButton.onclick = function(){
  swapToDetails();
}

mainPageButton = document.getElementById('mainPage');
mainPageButton.onclick = function(){
  swapToMain();
}

function addPurchase(purchase){
  purchase.button = "<button onclick=\"removePurchase("+purchases.length+")\">Remove</button>"
  purchases.push(purchase)
}

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




spendingInfo = document.getElementById('spending_info');
spendingInfo.innerHTML = calculatePercentages(purchases);
console.log("done")
/*THIS CODE TAKEN FROM MY CS321 PROJECT*/

function removePurchase(index){
  removed = null
  if(index < purchases.length) removed = purchases.splice(index, 1)
  amountSpent-=removed[0].cost
  amountSpentField.innerHTML = "Amount spent: $"+amountSpent.toFixed(2);

  if(totalBudget-amountSpent < 0){
    remainingBudgetField.classList.add("overBudget")
    remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2)+" over budget.";
  } else {
    if(remainingBudgetField.classList.contains("overBudget")) remainingBudgetField.classList.remove("overBudget")
    remainingBudgetField.innerHTML = "$"+Math.abs((totalBudget-amountSpent)).toFixed(2);
  }
  totalBudgetField.innerHTML = "Total budget: $"+Math.abs(totalBudget).toFixed(2);
  for(i=0;i<purchases.length;i++){
    purchases[i].button = "<button onclick=\"removePurchase("+i+")\">Remove</button>"
  }
  if(timeSortMain.style.fontWeight == 'bold') listField.innerHTML=buildTable(purchases);
  else if(costSortMain.style.fontWeight == 'bold') listField.innerHTML = buildTable(getSorted(sortByCost));
  else if(categorySortMain.style.fontWeight == 'bold') listField.innerHTML = buildTable(getSorted(sortByCategory));
  else if(vendorSortMain.style.fontWeight == 'bold') listField.innerHTML = buildTable(getSorted(sortByVendor));
}

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

function reverse(purchases){
  rev = []
  for(i=purchases.length-1;i>=0;i--){
    rev.push(purchases[i])
  }
  return rev
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
    newline += "<td>";
    newline += purchase.description;
    newline += "</td>";

    newline+="<td>";
    newline+=purchase.button;
    newline+="</td>\n</tr>";
    finalStr+=newline;
  } //close for purchase in purchases
  return finalStr;
}
