import React from "react";

function BookSelect(props) {
    return (
        <div id="book-select">
            <h1>Wybierz opowiadanie: </h1>
            <ul>{
                props.books.map( (book, i) => {
                    return <li key={book.id} onClick={props.selectBook(book.id)}>
                        <img src={book.cover}/>
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                    </li>
                })
            }</ul>


        </div>
    )
    }



    export default BookSelect;