const menuBtn = document.querySelector(".menu-button");
const navItems = document.querySelector(".navbar-items");
const addElementList = document.querySelector(".add-element-list");
const addElementBtn = document.querySelector(".add-element-button");
const addItemInput = document.querySelector(".add-item-input");
const lastItemAdded = document.querySelector(".last-item-added");
const completeTaskBtn = document.querySelector(".complete-task-button");
const uncompleteTaskBtn = document.querySelector(".uncomplete-task-button");
const progress = document.querySelector(".progress-bar-filled");
const completedTasksText  = document.querySelector(".completed-tasks");
const totalTasksText  = document.querySelector(".total-tasks");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");



const searchImage = document.querySelector(".search-image");
const slideBtnLeft = document.querySelector(".slidebutton-left");
const slideBtnRight = document.querySelector(".slidebutton-right");
const slideImage = document.querySelector(".slide-images");


let menuOpen = false;


menuBtn.addEventListener("click", () =>{

    if (!menuOpen) {
        navItems.classList.remove("hidden");
        menuOpen = true;
    } else {
        navItems.classList.add("hidden");
        menuOpen = false;
    }

});

const shoppingList = [
    "apples",
    "bread",
    "milk",
    "chocolate",
    "candy"
];

let currentIndex = 0;
addElementBtn.addEventListener("click", () => {
    if (currentIndex < shoppingList.length) {
        let newItem = document.createElement("li");
        newItem.innerHTML = shoppingList[currentIndex];
        addElementList.appendChild(newItem);
        currentIndex++;
    } else {
        alert("no items left to add ")
    }
});

addItemInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter"){
        const newItem = addItemInput.value.trim();
        if (newItem !== "") {
            let newListItem = document.createElement("li");
            newListItem.innerHTML = newItem;
            addElementList.appendChild(newListItem);// creating a new "li" with the input value as innerHTML
            shoppingList.unshift(newItem); // adding item to the beginning of the list 
            addItemInput.value = ""; 
            currentIndex++;
            
        }
    }
});

let taskArray = []

let taskListLength = taskArray.length;

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
       const newTask = taskInput.value.trim();
       if (newTask !== "") {
            taskArray.push(newTask);
            taskListLength = taskArray.length;
            totalTasksText.innerHTML = taskListLength;
            taskInput.value = "";
            console.log(taskArray);
            updateTaskList();
       }
    }
});

function updateTaskList() {
        const newTask = taskArray[taskArray.length - 1];
        let listItem = document.createElement("li");
        listItem.innerHTML = newTask;
        taskList.appendChild(listItem);
};
let num = 0;
completeTaskBtn.addEventListener("click", () => {
    if (taskListLength > num) {
        completedTasksText.innerHTML = num += 1;
        progress.style.flexBasis = `${(num/taskListLength)*100}%`
    } else if(num == taskListLength && num > 0) {
        alert("all tasks are completed");
    } else {
        alert("there are no tasks to do")
    }
});

uncompleteTaskBtn.addEventListener("click", () => {
    if (taskListLength > 0) {
        if (num > 0) {
            num--;
        }

        taskArray.pop();
        taskList.removeChild(taskList.lastElementChild);
        taskListLength = taskArray.length;

        totalTasksText.innerHTML = taskListLength; 
        
        progress.style.flexBasis = `${(num / taskListLength) * 100}%`;

        // Update the displayed number of completed tasks
        completedTasksText.innerHTML = num;

        // Check if all tasks are completed
       if (num === 0) {
        progress.style.flexBasis = "0%"
       }
    } else {
        alert("There are no tasks to remove");
    }
});

let imageArray = [
    "images/50-Cent-profile.jpeg",
    "images/concert-banner.jpg",
    "images/candy-shop-cover.jpg",
    "images/baby-by-me-cover.jpg",
    "images/in-da-club-cover.jpg"
];

let currentImageIndex = 0;
slideImage.src = imageArray[currentImageIndex];

searchImage.addEventListener("keypress", (event) => {
    if(event.key === "Enter" && searchImage.value !== "") {
        imageArray.push(searchImage.value);
        searchImage.value = "";
        slideImage.src = imageArray[currentImageIndex];
        currentImageIndex++;
        console.log("search if")
    } else {
        alert("You have to enter a source first!");
        console.log("search else")
    }
});

slideBtnLeft.addEventListener("click", () => {
    if (currentImageIndex !== 0) {
        currentImageIndex--;
        slideImage.src = imageArray[currentImageIndex];
        console.log("left if")
    } else if (imageArray.length === 0) {
        alert("Add some images first")
    } else {
        currentImageIndex = imageArray.length -1;
        slideImage.src = imageArray[currentImageIndex];
        console.log("left else")
    }
})

slideBtnRight.addEventListener("click", () => {
    if (currentImageIndex !== imageArray.length -1) {
        currentImageIndex++;
        console.log("right if")
    } else if (imageArray.length === 0) {
        alert("Add some images first")
    } else {
        currentImageIndex = 0;
        console.log("right else")
    }
    slideImage.src = imageArray[currentImageIndex];
})

