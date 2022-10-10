import React from "react"
import { VolumeInfo } from "../models/models"

const BookItem = ({data}:{data: VolumeInfo}) => {
    return(
        <div className="book__item">
            <div className="book__pic">
                <img className="book__img" src={data?.imageLinks?.smallThumbnail} />
            </div>
            <div className="book__title">{data?.title}</div>
            <div className="categories">
               {data.categories !== undefined ? <div className="category">{data.categories[0]}</div>: ''}
            </div>
            <div className="authors">
                {data.authors?.map(item => <div key={Date.now() + item} className="author">{item}</div>)}
            </div>
        </div>
    )
}

export default BookItem