/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Collection } from './Collection'
import './index3.scss'

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function Photos() {
  const [category, setCategory] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [collections, setCollections] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)

  const queryCategory = category ? `category=${category}` : ''

  React.useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://f00c1997ad072b96.mokky.dev/collections?page=${page}&limit=2&${queryCategory}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json.items)
        setTotalPages(json.meta.total_pages)
        console.log(json)
      })
      .catch((err) => console.warn(err))
      .finally(() => setIsLoading(false))
  }, [category, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((item, i) => (
            <li
              className={category === i ? 'active' : ''}
              key={i}
              onClick={() => (setCategory(i), setPage(1))}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, i) => (
              <Collection key={i} name={item.name} images={item.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {totalPages > 1 &&
          [...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Photos
