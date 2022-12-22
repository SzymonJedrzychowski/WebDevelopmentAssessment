import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

// Import modules
import DataNavigation from "./DataNavigation";
import PapersAuthors from "./PapersAuthors";
import UpdateAward from "./UpdateAward";

/**
 * GenerateTable function is responsible for displaying tables with data from database.
 *
 * @author Szymon Jedrzychowski
 */
function GenerateTable(props) {

    // createRow creates a single row of table depending on the type value that is received by props.
    const createRow = (value) => {
        if (props.type === "papers") {
            return <div key={value.paper_id} className="entry">
                <PapersAuthors data={value}/>
            </div>;
        } else if (props.type === "author") {
            return <div className="entry" key={value.author_id}>
                <ListGroup.Item as={Link} to={"/authors/" + value.author_id} action>
                    <h2>{value.first_name} {value.middle_initial} {value.last_name}</h2>
                </ListGroup.Item>
            </div>
        } else if (props.type === "admin") {
            return <div key={value.paper_id} className="entry">
                <UpdateAward
                    paper={value}
                    awardDictionary={props.awardDictionary}
                    handleUpdate={props.handleUpdate}
                    handleSignOut={props.handleSignOut}/>
            </div>
        }
    }

    return <ListGroup>
        {props.dataToShow.slice(props.pageLimit * props.currentPage, props.pageLimit * (parseInt(props.currentPage) + 1)).map(
            (value) => createRow(value)
        )}

        {props.loadingData &&
            <div key="loading"><ListGroup.Item className="noData"><h2>Loading data</h2></ListGroup.Item></div>
        }

        {(props.dataToShow.length === 0 && !props.loadingData) &&
            <div key="noData"><ListGroup.Item className="noData"><h2>No data found</h2></ListGroup.Item></div>
        }

        {<ListGroup.Item className="dataNavigation">
            {<DataNavigation currentPage={props.currentPage}
                             handleCurrentPage={props.handleCurrentPage}
                             dataToShow={props.dataToShow}
                             pageLimit={props.pageLimit}
                             handlePageLimit={props.handlePageLimit}/>}
        </ListGroup.Item>
        }
    </ListGroup>
}

export default GenerateTable;