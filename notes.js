//npm modules:
const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    //const duplicateNotes = notes.filter(note => note.title === title);
    const duplicateNote = notes.find(note => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);
    const notesToRemove = notes.filter(note => note.title === title);
    if (!notesToRemove.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note Removed!'))
    }

    /*The other way:
    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Note Removed!'))
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
     */
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.bold('YOUR NOTES:'))
    notes.forEach(note => console.log(note.title));
}

const readNote = title => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        console.log(chalk.inverse.green.bold(duplicateNote.title.toUpperCase()));
        console.log(chalk.inverse.bold(duplicateNote.body));
    } else {
        console.log(chalk.bgRed.bold('No note found!'))
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    } 
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}