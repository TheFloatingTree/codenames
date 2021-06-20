import words from '../words.json'
import { TILE_BLUE_TEAM, TILE_BOMB, TILE_NO_TEAM, TILE_RED_TEAM } from '../../client/src/shared/constants'
import { shuffle } from './util/shuffle'

export function getWordList() {
    let wordlist = [], clientWords = [];
    let classic = true, duet = false, undercover = false;
    const NUM_TILES = 25;

    if(classic)
        wordlist = wordlist.concat([...words.classic_words]);

    if(duet)
        wordlist = wordlist.concat([...words.duet_words]);

    if(undercover)
        wordlist = wordlist.concat([...words.undercover_words]);

    // fill array with words from words JSON
    for (let i = 0; i < NUM_TILES; i++) {
        let randomNum = Math.floor(Math.random() * wordlist.length);
        clientWords.push(wordlist.splice(randomNum, 1)[0]);
    }

    return clientWords
}

export function getWordsWithTypes() {
    const wordList = getWordList()
    
    const getType = index => {
        if (index >= 0 && index < 8) return TILE_BLUE_TEAM
        if (index >= 8 && index < 17) return TILE_RED_TEAM
        if (index >= 17 && index < 18) return TILE_BOMB
        return TILE_NO_TEAM
    }

    const wordListWithTypes = wordList.map((word, index) => {
        return {
            word,
            type: getType(index)
        }
    })

    return shuffle(wordListWithTypes)
}