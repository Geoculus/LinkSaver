// Initialize arrays to store leads
let myLeads = [];
// Get DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn")

// Retrieve leads from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Check if there are leads in local storage
if (leadsFromLocalStorage) {
    // If yes, update myLeads array and render the leads
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

// Function to render leads in the UI
function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    // Update the unordered list in the UI
    ulEl.innerHTML = listItems;
}

// Event listener for double-clicking the delete button
deleteBtn.addEventListener("dblclick", function() {
    // Clear local storage, reset myLeads array, and render the leads
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

// Event listener for clicking the input button
inputBtn.addEventListener("click", function() {
    // Add the input value to myLeads array, clear input field, update local storage, and render the leads
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});
