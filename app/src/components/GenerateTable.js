import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

// Import modules
import DataNavigation from "./DataNavigation";
import PapersAuthors from "./PapersAuthors";
import UpdateAward from "./UpdateAward";

function generateTable(props) {
    const createRow = (value) => {
        if (props.type === "papers") {
            return <div key={value.paper_id} className="entry">
                <PapersAuthors data={value}/>
            </div>;
        } else if (props.type === "author") {
            return <div className="entry" key={value.author_id}>
                <ListGroup.Item as={Link} to={"/app/authors/" + value.author_id} action>
                    <h2>{value.first_name} {value.middle_initial} {value.last_name}</h2>
                </ListGroup.Item>
            </div>
        } else if (props.type === "admin") {
            return <div key={value.paper_id} className="entry">
                <UpdateAward paper={value}
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

        {props.dataToShow.length === 0 &&
            <div key="noData"><ListGroup.Item className="noData"><h2>No data found</h2></ListGroup.Item></div>
        }

        {(!props.loadingData) &&
            <ListGroup.Item className="dataNavigation">
                {<DataNavigation currentPage={props.currentPage}
                                 setCurrentPage={props.setCurrentPageHandler}
                                 dataToShow={props.dataToShow}
                                 pageLimit={props.pageLimit}
                                 setPageLimit={props.setPageLimitHandler}/>}
            </ListGroup.Item>
        }
    </ListGroup>
}

export default generateTable;