# Luma App

This is a simple application written for my mom to manage students and their payments for her small business. 

![Luma interface](/resources/app-preview.png)

## Tech stack

- Frontend is written with the [Angular](https://angular.dev/) framework.

- Backend API is written with the [Django](https://www.djangoproject.com/) web framework. 

- All information is stored locally on a [SQLite](https://sqlite.org/) database file.  

## Running the app

If you are using Windows, you can install everything needed for the application using the `win-install-luma.ps1` Powershell script. 
- The script will use `winget` install Node.js, Python, and the respective dependencies for the frontend and backend. 
- **Note:** The script must be run in an administrator powershell prompt to avoid elevation prompts. 

## Allow the execution of a downloaded script on your system

If you do not usually install scripts, it is likely that you will encounter an error message saying that scripts are not allowed to be run on your system.

Run the following command an administrative Powershell window to require scripts to be signed in order to be executed.

```ps
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

You should then run the following script on an administrative Powershell terminal session as the included script is not signed.
```ps
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Create a shortcut to run the application from the desktop

Alternatively, you can simply set up a shortcut to run the script in an elevated Powershell session and bypass the policy. To do this:
1. Click on an empty space on your desktop or file explorer
2. On the context menu, click on **New > Shortcut**
3. Inside the shortcut menu, copy the following line, and replace the path to an absolute path to the script location. 
```ps
powershell.exe -ExecutionPolicy Bypass -File "C:\Path\To\win-install-luma.ps1"
```
4. Click **Next** and give a name to the shortcut.
5. Right click the newly created shortcut and select **Properties**
6. Click the **Advanced...** button in the **Shortcut** tab
7. Check the **Run as administrator** checkbox
8. Click **OK**, then click **Apply**