# How to use the Circus Starter Template v1.1.0

## 1. Getting a new project started with Github.
You're probably looking at this readme file on GitHub right now! If you're somewhere else, go here: https://github.com/CreativeCircus/circus-starter

Git is a technology that helps developers store, share, and back up their code files. Github is the most popular place to get Git service.

First, a project is stored on the internet, in what's called a "repository". Then, a developer who needs to work on that project can "pull" a copy of it to their computer (a "working copy"), work on it, and "push" their changes back up into the repository. 

### Getting Started with Git and Github

1. Make a Github account, and login.

2. Get the Github App (https://desktop.github.com/), install it, and log in in the app, then come back here.

3. Each time you start a new project, even a tiny one, make a new repository. All your work should go into repositories, for many reasons. Not only will you turn in homework this way, but it's a great way to keep your files backed up, and of course, **a full Github account is very impressive to potential employers**.
You start a new Git repo in either of two ways:
	- Locally, and then push it up to Github
		- In the Github app, press the + in the top left corner, then make a new repo. This just makes it on your computer. 
		- Press publish in the top right corner of the Github app to send this repo to Github. Now it's a real git repo with a remote copy and a working copy.
	- Remotely, and then pull it down to your computer
		- On the Github website, click the plus in the top right, then make a new repo. This just makes it on Github's servers.
		- On the new repo page, click "Clone or Download", then "Open in Desktop". That should pop up the Github app. Tell it where to save your working copy.

4. After that, you just need to keep your working copy and your remote repo up-to-date, or "in sync".
	- Any time you create or change files, the app will notice. You then need to "Commit" and "Sync" or "Push" them to send them to Github.
	- Any time anyone else makes changes and commits them, you'll be able to fetch those changes by syncing your working copy with the repo.

Git gets way more complicated than this, but for now, this is all you need.


## 2. Files and Folders
Included in this project are some files that almost all your projects will need. Your basic HTML, and a CSS "reset", and an empty JS file are included. 

The CSS in both SCSS and traditional CSS, but if you don't like SCSS, just ignore or delete those. 

Everything is organized in a folder structure that makes sense, though every developer team has their own way of doing it.

###  Getting started with this Starter Template

After you make a git repo for your new project, you'll see that it's literally just an empty folder. That's daunting, so let's get started by getting the files from this starter template into your new project.

1. On this repo page on the Github website (https://github.com/CreativeCircus/circus-starter), click "Clone or Download", then "Download ZIP"
2. Wait for it to download.
3. Unzip the template into your new project folder.
4. Delete unwanted files (like this readme), alter the `package.json` file with your name and details if you like, and commit your new project to github.
5. Rename the `gitignore-add-a-period` file to just `.gitignore` This file tells git to ignore a bunch of temporary files, and will save you time. It will disappear, because files that start with a period are invisible. If you get an error that the file already exists, skip this step. 

## 3. Helpful Terminal Tools 
*optional for designers and 1st quarter devs*
Part of this project is a handful of tools to get you working faster. They run in your Terminal through a little utility called Gulp, and they will check your code for errors for you, and streamline other parts of your workflow.

There is some initial setup involved that you just need to do once. After that, just use this template for each project, and you're good to go.

Start by opening the app named "Terminal" on your computer. It's in Applications/Utilities.


### One-time installs

We need to install some basics on your computer, just once, that all future projects will use. If you've ever done this before, skip down to "Set up this project".

#### Get your terminal initialized
*You only need to do this once on your computer.*
Run `touch ~/.bash_profile`.

#### Install NVM
*You only need to do this once on your computer.*

NVM is Node Version Manager. It helps you install Node. Why do you need a version manager? Because they update Node all the time. 

Go here: `https://github.com/creationix/nvm#install-script` and run the nvm install script in your Terminal.

#### Install Node and NPM
*You only need to do this once on your computer.*

Node is a super geeky command line tool for running code. You won't write any code for it for a while, but other people have written insanely useful tools that you can use without much effort, to make your life easier.

NPM is Node Package Manager. It will fetch packages of these pre-written tools for you.

Run `nvm install node` to install Node and NPM.

#### Install Gulp on your Computer
*You only need to do this once on your computer.*

Gulp is one of the most popular tools that runs on Node for helping web developers.

Run `npm install gulp-cli -g` to install the main Gulp package for your whole computer.

### Set up this project

Now your computer is set up, we need to have npm set this project up for us.

#### Tell NPM to get all the tools for us
*You only need to do this once when you start a new project.*

Type `cd ` (with a space after it) into your terminal window, then drag and drop the project folder right onto the terminal window. It should paste in the full path to the folder after the `cd `. Press Enter. Now the terminal should be "in" this project folder.

Run `npm update` to have npm fetch all the things.

### Get to work!

#### Tell Gulp to watch this project.
Type `cd ` (with a space after it) into your terminal window, then drag and drop the project folder right onto the terminal window. It should paste in the full path to the folder after the `cd `. Press Enter. Now the terminal should be "in" this project folder.

Run `gulp`.


#### What does it do?
First, it opens your new project in your browser. Cool!

After that, leave the terminal window open, and every time you save a code file, Gulp will
- Compile SASS files into CSS (if you're using them)
- Check JS files for errors
- Refresh the Browser

Now you can just work in the index.html file, the css (or later, scss) files, the js files, and Gulp will error check them and refresh the browser every time you save. Frickin' magic right?