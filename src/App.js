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
        const results = data["MRData"]["RaceTable"]["Races"][0]["QualifyingResults"];

        if (!results) {
            return null;
        }

        const q1 = [];
        const q2 = [];
        const q3 = [];

        for (const result of results) {
            const driver = result["Driver"];
            const constructor = result["Constructor"];

            if (result["Q1"]) {
                q1.push({
                    driver: driver,
                    constructor: constructor,
                    timestamp: result["Q1"],
                    time: this.msFromTimestamp(result["Q1"])
                })
            }

            if (result["Q2"]) {
                q2.push({
                    driver: driver,
                    constructor: constructor,
                    timestamp: result["Q2"],
                    time: this.msFromTimestamp(result["Q2"])
                })
            }

            if (result["Q3"]) {
                q3.push({
                    driver: driver,
                    constructor: constructor,
                    timestamp: result["Q3"],
                    time: this.msFromTimestamp(result["Q3"])
                })
            }
        }

        function sortTime(a, b) {
            return a.time - b.time;
        }

        return {q1: q1.sort(sortTime), q2: q2.sort(sortTime), q3: q3.sort(sortTime)};
    }

    msFromTimestamp(timestamp) {
        const split = timestamp.split(/[:.]+/);
        let ms = Number(split[2]);
        ms += Number(split[1]) * 1000;
        ms += Number(split[0]) * 60000;
        return ms;
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