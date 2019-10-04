import React, {Component} from "react";
import ReactDOM from "react-dom";
import Book from "./Components/Book";
import "../css/style.css";
import Translator from "./Components/Translator";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lang: "en",
      query: ""
    }

    this.setQuery = this.setQuery.bind(this);
  }

  setQuery(query){
    this.setState({
      query: query
    });
  }

  render(){
    return (
      <>
        <Book />
        <Translator lang={this.state.lang} query={this.state.query} />
      </>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("app"));
