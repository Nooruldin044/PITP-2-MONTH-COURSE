// Function change paragraph color
function changeColor() {
  const para = document.getElementById("myPara");
  para.style.color = "green";
}

// Function to show user input in alert
function showAlert(event) {
  event.preventDefault();
  const input = document.getElementById("userInput").value;
  alert("You entered: " + input);
  input.value = ""; 
}
