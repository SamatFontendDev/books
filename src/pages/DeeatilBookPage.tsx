import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Error from "../components/Error"
import Loader from "../components/Loader"
import { useGetBookQuery } from "../store/googleBooks/googleBooks.api"

const DeeatilBookPage = () => {
   const {id} = useParams()

   const {isLoading, isError, data} = useGetBookQuery(id)
   

    return (
        <div>
            {isError && <Error text="Что то пошло не так" />}
            {isLoading ? <Loader/> : 
                <div className="book-card">
                    <div className="book-card__pic">
                        <img src={data?.volumeInfo.imageLinks.small} className="book-card__img" />
                    </div>
                    <div className="book-card__name">{data?.volumeInfo.title}</div>
                    <div className="book-card__authors">{data?.volumeInfo?.authors?.map(item => <div key={Date.now() + item} className="author">{item}</div>)}</div>
                    <div className="categories">
                       {data?.volumeInfo.categories !== undefined && data?.volumeInfo?.categories?.map(item => <div key={Date.now() + item} className="author">{item}</div>)}
                    </div>
                    <div className="desc">{data?.volumeInfo.description}</div>
                </div>
            }
        </div>
    )
}

export default DeeatilBookPage