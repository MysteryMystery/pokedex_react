import React from "react";
import {ucfirst} from "../../lib/util/StringOps";
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        }

        this.suggest = this.suggest.bind(this);
    }

    suggest(event){
        let searchTerm = event.target.value.toLowerCase();
        if (searchTerm.length < 3){
            this.setState({ suggestions: [] })
            return
        }
        let s = this.props.pokemon
            .filter(p => p.name.includes(searchTerm));
        this.setState({ suggestions: s });

    }

    render() {
        return <div>
            <input
                className={"text-4xl text-center h-24 w-full text-gray-700 bg-gray-400 shadow-inner-lg p-4"}
                onKeyUp={this.suggest}
            />
            <div className={"flex " + (this.state.suggestions.length > 0 ? "mb-2" : "")}>
                { this.state.suggestions.map(s =>
                    <div
                        className={"text-xl shadow-inner-lg bg-gray-800 hover:bg-gray-500 p-2"}
                        key={s.name}
                        onClick={() => this.props.history.push("/show/" + s.id)}
                    >
                        {ucfirst(s.name)}
                    </div>
                )}
            </div>
        </div>
    }
}

export default withRouter(SearchBar)
