import { Modal, Input, Space, Tag, theme, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { createTag, delTag } from "../apis/article";

export const ArticleDetail = (props) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(props.article.tags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const { article } = props;

  //   setTags(article.tags);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = async (removedTag) => {
    console.log("remove", removedTag);
    const newTags = article.tags.filter((tag) => tag !== removedTag);
    // TODO 发起删除的请求
    console.log("articleId", article.id);
    try {
      await delTag(article.id, removedTag);
    } catch (error) {
      console.log(error);
    }

    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = async () => {
    console.log("tags", article.tags);
    if (inputValue && article.tags.indexOf(inputValue) === -1) {
      setTags([...article.tags, inputValue]);
      await createTag(article.id, inputValue);
      //TODO: 接口已经通了 页面没有刷新
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = async () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    console.log(newTags[editInputIndex]);
    // 添加tags的请求

    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  const tagInputStyle = {
    width: 78,
    verticalAlign: "top",
  };
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const changeOpen = (open) => {
    props.changeOpen(open);
  };
  return (
    <>
      <Modal
        title={article.title}
        centered
        open={props.open}
        onOk={() => changeOpen(false)}
        onCancel={() => changeOpen(false)}
        width={1000}
        okText="完成"
        cancelText="取消"
      >
        <>
          <Space size={[0, 8]} wrap>
            <Space size={[0, 8]} wrap>
              {article.tags &&
                article.tags.map((tag, index) => {
                  if (editInputIndex === index) {
                    return (
                      <Input
                        ref={editInputRef}
                        key={tag}
                        size="small"
                        style={tagInputStyle}
                        value={editInputValue}
                        onChange={handleEditInputChange}
                        onBlur={handleEditInputConfirm}
                        onPressEnter={handleEditInputConfirm}
                      />
                    );
                  }
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag
                      key={tag}
                      closable={true}
                      style={{
                        userSelect: "none",
                      }}
                      onClose={() => handleClose(tag)}
                    >
                      <span
                        onDoubleClick={(e) => {
                          if (index !== 0) {
                            setEditInputIndex(index);
                            setEditInputValue(tag);
                            e.preventDefault();
                          }
                        }}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
            </Space>
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={tagPlusStyle} onClick={showInput}>
                <PlusOutlined /> 打标注
              </Tag>
            )}
          </Space>
        </>
        <div style={{ margin: "10px 0" }}>{article.content}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            发布时间:
            {dayjs(article.publish_time).format("YYYY-MM-DD HH:mm:ss")}
          </div>
          {article.text_num ? <div>字数:{article.text_num}</div> : ""}
        </div>
      </Modal>
    </>
  );
};
