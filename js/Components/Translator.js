import React, { Component } from "react";
import config from "../config";
import DisplayQuery from "./DisplayQuery"


class Translator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      lang: props.lang,
      defs: ["Wyszukaj słowo..."],
      syns: [],
      ants: [],
      getMorePressed: false
    };
    this.inputChange = this.inputChange.bind(this);
    this.search = this.search.bind(this);
    this.mouseSelect = this.mouseSelect.bind(this);
    this.getMore = this.getMore.bind(this);
  }

  inputChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  mouseSelect(e) {
    const selection = this.getSelectionText();
    if (selection)
      this.setState({
        query: selection
      });
  }

  componentDidMount() {
    document
      .querySelector("#book-panel")
      .addEventListener("mouseup", this.mouseSelect);
  }

  componentWillUnmount() {
    document
      .querySelector("#book-panel")
      .removeEventListener("mouseup", this.mouseSelect);
  }

  getSelectionText() {
    return window.getSelection().toString().trim();

  }
  getMore(e){
    if(!this.state.getMorePressed){
      const url = "https://dictionaryapi.com/api/v3/references/thesaurus/json/"+ 
        encodeURI(this.state.query) + config.tesaKey;
      fetch(url)
      .then(res => res.json())
      .then( res => {
        if(res.length){
          const item = res[0].meta;
          if(item) {
            this.setState({
              syns: item.syns,
              ants: item.ants
            })
          }else{
            this.setState({
              syns: [],
              ants: []
            })
          }

        }
      })
      .catch(err => console.log( err ));
    }


  }

  search(e) {
    e.preventDefault();

    const url = "https://dictionaryapi.com/api/v3/references/collegiate/json/" 
      + encodeURI(this.state.query) + config.collKey;

    fetch(url)
      .then(res => res.json())
      .then(query => {
        this.setState({
          defs: query
        });

      })
      .catch(err => {
        console.log(err.message);
      });
  }


  render() {
    return (
      <>
        <div id="search-panel">
          <svg  id="bat" version="1.1" viewBox="0 0 128 128" 
          space="preserve"><g><path d="M127.7,36.8c-2.1-0.9-4.4-1.3-6.8-1.3c-9.7,0-17.6,7.9-17.6,17.6c0,2.9,0.7,5.6,1.9,8    
          c-2.3-1.1-4.9-1.8-7.7-1.8c-8.3,0-15.2,5.7-17.1,13.4c-1.5-0.7-3.2-1.1-5-1.1c-4.3,0-8.1,2.3-10.2,5.8c-0.4,0.7-0.8,1.4-1.1,2.2    
          c-0.3-0.8-0.6-1.5-1.1-2.2c-2.1-3.5-5.9-5.8-10.2-5.8c-1.8,0-3.4,0.4-5,1.1c-1.9-7.7-8.8-13.4-17.1-13.4c-2.8,0-5.4,0.6-7.7,1.8    
          c1.2-2.4,1.9-5.1,1.9-8c0-9.7-7.9-17.6-17.6-17.6c-2.4,0-4.7,0.5-6.8,1.3c1.5-1,27-16.9,53.8,19.5L56,44.4L61.4,58H67l5.4-13.7    
          l1.5,11.9C100.7,19.8,126.1,35.7,127.7,36.8z" fill="#eee" /></g></svg>
        <form onSubmit={this.search}>
          <input
            type="text" placeholder="Wpisz słowo..."
            value={this.state.query}
            onChange={this.inputChange}
          />
          <button>Szukaj</button>
        </form>


        <DisplayQuery 
          results={this.state.defs} 
          syns={this.state.syns}
          ants={this.state.ants}
          getMore={this.getMore}
          search={this.search}
          />
      </div>
      </>
    );
  }
}





export default Translator;