import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

// Import styling.
import "../styles/DataNavigation.css"

/**
 * DataNavigation is responsible for displaying page controls in pages that display data.
 *
 * @author Szymon Jedrzychowski
 */
function DataNavigation(props) {
    // Calculate maximal number of pages.
    const currentPage = parseInt(props.currentPage);
    const maxPageNumber = Math.ceil(props.dataToShow.length / props.pageLimit);

    // Create array with numbers of all possible pages.
    const jumpSelectionArray = Array.from(Array(maxPageNumber).keys())
    
    // chevrons-left.svg, ICONSVG, https://iconsvg.xyz/ (Access date: 6.01.2022)
    // chevrons-right.svg, ICONSVG, https://iconsvg.xyz/ (Access date: 6.01.2022)
    return (
        <>
            <Form.Group className="pageLimitSelection">
                <Form.Label className="itemsLabel">Items per page: </Form.Label>
                <Form.Select aria-label="Default select example" onChange={props.handlePageLimit}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="pageButtons">
                {(currentPage > 0) && <Button onClick={props.handleCurrentPage} value={0}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                    </svg>
                </Button>}
                {(currentPage <= 0) && <Button disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                    </svg>
                </Button>}
                {(currentPage + 1 >= maxPageNumber && currentPage - 2 >= 0) &&
                    <Button onClick={props.handleCurrentPage} value={currentPage - 2}>{currentPage - 1}</Button>}

                {currentPage - 1 >= 0 &&
                    <Button onClick={props.handleCurrentPage} value={currentPage - 1}>{currentPage}</Button>}
                {(currentPage - 1 < 0 && currentPage + 2 >= maxPageNumber) && <Button disabled>-</Button>}

                <Button className="currentPage">{currentPage + 1}</Button>

                {(currentPage + 1 >= maxPageNumber && currentPage - 2 < 0) && <Button disabled>-</Button>}
                {currentPage + 1 < maxPageNumber &&
                    <Button onClick={props.handleCurrentPage} value={currentPage + 1}>{currentPage + 2}</Button>}

                {(currentPage - 1 < 0 && currentPage + 2 < maxPageNumber) &&
                    <Button onClick={props.handleCurrentPage} value={currentPage + 2}>{currentPage + 3}</Button>}
                {(currentPage < maxPageNumber - 1) &&
                    <Button onClick={props.handleCurrentPage} value={maxPageNumber - 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                        </svg>
                    </Button>}
                {(currentPage >= maxPageNumber - 1) && <Button disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                </Button>}
            </Form.Group>

            <Form.Group className="jumpToPage">
                <Form.Label>Jump to page:</Form.Label>
                <Form.Select aria-label="Default select example" onChange={props.handleCurrentPage}>
                    {jumpSelectionArray.map((value) => <option key={value} value={value}>{value + 1}</option>)}
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default DataNavigation;