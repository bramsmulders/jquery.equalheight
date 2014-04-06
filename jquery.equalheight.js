/*  equalheight - v0.0.1
    MIT license
    Normalizes height based on rows
    @author: Bram Smulders - @bramsmulders
\*----------------------------------------------------------------------------*/

$.fn.equalHeight = function() {
    var currentTallest = 0;
    var currentRowStart = 0;
    var rowDivs = new Array();
    var $el;
    var topPosition = 0;

    $(this).each(function() {
        $el = $(this);
        $el.css({'min-height':'0'});
        topPosition = $el.position().top;
        if (currentRowStart != topPosition) {
            // we just came to a new row.  Set all the heights on the completed row
            for (var currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].css({'min-height': currentTallest});
            }
            // set the variables for the new row
            rowDivs.length = 0; // empty the array
            currentRowStart = topPosition;
            currentTallest = $el.outerHeight();
            rowDivs.push($el);
        } else {
            // another div on the current row.  Add it to the list and check if it's taller
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.outerHeight()) ? ($el.outerHeight()) : (currentTallest);
        }

        // do the last row
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].css({'min-height': currentTallest});
        }
    });
    return this;
};