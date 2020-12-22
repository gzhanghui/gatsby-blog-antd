import React from 'react'
import { Link } from 'gatsby'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'
const Pagination = ({ pageContext }) => {
  const {
    previousPagePath,
    nextPagePath,
    numberOfPages,
    pageNumber,
  } = pageContext
  const numPages = []
  for (let i = 0; i < numberOfPages; i++) {
    numPages.push(i)
  }
  return (
    <nav>
      <ul className="ant-pagination">
        <li
          className={classnames('ant-pagination-prev', {
            'ant-pagination-disabled': !previousPagePath,
          })}
        >
          <button
            className="ant-pagination-item-link"
            type="button"
            tabIndex="-1"
          >
            <Link
              to={previousPagePath}
              className="page-link"
              disabled={!previousPagePath}
            >
              <LeftOutlined />
            </Link>
          </button>
        </li>
        {numPages.map(number => (
          <li
            key={number}
            className={classnames('ant-pagination-item', {
              'ant-pagination-item-active': number === pageNumber,
            })}
          >
            {number === 0 ? (
              <Link to={`/posts`}>{number + 1}</Link>
            ) : (
              <Link to={`/posts/${number + 1}`}>{number + 1}</Link>
            )}
          </li>
        ))}
        <li
          className={classnames('ant-pagination-next', {
            'ant-pagination-disabled': !nextPagePath,
          })}
        >
          <button className="ant-pagination-item-link">
            <Link
              to={nextPagePath}
              className="page-link"
              disabled={!nextPagePath}
            >
              <RightOutlined />
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
