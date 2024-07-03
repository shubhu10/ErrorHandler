let btn = document.querySelector("button");
let form = document.querySelector("form"); 

btn.addEventListener("click", (event) => {    event.preventDefault(); 
    if (confirm("Are you sure you want to delete this chat?")) {
        // window.location.href = "http://";
        form.submit();
        console.log("yes");
    } else {
        window.location.replace("http://www.w3schools.com/"); // Fixed missing parenthesis
        console.log("no");
    }
});