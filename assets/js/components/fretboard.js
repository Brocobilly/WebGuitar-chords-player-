import { strings } from "../guitar/string.js"
import { Fret } from "../guitar/fret.js"

const fretboardElement = document.querySelector('.fretboard')
const noteTemplate = document.querySelector('#fretboard-note')

for (const number in strings) {

    const stringElement = document.createElement('fieldset')
    stringElement.classList.add('fretboard_string-container')
    stringElement.style.backgroundColor = strings[number].color

    const string = strings[number]

    for (let note of string.pitchRange) {

        const noteClone = document.importNode(noteTemplate.content, true)
        const checkbox = noteClone.querySelector('input[type="checkbox"]')
        const label = noteClone.querySelector('label')
        const span = noteClone.querySelector('span')

        const fret = new Fret(checkbox, label, span, number)
        fret.note = note

        string.frets.push(fret)

        checkbox.addEventListener('input', () => !checkbox.checked ? string.muting() : string.press(fret))

        stringElement.append(noteClone)
    }

    fretboardElement.append(stringElement)
}