//npm modules:
const chalk = require('chalk');
const yargs = require('yargs');
const validator = require('validator');
const fs = require('fs');

//my modules:
const notes = require('./notes.js');

//Customize yargs version:
yargs.version('1.1.0')

//add, remove, read, list 

//ADD COMMAND:
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,//you have to provide --title="" in order for the command to work
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,//you have to provide --body="" in order for the command to work
            type: 'string'
        }
    },
    handler: argv => notes.addNote(argv.title, argv.body)
})

//REMOVE COMMAND:
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,//you have to provide --title="" in order for the command to work
            type: 'string'
        }
    },
    handler: argv => notes.removeNote(argv.title)
})

//LIST COMMAND
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => notes.listNotes()
})

//yargs.parse() passes the arguments with all of the configuration details you've provided with your yargs commands calls
yargs.parse()