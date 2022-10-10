import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Root } from '../../models/detailBookModel'
import { SearchResponse } from '../../models/models'

const apiKey = 'AIzaSyCbwxQqjbNe7fzpzVBTV8ycM7gRapN68JI'

export const googleBooksApi = createApi({
    reducerPath: 'googleBooks/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.googleapis.com/books/v1/'
    }),
    endpoints: build => ({
        searchBooks: build.query<SearchResponse, object>({
            query: (obj: object) => ({
                url: `volumes`,
                params: {
                    ...obj,
                    key: apiKey,
                }
            }),
        }),
        getBook: build.query<Root, any>({
            query: (id: any) => ({
                url: `volumes/${id}`,
                key: apiKey
            })
        }),
        getMore: build.query<SearchResponse, object>({
            query: (obj: object) => ({
                url: `volumes`,
               params: {
                    ...obj,
                   maxResults: 30,
                   key: apiKey,
               }
            })
        })
    })
})

export const {useLazySearchBooksQuery, useGetBookQuery, useLazyGetMoreQuery} = googleBooksApi