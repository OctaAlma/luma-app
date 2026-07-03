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

Run the following command an administrative Powershell window to require scripts to be signed fore execution.

```ps
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```