/**
 * Functions that are used in several files.
 *
 * @author Szymon Jedrzychowski
 */

// Handler for changing number of entries on page.
function generalHandlePageLimit(event, setCurrentPage, setPageLimit) {
    setCurrentPage(0);
    setPageLimit(event.target.value);
}

// Handler for changing current page.
function generalHandleCurrentPage(event, setCurrentPage) {
    setCurrentPage(event.target.value);
}

// Handler for updating the search term.
function generalHandleSearchTerm(event, setCurrentPage, setSearchTerm, setRewardStatusSearch) {
    // Reset page to index 0 on searching.
    setCurrentPage(0);

    // Update correct value, depending on which variable has changed.
    if (event.target.id === "searchTerm") {
        setSearchTerm(event.target.value);
    } else {
        if (event.target.value === "false") {
            setRewardStatusSearch(null);
        } else {
            setRewardStatusSearch(event.target.value)
        }
    }
}

export { generalHandlePageLimit, generalHandleCurrentPage, generalHandleSearchTerm };