import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getGoods,
  totalCountPages,
  createPages,
  setCurrentPage
} from '../redux/reducers/cards'

const Pages = () => {
  const dispatch = useDispatch()
  const { currentPage, totalCount, perPage } = useSelector((s) => s.cards)
  const pagesCount = Math.ceil(totalCount / perPage)
  const pages = []
  createPages(pages, pagesCount, currentPage)

  useEffect(() => {
    dispatch(getGoods(currentPage, perPage))
    dispatch(totalCountPages())
  }, [currentPage, perPage])

  const onClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  }

  return (
    <div className="flex gap-2 h-14 items-center justify-center">
      {pages.map((page) => {
        return (
          <button
            type="button"
            key={page}
            className={currentPage === page ? 'current_page' : 'page'}
            onClick={() => onClick(page)}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default Pages
