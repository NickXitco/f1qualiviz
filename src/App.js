import React from 'react';
import SelectForm from './SelectForm';
import Viz from './Viz';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.getData = this.getData.bind(this);
    }

    getData(year, round) {
        const query = `https://ergast.com/api/f1/${year}/${round}/qualifying.json`;
        fetch(query)
            .then(response => response.json())
            .then(data => {
                this.setState({data: this.parseData(data)});
            });
    }

    parseData(data) {
        return data["MRData"]["RaceTable"]["Races"][0]["QualifyingResults"];
    }

    render() {
        return (
            <div>
                <SelectForm submitHandler={this.getData}/>
                <Viz data={this.state.data}/>
            </div>
        )
    }
}