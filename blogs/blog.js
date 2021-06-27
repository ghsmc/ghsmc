function password() {
    var password = "gmblogs";
    input = prompt("what's the password to access these blogs?");
    if(input == password) {
        var element = document.getElementById("all");
        element.classList.remove("tobehidden");
    } else {
        alert("You entered the wrong password. Click 'OK' to try again.")
        location.reload();
    }
  
}

