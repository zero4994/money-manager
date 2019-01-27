function onLoadBody() {
  const user = JSON.parse(localStorage.getItem("user"));
  const element = document.getElementById("username");
  element.innerHTML = `${user.first_name} ${user.sourname}`;

  const transaction = JSON.parse(localStorage.getItem("transaction"));

  const amountElement = document.getElementById("amount");
  amountElement.value = transaction.amount;

  const typeElement = document.getElementById("type");
  typeElement.selectedIndex = transaction.type;
}


function editTransaction(form) {
  const transaction = JSON.parse(localStorage.getItem("transaction"));
  const type = form.type.selectedIndex;
  const amount = parseFloat(form.amount.value);

  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
          mutation { 
            EditTransaction(id: ${transaction.id}, transaction: { amount: ${amount}, type: ${type} }) { 
              id
              acc_num
              amount
              type
              executed_at
            } 
          }
        `
    })
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
        window.location = "dashboard.html";
    })
    .catch(error => {
      console.log(error);
    });
}