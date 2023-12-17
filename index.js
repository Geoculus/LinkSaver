// Initialize arrays to store leads
let myLeads = [];
const colors = ['#d63dba','red','green','blue','yellow']
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

let colorIndex = 0
for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].style.color = colors[colorIndex];
}
// Check if there are leads in local storage
if (leadsFromLocalStorage) {
    // If yes, update myLeads array and render the leads
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

colorBtn.addEventListener("click", function() {
    if(colorIndex>=colors.length-1)
        colorIndex=0
    colorIndex++
    for (let i = 0; i < colorEls.length; i++) {
        colorEls[i].style.color = colors[colorIndex];
        colorEls[i].style.borderColor = colors[colorIndex];
        h1El.style.color = colors[colorIndex];
    }

    for (let i = 0; i < backcolorEls.length; i++) {
        backcolorEls[i].style.background = colors[colorIndex];;
        backcolorEls[i].style.borderColor = colors[colorIndex];;
    }
    for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].style.color = colors[colorIndex];
    }

      

      
      
})

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
