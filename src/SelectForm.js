import React from 'react';

export default class SelectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearValue: 2020,
            roundValue: 1
        };

        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleRoundChange = this.handleRoundChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleYearChange(e) {
        this.setState({yearValue: e.target.value});
    }

    handleRoundChange(e) {
        this.setState({roundValue: e.target.value});
    }

    handleSubmit(e) {
        this.props.submitHandler(this.state.yearValue, this.state.roundValue);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Year
                    <select value={this.state.yearValue} onChange={this.handleYearChange}>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                </label>

                <label>
                    Round
                    <select value={this.state.roundValue} onChange={this.handleRoundChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}