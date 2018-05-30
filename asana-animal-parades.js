var asanaCheckboxes;
var ASANAPARADES = {}; // global variable to store disable and enable functions for popup.js

/* got from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function fireAnimalParade(checkbox) {
    setTimeout(function() {
        if(!checkbox.classList.contains("TaskRowCompletionStatus-checkbox--incomplete")) {
            var animalSpace = getRandomInt(250, 500);
            /* need "window" here to maintain asana's context */
            var animalInterval = setInterval(window.host.wrapInExceptionHandler(window.AsanaRainbow.start, window.ExceptionHandler.ReentryStrategy.DELAY, function(){window.AsanaRainbow.start()}), animalSpace);
            setTimeout(function(){clearInterval(animalInterval)}, getRandomInt(1500, 5000));
        }
    }, 1500);
}
function resetCurrentCheckboxes() {
    asanaCheckboxes = document.getElementsByClassName("TaskRowCompletionStatus-checkbox--incomplete");
    for(var i = 0; i < asanaCheckboxes.length; i++) {
        asanaCheckboxes[i].addEventListener("mouseup", fireAnimalParade(asanaCheckboxes[i]), false)
    }
}
/* Exports */
ASANAPARADES.disableParades = function() {
    asanaCheckboxes = null;
    document.removeEventListener("click", resetCurrentCheckboxes);
    document.removeEventListener("keyup", resetCurrentCheckboxes);
}
/* Pipe into DOMContentLoaded, keyup, and click because they can all potentially create checkboxes */
ASANAPARADES.enableParades = function() {
    resetCurrentCheckboxes();
    document.addEventListener("click", resetCurrentCheckboxes);
    document.addEventListener("keyup", resetCurrentCheckboxes);
}
ASANAPARADES.enableParades();