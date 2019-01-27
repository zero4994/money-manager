function login(form) {
  console.log(form.l_username.value, form.l_password.value);
  const username = form.l_username.value;
  const password = form.l_password.value;
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
      { 
        LoginUser(username: "${username}", password: "${password}") { 
            user_id
            first_name
            second_name
            sourname
            date_of_birth
        } 
      }
    `
    })
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(
        "the data it responded==>",
        typeof data.data.LoginUser,
        data.data
      );
      if (!data.data.LoginUser) {
        alert("Invalid username or password!!");
      } else {
        localStorage.setItem("user", JSON.stringify(data.data.LoginUser));
        window.location = "routes/dashboard.html";
      }
    })
    .catch(error => {
      console.log(error);
    });
}
