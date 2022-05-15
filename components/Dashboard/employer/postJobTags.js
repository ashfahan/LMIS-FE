import { PlusOutlined } from '@ant-design/icons'
import { Input, Tag } from 'antd'
import React, { useState } from 'react'

const PostJobTags = (props) => {
  const [alltags, setAlltags] = useState({
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  })

  const handleClose = (removedTag) => {
    const tags = tags.filter((tag) => tag !== removedTag)
    setState({ tags })
  }

  const showInput = () => {
    setState({ inputVisible: true }, () => input.focus())
  }

  const handleInputChange = (e) => {
    setState({ inputValue: e.target.value })
  }

  const handleInputConfirm = () => {
    const { inputValue } = state
    let { tags } = state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })
  }

  const handleEditInputChange = (e) => {
    setState({ editInputValue: e.target.value })
  }

  const handleEditInputConfirm = () => {
    setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags]
      newTags[editInputIndex] = editInputValue

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      }
    })
  }

  const saveInputRef = (input) => {
    input = input
  }

  const saveEditInputRef = (input) => {
    editInput = input
  }

  const arr = [setAlltags]
  return (
    <>
      {
        arr.map((tag, index) => {
          if (arr.editInputIndex === index) {
            return (
              <Input
                ref={saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
        })

        // const isLongTag = tag.length > 20;

        // const tagElem = (
        //   <Tag
        //     className="edit-tag"
        //     key={tag}
        //     closable={index !== 0}
        //     onClose={() => handleClose(tag)}
        //   >
        //     <span
        //       onDoubleClick={e => {
        //         if (index !== 0) {
        //           setState({ editInputIndex: index, editInputValue: tag }, () => {
        //             editInput().focus();
        //           });
        //           e.preventDefault();
        //         }
        //       }}
        //     >
        //       {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        //     </span>
        //   </Tag>
        // );
        //   return isLongTag ? (
        //     <Tooltip title={tag} key={tag}>
        //       {tagElem}
        //     </Tooltip>
        //   ) : (
        //     tagElem
        //   );
        // })}
      }
      {arr.inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!arr.inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}

export default PostJobTags
