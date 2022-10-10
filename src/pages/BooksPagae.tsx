import React, { useState } from "react"
import BookItem from "../components/BookItem"
import { useLazyGetMoreQuery, useLazySearchBooksQuery } from "../store/googleBooks/googleBooks.api"
import {Link} from 'react-router-dom'
import Loader from "../components/Loader"
import Error from "../components/Error"


const BooksPage = () => {
    const [search, setSearch] = useState('')
    const [orderBy, setOrderBy] = useState('relevance')
    const [startIndex, setStartIndex] = useState(30)
    const [fetchBooks, {isFetching, isError, data, isSuccess}] = useLazySearchBooksQuery()
    const [fetchMoreBooks, {isLoading, isError:errorMore, data:moreBooks}] = useLazyGetMoreQuery()
    const [subject, setSubject] = useState('all')
    const [moreBooksArray, setMoreBooksArray] = useState([])

    let params = {
        q:search, 
        orderBy: orderBy,
        maxResults: 30,
        startIndex: 0
    }
    const clickHandler = () => {
        if(search.length > 0) {
            params.q = search
            
            fetchBooks(params)
        }
        
        return
    }

    const handlerSort = (e:any) => {
        setOrderBy(e.target.value)

        params.orderBy = orderBy

        fetchBooks(params)
    }

    const handleLoadMoreClick = () => {
        fetchMoreBooks({q: search, startIndex: startIndex})
        setStartIndex(startIndex + 30)
    }
    
    const handleChangeSubject = (e:any) => {
        setSubject(e.target.value)
    } 

    return (
        <div className="wrapper">
            <h1 className="main-title">Поиск книг</h1>
            <form
            className="form"
            onSubmit={e => e.preventDefault()}
            >
                <div className="form__content">
                    <div className="input-wrap">
                        <input 
                        onKeyDown={e => {
                            if (e.keyCode === 13) {
                               clickHandler()
                            }
                        }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text" 
                        className="input"/>
                        <svg 
                        onClick={clickHandler}
                        className="svg-search" 
                        fill="#000"
                        xmlns="http://www.w3.org/2000/svg"  
                        viewBox="0 0 30 30" 
                        width="20px" 
                        height="20px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>
                    </div>
                    <div className="select-wrap">
                        <select value={subject} onChange={handleChangeSubject} className="select">
                            <option value="all">all</option>
                            <option value="art">art</option>
                            <option value="biography">biography</option>
                            <option value="computers">computers</option>
                            <option value="history">history</option>
                            <option value="medical">biography</option>
                            <option value="poetry">poetry</option>
                        </select>
                  </div>
                  <div className="select-wrap">
                        <select value={orderBy} onChange={handlerSort} className="select">
                            <option value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                   </div>
                </div>
            </form>
            {isError && <Error text="Что то пошло не так" />}
            {isSuccess && <p className="all-books">Всего: {data?.totalItems}</p>}
            <div className="books">
                <div className="books-wrap">
                    {isFetching ? <Loader/> : 
                                
                                data?.totalItems === 0 ? <div className="nothing">По вашему запросу ничего не найдено</div> :
                                data?.items?.map(item => {
                                    return(
                                        <Link className="book__link"  key={item.id} to={item.id}>
                                            <BookItem data={item.volumeInfo} />
                                        </Link>
                                    )
                                })
                    }
                </div>
                <div className="books-wrap">
                    {isLoading ? <Loader/> : 
                                
                                moreBooks?.totalItems === 0 ? <div className="nothing">По вашему запросу ничего не найдено</div> :
                                moreBooks?.items?.map(item => {
                                    return(
                                        <Link className="book__link"  key={item.id} to={item.id}>
                                            <BookItem data={item.volumeInfo} />
                                        </Link>
                                    )
                                })
                    }
                </div>
                {isSuccess ? 
                        <div className="load-more-btn__wrap">
                            <div 
                            onClick={handleLoadMoreClick}
                            className="load-more-btn">Загрузить еще</div>
                        </div> :
                        ''
                    }
            </div>
        </div>
    )
}

export default BooksPage