function onEdit(id) {
  console.log(id);
}

function onDelete(id) {
  console.log(id);
}

function populateTable(user) {
  console.log(user);
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
      { 
        TransactionsByUser(userId: ${user.user_id}) { 
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
      console.log("the data it responded==>", data.data);
      const table = document.getElementById("transactionsTable");

      data.data.TransactionsByUser.forEach((element, index) => {
        const row = table.insertRow(index + 1);

        const id = row.insertCell(0);
        const amount = row.insertCell(1);
        const type = row.insertCell(2);
        const date = row.insertCell(3);
        const editTran = row.insertCell(4);
        const deleteTran = row.insertCell(5);

        id.innerHTML = index + 1;
        amount.innerHTML = element.amount;
        type.innerHTML = element.type === 1 ? "Charge" : "Deposit";
        date.innerHTML = element.executed_at;
        editTran.innerHTML = `<button class="btn bg-transparent" onclick="onEdit(${
          element.id
        })"> <i class="fas fa-edit edit-color"></i> </button>`;
        deleteTran.innerHTML = `<button class="btn bg-transparent" onclick="onDelete(${
          element.id
        })"><i class="fas fa-trash-alt delete-color"></i></button>`;
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function greet() {
  const user = JSON.parse(localStorage.getItem("user"));
  //alert(`Welcome back, ${user.first_name}!!`);

  const element = document.getElementById("username");
  element.innerHTML = `${user.first_name} ${user.sourname}`;

  populateTable(user);
}
