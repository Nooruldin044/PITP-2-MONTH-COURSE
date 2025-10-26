  // Add new task
    function addTask() {
      const input = document.getElementById("taskInput");
      const taskText = input.value.trim();

      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      const li = document.createElement("li");
      li.textContent = taskText;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.className = "remove-btn";
      removeBtn.onclick = function() {
        li.remove();
      };

      li.appendChild(removeBtn);
      document.getElementById("taskList").appendChild(li);

      input.value = "";
    }

    // Change background color
    function changeBackground() {
      const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
      document.body.style.backgroundColor = randomColor;
    }