# iOS widget for Obsidian tasks

It's a simple setup for me to pull Obsidian tasks and show them in the iOS widget.

## Pre-setup
1. Tasks are stored in Obsidian on a Kanban board (using the Kanban plugin)
2. Vault is stored in OneDrive.
3. I want to have my tasks as a reminder on my lock screen:
![image](https://github.com/user-attachments/assets/cd4da183-4ae8-4fa4-a769-c61ac2c90a3b)

## Setup
1. Share the board using the OneDrive sharing link
2. Base64-encode link and prepend with "u!" to use in the script as <encoded_sharing_url>
  - See https://learn.microsoft.com/en-us/onedrive/developer/rest-api/api/shares_get?view=odsp-graph-online#encoding-sharing-urls
3. Install the Scriptable app on your phone
4. Create a new script, copy the js content and modify sharing URL and other parameters as needed
