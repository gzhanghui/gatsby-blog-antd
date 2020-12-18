import React from "react"
const PostTag = props => {
  return (
    <div className="post-tag">
      <i>
        <svg className="tag-icon" aria-hidden="true">
          <use xlinkHref="#icon-test-jsx"></use>
        </svg>
      </i>
      <span>icon-test-js</span>
    </div>
  )
}
export default PostTag
