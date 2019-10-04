import React from "react";



function BookDisplay(props) {
    const {book} = props;
    return (
        <div id="book-display">
            
            <h1 className="book-title">{book.title}</h1>
            <h3 className="book-author">{book.author}</h3>
            <section className="book-content">
                {book.parts.map((part, i) => {
                    return <p key={i}>{part}</p>
                })}
            </section>
        </div>
    )
}

export default BookDisplay;