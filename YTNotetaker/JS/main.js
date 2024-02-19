//Selectors
let videoUrl = document.querySelector("#video-url");
let watchButton = document.querySelector("#watch-button");
let videoPlayer = document.querySelector("#video-player");

let noteSection = document.querySelector("#note-section");
let noteInput = document.querySelector("#note");
let saveButton = document.querySelector("#save-button");
let notesList = document.querySelector("#notes-list");
let noNotesText = document.querySelector("#no-notes-text")
let errorMessage = document.querySelector("#error-message")


//Event Listening

saveButton.addEventListener("click", function () {

    let note = noteInput.value;
    
    if (note !== "") {

        //Manipulation
        let noteItem = document.createElement ("li");
        noteItem.innerHTML = note;
        noteItem.classList.add("bg-blue-400", "p-3", "text-white", "mt-1");
        notesList.appendChild(noteItem);

        noteInput.value = "";
        noNotesText.style.display = "none";

        errorMessage.innerHTML = ""
        errorMessage.classList.remove("bg-red-500", "p-2", "mb-2")
    } else {
        errorMessage.innerHTML = " Please write a note!";
        errorMessage.classList.add("bg-red-500", "p-2", "mb-2"); 
    } 
});

function extractVideoID(url) {
    // https://www.youtube.com/watch?v=F0D4AcgUrGk
    return url.split("v=")[1].substring(0,11);
}

watchButton.addEventListener("click", function() {
    let url = videoUrl.value;

    if(url !== "") {

        // Embed url https://www.youtube.com/embed/F0D4AcgUrGk
        let videoID = extractVideoID(url);
        videoPlayer.src = "https://www.youtube.com/embed/" + videoID;
        videoPlayer.classList.remove("h-0");
        videoPlayer.classList.add("h-[300px]", "md:h-[700px]" ,"w-full")
        videoUrl.value = "";
        
    }
});

console.log(url[1])






