/**
 * Web Atelier 2022 3 - Object-Oriented JavaScript
 *
 * Student: Maragliano Gianluca
 *
 */

//--------------------------------------------------------------------------------------
// Task 1
//--------------------------------------------------------------------------------------

/**
 * @param {number} s - A time as the number of seconds.
 * @return {string} A string which represents the number of minutes followed by the remaining seconds
 *  with the M:SS.MS format. If the input value is negative, the resulting string should be in -M:SS.MS format.
 * SS indicates that if the number of seconds is less than 10, it should be padded with a 0 character.
 * MS indicates the number of milliseconds (3 digits)
 */
 function format_seconds(s) {

    let z = parseInt(s);

    if (isNaN(z) || z == undefined) 
        return "?:??.????";

    let c = Math.abs(s) / 60;

    let out = "";
    let min = Math.trunc(c);
    let sec = Math.trunc(Math.abs(s) - min*60);
    let millsec = ((s - Math.trunc(s)).toFixed(3))*1000;


    if (sec < 10)
        sec = "0" + sec;

    if (millsec < 10) {
        millsec = "00" + millsec;
    } else if (10 <= millsec && millsec < 100) {
        millsec = "0" + millsec;
    }

    out += min + ":" + sec + "." + millsec;

    if (s < 0) 
        out = "-" + out;

    return out;
}





/**
* @param {Number[]} a - The array of numbers.
* @param {Number} c - The scalar multiplier.
* @return {Number[]} An array computed by multiplying each element of the input array `a`
* with the input scalar value `c`.
*/
function scalar_product(a, c) {

    if (!Array.isArray(a) || isNaN(c))
        return undefined;

    let b = [];

    for (let i = 0; i<a.length; i++) {
        if (isNaN(a[i])) 
            return undefined;
        else
            b.push(a[i]*c);
    }
    
    return b;
}


/**
 * @param {number[]} a - The first array of numbers.
 * @param {number[]} b - The second array of numbers.
 * @return {number} A value computed by summing the products of each pair
 * of elements of its input arrays `a`, `b` in the same position.
 */
function inner_product(a, b) {

    if (a == undefined || b == undefined) 
        return undefined;

    if (!Array.isArray(a) || !Array.isArray(b))
        return undefined;

    if (a.length != b.length)
        return undefined;

    let sum = 0;

    for (let i=0; i<a.length; i++) {
        sum += a[i]*b[i];
    }

    return sum;
}


/**
* @param {String} a - A string typed by the user
* @param {String} b - The correct string
* @return {Array[Boolean]} Array indicating whether the corresponding characters are wrong: (true = mismatch detected, false = identical characters).
*/
function getErrors(a, b) {

    if (typeof(a) != "string" || typeof(b) != "string") 
        return undefined;

    a = a.split("");
    b = b.split("");
    let c = [];

    for (let i=0; i<a.length; i++) {
        if(a[i] == b[i])
            c.push(false);
        else
            c.push(true);
    }

    return c;
}



/**
* @param {String} a - A string typed by the user
* @param {String} b - The correct string
* @return {Integer} The number of mismatching characters. Case sensitive.
*/
function countErrors(a, b) {

    if (typeof(a) != "string" || typeof(b) != "string") 
        return undefined;

    let c = getErrors(a, b);
    let count = 0;

    for (let i = 0; i<c.length; i++) {
        if (c[i])
            count++
    }
    return count;

}

/**
 * Detect whether the point at coordinates (x,y) is found within the given rectangle
 * @param {Integer} x
 * @param {Integer} y
 * @param {Integer} left
 * @param {Integer} top
 * @param {Integer} width
 * @param {Integer} height
 * @returns {Boolean} true, if the point is located inside (including the edge), false outside
 */
function detectCollisionRect(x, y, left, top, width, height) {
    
    if (x >= left && x <= left + width && y >= top && y <= top + height)
        return true;
    else
        return false;
}

/**
 * Detect whether the point at coordinates (x,y) is found within any of the given rectangles
 * @param {Integer} x
 * @param {Integer} y
 * @param {Array} a Array of rectangles. Each rectangle is an array of 4 elements: [left, top, width, height].
 * @returns
 */
function detectCollisionRectArray(x, y, a) {

    if (!Array.isArray(a) || a.length < 1)
        return undefined;

    for (let i = 0; i < a.length; i++) {
        if(detectCollisionRect(x, y, a[i][0], a[i][1], a[i][2], a[i][3]))
        return true;
    }       

    return false;

}



//--------------------------------------------------------------------------------------
// Task 2
//--------------------------------------------------------------------------------------


/**
* @param {string} t0 - A timestamp
* @return {function(t)} A function which given a timestamp t computes the time elapsed since the initial timestamp t0.
*/
function startClock(t0) {

    if (t0 == undefined)
        return undefined;

    return function getElapsedTime(t) {
        return t - t0;
    }
}


/**
 * @param {number[]} a - The array over which to iterate.
 * @return {function} - call this function to retrieve the next element of the array. The function throws an error if called again after it reaches the last element.
 */
function iterator(a) {

    let i = 0;

    if (a == undefined || !Array.isArray(a))
        return undefined;

    return function next(b) {

        if (i >= a.length) {
            throw new Error ("beyond end of the array");
        }

        if (b == undefined) {
            i++;
            return a[i-1];
        } else if (Array.isArray(b)) {
            i = 0;
            a = b;
            return next;
        } else if (!isNaN(b)) {
            i += b;
            return i;
        }
    }
}



/**
 * @param {event} a - The click event
 * @return undefined;
 */
function button_start_click(event) {

    //start the clock
    
    getElapsedTime = startClock(performance.now());

    //start the timer event

    stopTimer = startTimer(tick);

    //pick a random text challenge and display it

    challenge = pickRandomChallenge();

    displayChallenge(challenge);


    //get the <input> ready for the next round

    emptyInput();
    focusInput();

    //reset the score

    score();

}



/**
 * @param {event} a - The input event
 * @return undefined;
 */
function txt_input(event) {

    //game over when input matches challenge length

    if (challenge.length == input_text.value.length){
        gameOver();
    } 

    //count errors and display them

    let errors = countErrors(input_text.value, challenge);
    displayErrors((input_text.value.length - errors) / input_text.value.length);
    
    //update the score based on the errors

    displayScore(input_text.value.length - errors);

    //redisplay the challenge string to highlight the errors

    displayChallenge(challenge, getErrors(input_text.value, challenge));
}


/**
 * Helper function to print a log message with the function call performed by the tests
 *
 * usage:
 *
 * logFunctionArguments(arguments);
 */
 function logFunctionArguments(a){

    console.log(`${a.callee.name}(${Array.from(a).map(j=>JSON.stringify(j)).join(", ")})`)

}