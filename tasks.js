// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: file-alt;

// This script is designed for Scriptable app on iOS to be used as a custom widget for the lock screen

// My setup: 
// Tasks are stored in the .md file in the Obsidian vault in lists using Kanban plugin
// Vault is stored on OneDrive
// This script pulls the tasks file, parses task lists, extract tasks from two lists and
// puts their content side by side in an iOS widget

// To get raw file content from OneDrive:
// https://learn.microsoft.com/en-us/onedrive/developer/rest-api/api/shares_get?view=odsp-graph-online#encoding-sharing-urls
// 1. Create a sharing link for the file
// 2. Get base64 encoding of this sharing link
// 3. Prepend with "u!" and use it as <encoded_sharing_url> in the URL below
let TASKS_FILE_URL = "https://api.onedrive.com/v1.0/shares/<encoded_sharing_url>/root/content"

// Two lists names to pull tasks from
let LIST1 = "## In Progress"
let LIST2 = "## Now"

// Whether this widget would be used on a lockscreen or not
let lockScreen = True

// number of cards to display when show as widget and when opened
let itemCount = 10
if (config.runsInWidget) {
    itemCount = 5
}

// how many cards to show on lockScreen and what font size to use
if (lockScreen) {
    itemCount = 3
    lockFontSize = 11
}

async function getTasks(listName) {
    // getting the md file content
    let taskReq = new Request(TASKS_FILE_URL)
    taskReq.method = "GET"
    let contentResponse = await taskReq.loadString()
    
    // parsing the markdown file
    let contentLines = contentResponse.split("\n")
    let cardList = []
    let currentList = false
    for (let line of contentLines) {
        if (line == listName) {
            currentList = true
        } else if (line.startsWith("##")) {
            currentList = false
        } else if (currentList && line.startsWith("- [")) {
            cardList.push(line.slice(6))
        }
    }
    return cardList;
}


const cardList1 = await getTasks(LIST1);
const cardList2 = await getTasks(LIST2);

// iOS widget setup - two columns (one for each list)
// if only one list has columns, only one would automagically be showed
// and will take all the width
const widget = new ListWidget()
let mainStack = widget.addStack();

let stack1 = mainStack.addStack();
stack1.layoutVertically();
for (const taskListName of cardList2) {
    let text = stack1.addText(taskListName)
    text.lineLimit = 1
    if (lockScreen) text.font = Font.systemFont(lockFontSize)
}

mainStack.addSpacer(10);

let stack2 = mainStack.addStack();
stack2.layoutVertically();
for (const taskListName of cardList1) {
    let text = stack2.addText(taskListName)
    text.lineLimit = 1
    if (lockScreen) text.font = Font.systemFont(lockFontSize)
}

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    widget.presentLarge();
}
