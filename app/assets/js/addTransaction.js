function onLoadBody() {
  const user = JSON.parse(localStorage.getItem("user"));
  const element = document.getElementById("username");
  element.innerHTML = `${user.first_name} ${user.sourname}`;
}

function addTransaction(form) {
    //NewTransaction(userId: Int!, transaction: TransactionInput!) : Transaction
  const user = JSON.parse(localStorage.getItem("user"));
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
            NewTransaction(userId: ${user.user_id}, transaction: { amount: ${amount}, type: ${type} }) { 
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
