import { loadArticles } from "../apis/article";
import { Button, Form, Input, Space, Tag } from "antd";

import { useState } from "react";

const searchType = ["TAG", "CONTENT", "MIXED"];

export const FormCom = (props) => {
  const [tags, setTags] = useState("");
  const [form] = Form.useForm();

  const calcType = (values) => {
    console.log("values", values);
    if (values.keyWords && values.content) {
      return 2;
    } else if (!values.keyWords && values.content) {
      return 1;
    } else if (values.keyWords && !values.content) {
      return 0;
    } else {
      return -1;
    }
  };
  const onFinish = async (values) => {
    const searchTypeIndex = calcType(values);
    if (searchTypeIndex === -1) {
      return;
    }
    const data = {
      pageSize: 20,
      currentPage: 1,
      type: searchType[searchTypeIndex],
      tags: values.keyWords.split(" "),
      content: values.content,
    };
    try {
      const {
        data: { pagination },
      } = await loadArticles(data);
      console.log(pagination);
      props.onArticlePageList(pagination);
    } catch (error) {
      console.log(error);
    }
  };
  const onValuesChange = (changeValues, allValue) => {
    if (changeValues.keyWords) {
      setTags(changeValues.keyWords);
    }
  };
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item name="keyWords" label="关键字">
        <Input placeholder="请输入关键字(关键字间按空格隔开)" />
      </Form.Item>
      <Space style={{ marginBottom: "10px" }} size={[0, 8]} wrap>
        {tags !== "" &&
          tags.split(" ").map((item, index) => (
            <Tag color="#fab35b" key={index}>
              {item}
            </Tag>
          ))}
      </Space>
      <Form.Item name="content" label="内容">
        <Input.TextArea
          placeholder="请输入文章内容"
          showCount={true}
          autoSize={{ minRows: 15 }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={{
            width: "200px",
            marginTop: "100px",
            background: "#136885",
            fontWeight: "bold",
          }}
          htmlType="submit"
        >
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
};
