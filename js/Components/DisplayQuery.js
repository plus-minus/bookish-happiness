import React from "react";

class DisplayQuery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: "0"

        }

        this.setTab = this.setTab.bind(this);
    }
    
    setTab(id){
        this.setState({
            activeTab: id
        });
    }

    processResults( results ){
        //console.log( results )
        if(results.length && results[0].meta){
            results = results.length > 3? results.slice(0, 2) : results;
            return results.map(( def, i) => {
                return <div key={i}>
                    <span className="word"><b>{def.hwi.hw.replace(/\*/g, "")}</b></span>
                    <span className="word-type">/{def.fl}/</span>
                    <ul className="def-list">
                        {def.shortdef.map((def, i) => {
                            return <li key={i}> + {def}</li>
                        })}
                    </ul>
                </div>
            });
        }else if(results[0] === "Wyszukaj słowo...") {

        return <p>Wyszukaj słowo...</p>

        }else{
            return <div>
                <p>Ups! Nie znamy tego słowa. Zażalenia kierujcie pod adres <a href="https://www.merriam-webster.com/">Merriam-Webster</a></p>
                </div>
                
        }
    }
    render(){
        const {results, getMore, syns, ants, search} = this.props;
        const processed = this.processResults( results );
        const synonimy = syns.map((syn, i) => {
            return <li key={i}>+ {syn.join(", ")}</li>
        });

        const antonimy = ants.map((ant, i) => {
            return <li key={i}>+ {ant.join(", ")}</li>
        });

        return (
            <section>
                <p><span className={this.state.activeTab === "0" ?
                "def-tab active" : "def-tab"} 
                onClick={e => {
                    this.setTab("0");
                    search(e)
                }}>Definicja</span>

                <span className={this.state.activeTab === "1" ?
                "more-tab active" : "more-tab"} 
                onClick={e => {
                    this.setTab("1");
                    getMore();
                }}>Więcej</span>
                </p>
                {
                    this.state.activeTab === "0"?
                    <div className="def-body">
                        {
                            processed
                         }
                </div>
                    :
                    <div className="more-body">
                        <h2>Synonimy:</h2>
                    {
                        synonimy.length ? <ul className="synonimy">{synonimy}</ul>: 
                        <p></p>
                    }
                    <h2>Antonimy:</h2>
                    {
                        antonimy.length ? <ul className="antonimy">{antonimy}</ul> : 
                        <p></p>
                    }
                </div> 
                }
            </section>
        )
    }
    
}


export default DisplayQuery;