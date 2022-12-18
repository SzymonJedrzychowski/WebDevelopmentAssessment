function UpdateAward(props) {
    const handleSelect = (event) => {
        const formData = new FormData();
        formData.append('award', event.target.value);
        formData.append('paper_id', props.paper.paper_id);

        const token = localStorage.getItem('token');

        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/update",
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer " + token }),
                body: formData
            })
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    if(json.message === "Success"){
                        props.handleUpdate()
                    }else{
                        props.handleSignOut();
                    }
                })
            .catch(
                (e) => {
                    console.log(e.message)
                })
    }

    return (
        <div>
            {props.paper.title}
            <select value={props.awardDictionary[props.paper.award]} onChange={handleSelect}>
                <option value="true">Awarded</option>
                <option value="false">Not awarded</option>
            </select>
        </div>
    )
}

export default UpdateAward;