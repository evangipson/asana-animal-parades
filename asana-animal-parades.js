var asanaCheckboxes, asanaCompleteButtons;

/* got from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function fireAnimalParade(input) {
    /* if the input class list contains complete,
     * OR the input's parent parent is showing "animationCompletion"
     * because the user isn't showing complete tasks. */
    setTimeout(function() {
        if(input.classList.contains("CompletionButton--isCompleted") ||
        input.parentElement.parentElement.classList.contains("TaskRow--animatingCompletion")) {
            /* how many milliseconds between each animation?
                * easy to think of as the "space between" animals
                * in the parade, thus the variable name. */
            var animalSpace = getRandomInt(350, 650);
            /* need "window" here to maintain asana's context */
            var animalInterval = setInterval(window.host.wrapInExceptionHandler(
                window.AsanaRainbow.start,
                window.ExceptionHandler.ReentryStrategy.DELAY,
                function(){window.AsanaRainbow.start()}
            ), animalSpace);
            setTimeout(function(){
                clearInterval(animalInterval);
            }, getRandomInt(1500, 4000));
        }
    }, 100);
}
function resetCurrentCheckboxes() {
    /* now fill up the new event listeners */
    asanaCheckboxes = document.getElementsByClassName("TaskRowCompletionStatus-checkbox--incomplete");
    asanaCompleteButtons = document.getElementsByClassName("CompletionButton--isIncomplete");
    for(var i = 0; i < asanaCheckboxes.length; i++) {
        asanaCheckboxes[i].addEventListener("click", function() {
            fireAnimalParade(this)
        }, false);
    }
    for(var i = 0; i < asanaCompleteButtons.length; i++) {
        asanaCompleteButtons[i].addEventListener("click", function() {
            fireAnimalParade(this)
        }, false);
    }
}
/* Pipe into DOMContentLoaded, keyup, and click because they can all potentially create inputs */
resetCurrentCheckboxes();
document.addEventListener("click", resetCurrentCheckboxes, false);
document.addEventListener("keyup", resetCurrentCheckboxes, false);