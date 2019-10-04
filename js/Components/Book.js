import React, {Component}from "react";
import books from "./books";
import BookSelect from "./BookSelect";
import BookDisplay from "./BookDisplay";

class Book extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            book: null
        }

        this.selectBook = this.selectBook.bind(this);
        this.showSelect = this.showSelect.bind(this);
    }

    componentDidMount(){
        this.setState({
            books: books
        });
    }

    showSelect(){
        this.setState({
            book: null
        });
    }
    selectBook(id){
        const that = this;
        return function(e){
            const selectedBook = that.state.books.filter((book) => {
                return book.id === id;
            });

            that.setState({
                book: selectedBook[0]
            });

        }
    }


    render(){
        return (
            <div id="book-panel">
                {this.state.book ? <><nav>Czytasz: {this.state.book.title} <button 
                    onClick={this.showSelect} className="btn">Zmień</button></nav></> : null }
                {
                    this.state.book? 
                    <BookDisplay book={this.state.book} /> :
                    <BookSelect books={books} selectBook={this.selectBook} />
                }

            </div>
        )
    }
}


export default Book;
