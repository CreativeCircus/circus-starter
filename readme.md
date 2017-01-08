# How to use the Circus Starter Template v1.0.0

## Files and Folders
Included in this project are some files that almost all your projects will need. 

They're also organized in a way that makes sense, though every developer team has their own way of doing it.

## Terminal Stuff
Part of this project is a file that will set up a handful of tools to get you going.

Start by opening the app named Terminal on your computer.

### Install NVM
*You only need to do this once on your computer.*

NVM is Node Version Manager. It helps you install Node. Why do you need a version manager? Because they update Node all the time. 

Go here: `https://github.com/creationix/nvm#install-script` and run the nvm install script in your Terminal.

### Install Node and NPM
*You only need to do this once on your computer.*

Node is a super geeky command line tool for running code. You won't write any code for it for a while, but other people have written insanely useful tools that you can use without much effort, to make your life easier.

NPM is Node Package Manager. It will fetch pacakges of these pre-written tools for you.

Run `nvm install node` to install Node and NPM.

### Install Gulp on your Computer
*You only need to do this once on your computer.*

Gulp is one of the most popular tools that runs on Node for helping web developers.

Run `npm install gulp-cli -g` to install the main Gulp package for your whole computer.

### Use NPM to install all the tools we need.

Type `cd ` (note the space) into your terminal window, then drag and drop this folder right onto the terminal window. It should paste in the full path to the folder after the `cd`. Press Enter.

Now the terminal should be "in" this project folder.

Run `npm update` to have npm fetch all the things.

### Run Gulp on this project with the Circus Starter Gulp File.
Run `gulp`.

### What did it do?
Every time you save a code file, Gulp will
- Compile SASS files into CSS
- Check JS files for errors
- Refresh the Browser