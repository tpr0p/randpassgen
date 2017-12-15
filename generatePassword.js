<!--

//MARK: Character Category Constructor
function characterCategory(charCodes, similarCharacterCodes){
    this.charCodes  = charCodes;
    this.count      = 0;
    this.candidates = [];

    var excludedCharCodes = [];
    //determines which characters from charCodes should be included in excludedCharCodes
    for (i = 0; i < charCodes.length; i++) {
        var shouldAdd = true;
        for (j = 0; j < similarCharacterCodes.length; j++) {
            if (charCodes[i] == similarCharacterCodes[j]) {
                shouldAdd = false;
            }
        }
        if(shouldAdd){
            excludedCharCodes.push(charCodes[i]);
        }
    }
    this.excludedCharCodes = excludedCharCodes;
}

//MARK: Character Lists
const lowercaseCodes = [97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];
const uppercaseCodes = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
//0 -> 9
const numberCodes = [48,49,50,51,52,53,54,55,56,57];
//basic symbols: !@#$%^&*()-_+=?
const basicSymbolCodes = [33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 45, 95, 43, 61, 63];
//ambiguous symbols: {}[]|\/:;"'<>,.
const ambiguousSymbolCodes = [123, 125, 91, 93, 124, 92, 47, 58, 59, 34, 39, 60, 62, 44, 46];
//similar characters: oO0lLiI'"|,.:;
const similarCharacterCodes = [111, 79, 48, 108, 76, 105, 73, 39, 34, 124, 44, 46, 58, 59];

var lowercase        = new characterCategory(lowercaseCodes, similarCharacterCodes);
var uppercase        = new characterCategory(uppercaseCodes, similarCharacterCodes);
var numbers          = new characterCategory(numberCodes, similarCharacterCodes);
var basicSymbols     = new characterCategory(basicSymbolCodes, similarCharacterCodes);
var ambiguousSymbols = new characterCategory(ambiguousSymbolCodes, similarCharacterCodes);

//MARK: Password Generation
function generatePassword(passwordLength, uppercaseEnabled, numbersEnabled, basicSymbolsEnabled, ambiguousSymbolsEnabled, excludeSimilarCharacters) {
    
    //reset characterCategory counts
    lowercase.count        = 0;
    uppercase.count        = 0;
    numbers.count          = 0;
    basicSymbols.count     = 0;
    ambiguousSymbols.count = 0;
    
    //enabledCategories holds all characterCategories that may contribute candidates to the password
    var enabledCategories = [];
    //holds the characters that compose the password
    var password = [];
    // the elements of password converted from charCode to String
    var passwordString = "";

    //determine which character code arrays to use; 'candidates' are the character codes that may be contributed to the password
    if (excludeSimilarCharacters){
        lowercase.candidates        = lowercase.excludedCharCodes;
        uppercase.candidates        = uppercase.excludedCharCodes;
        numbers.candidates          = numbers.excludedCharCodes;
        basicSymbols.candidates     = basicSymbols.excludedCharCodes;
        ambiguousSymbols.candidates = ambiguousSymbols.excludedCharCodes;
    }
    else {
        lowercase.candidates        = lowercase.charCodes;
        uppercase.candidates        = uppercase.charCodes;
        numbers.candidates          = numbers.charCodes;
        basicSymbols.candidates     = basicSymbols.charCodes;
        ambiguousSymbols.candidates = ambiguousSymbols.charCodes;
    }

    //fill enabledCategories with relevant characterCategories
    enabledCategories.push(lowercase);
    if (uppercaseEnabled){
        enabledCategories.push(uppercase);
    }
    if (numbersEnabled){
        enabledCategories.push(numbers);
    }
    if (basicSymbolsEnabled){
        enabledCategories.push(basicSymbols);
    }
    if (ambiguousSymbolsEnabled){
        enabledCategories.push(ambiguousSymbols);
    }

    //determine count for each enabled category
    //first pass -- enabled charCategories are given counts 'randomly', their total counts are equal to the amount of characters in the password
    for (i = 0; i < passwordLength; i++){
        enabledCategories[Math.floor(Math.random()*enabledCategories.length)].count++;
    }

    //second pass -- if an enabled charCategory has a count of zero, let it take up to half of the counts from the enabled charCategory with the greatest count 
    for (category in enabledCategories){
        if (category.count == 0){
            var indexWithGreatestCount = 0;
            //determine the index of the element in enabledCategories with the greatest count and assign it to indexWithGreatestCount
            for (i = 1; i < enabledCategories.length; i++){
                if (enabledCategories[i] > enabledCategories[i-1]){
                    indexWithGreatestCount = i;
                }
            }
            category.count = Number(1+(enabledCategories[indexWithGreatestCount].count)/2)*Math.random();
            enabledCategories[indexWithGreatestCount].count -= category.count;
        }
    }

    //choose character codes for password
    for ( i = 0; i < enabledCategories.length; i++){
        for(j = 0; j < enabledCategories[i].count; j++){
            password.push(enabledCategories[i].candidates[Math.floor(Math.random()*enabledCategories[i].candidates.length)]);
        }
    }

    //shuffle "password"
    var currentIndex = password.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        //pick an element (descending order from end of the array) and swap it with another element--that is "randomly" chosen
        randomIndex            = Math.floor(Math.random() * currentIndex);
        currentIndex           -= 1;
        temporaryValue         = password[currentIndex];
        password[currentIndex] = password[randomIndex];
        password[randomIndex]  = temporaryValue;
    }

    //peace day read zit stance
    for (i = 0; i < password.length; i++){
        passwordString+=String.fromCharCode(password[i]);
    }

    //correct '<' and '>' for html if "passwordString" will be output to the html document via document.write
    if (false){
        passwordString = passwordString.replace("<","&#60;");
        passwordString = passwordString.replace(">","&#62;");
    }

    return passwordString;
}

-->