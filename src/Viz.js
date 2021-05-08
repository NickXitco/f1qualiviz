import React from 'react';

export default class Viz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }


    render() {
        if (!this.props.data) {
            return null;
        }

        const mapping = this.props.data.map((item, index) => {
            console.log(item);
            return (
                <li key={index.toString()}>
                    {item["Driver"]["familyName"]}{item["Q1"]}
                </li>
            )
        })


        return (
            <ul>
                {mapping}
            </ul>
        )
    }
}