// Initialize arrays to store leads
let myLeads = [];
const colors = ['#d63dba','red','green','blue','lightblue','lightgreen','black']
let colorEls = document.getElementsByClassName('color');
let backcolorEls = document.getElementsByClassName('background');
let allLinks = document.getElementsByTagName('a');
// Get DOM elements
const bodyEl = document.getElementById("bodyEl")
const h1El = document.getElementById("h1");
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn")
const colorBtn = document.getElementById("color-btn")
// Retrieve leads from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

let colorIndex = -1;
for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].style.color = colors[colorIndex];
}
// Check if there are leads in local storage
if (leadsFromLocalStorage) {
    // If yes, update myLeads array and render the leads
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Event listener for the color button
colorBtn.addEventListener("click", function() {
    // Check if the colorIndex is at the end of the colors array
    colorIndex++; 
    if (colorIndex >= colors.length )
        colorIndex = 0; // If at the end, reset colorIndex to the beginning
    // Increment colorIndex for the next color

    // Update text and border colors for elements with class colorEls
    for (let i = 0; i < colorEls.length; i++) {
        colorEls[i].style.color = colors[colorIndex];
        colorEls[i].style.borderColor = colors[colorIndex];
        h1El.style.color = colors[colorIndex]; // Update color for h1 element
    }

    // Update background and border colors for elements with class backcolorEls
    for (let i = 0; i < backcolorEls.length; i++) {
        backcolorEls[i].style.background = colors[colorIndex];
        backcolorEls[i].style.borderColor = colors[colorIndex];
    }

    // Update color for all links in the document
    for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].style.color = colors[colorIndex];
    }
})

// Event listener for the tab button
tabBtn.addEventListener("click", function(){    
    // Query the active tab in the current window using Chrome API
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // Add the URL of the active tab to the myLeads array
        myLeads.push(tabs[0].url);
        // Store the updated myLeads array in local storage as a JSON string
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        // Render the updated myLeads array
        render(myLeads);
    })
})

// Function to render leads in the UI
function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' class='color' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
    for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].style.color = colors[colorIndex];
    }

    
    // Update the unordered list in the UI
    
}

// Event listener for double-clicking the delete button
deleteBtn.addEventListener("click", function() {
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
