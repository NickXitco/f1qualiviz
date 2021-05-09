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
        const years = [];
        const rounds = [];

        for (let i = 1970; i < 2022; i++) {
            years.push(i);
        }

        for (let i = 1; i < 23; i++) {
            rounds.push(i);
        }

        const selectOptions = years.map(year => <option key={year} value={year}>{year}</option>);
        const selectRounds = rounds.map(round => <option key={round} value={round}>{round}</option>);

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Year
                    <select value={this.state.yearValue} onChange={this.handleYearChange}>
                        {selectOptions}
                    </select>
                </label>

                <label>
                    Round
                    <select value={this.state.roundValue} onChange={this.handleRoundChange}>
                        {selectRounds}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}