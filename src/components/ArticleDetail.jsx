import { Modal, Input, Space, Tag, theme, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const ArticleDetail = (props) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(["Unremovable", "Tag 2", "Tag 3"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const { article } = props;

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    // TODO 发起删除的请求
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
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

  const articleMock = {
    id: "aaaaaaaaaaaaaaaa",
    tags: ["a", "b", "c"],
    title: "我是一个标题",
    content:
      ".....疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是....",
    text_num: 3597,
    publish_time: "2023-03-01T04:32:45.716Z",
    create_time: "2023-03-01T04:32:45.716Z",
    update_time: "2023-03-01T04:32:45.716Z",
  };
  return (
    <>
      <Modal
        title={articleMock.title}
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
              {articleMock.tags.map((tag, index) => {
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
        <div style={{ margin: "10px 0" }}>{articleMock.content}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            发布时间:
            {dayjs(articleMock.publish_time).format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <div>字数:{articleMock.text_num}</div>
        </div>
      </Modal>
    </>
  );
};
