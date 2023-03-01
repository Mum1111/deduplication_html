import { Pagination, Tag } from "antd";
import dayjs from "dayjs";

const mockData = {
  pagination: {
    total_size: 100,
    current_page: 1,
    page_size: 20,
    list: [
      {
        id: 1,
        tags: ["a", "b", "c"],
        title: "我是一个标题",
        content: ".....疾病的治疗方案是....",
        text_num: 3597,
        publish_time: "2023-02-28T06:27:06.199Z",
        create_time: "2023-02-28T06:27:06.199Z",
        update_time: "2023-02-28T06:27:06.199Z",
      },
      {
        id: 2,
        tags: ["a", "b", "c"],
        title: "我是一个标题",
        content: ".....疾病的治疗方案是....",
        text_num: 3597,
        publish_time: "2023-02-28T06:27:06.199Z",
        create_time: "2023-02-28T06:27:06.199Z",
        update_time: "2023-02-28T06:27:06.199Z",
      },
      {
        id: 3,
        tags: ["a", "b", "c"],
        title: "我是一个标题",
        content: ".....疾病的治疗方案是....",
        text_num: 3597,
        publish_time: "2023-02-28T06:27:06.199Z",
        create_time: "2023-02-28T06:27:06.199Z",
        update_time: "2023-02-28T06:27:06.199Z",
      },
      {
        id: 4,
        tags: ["a", "b", "c"],
        title: "我是一个标题",
        content:
          "疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是....",
        text_num: 3597,
        publish_time: "2023-02-28T06:27:06.199Z",
        create_time: "2023-02-28T06:27:06.199Z",
        update_time: "2023-02-28T06:27:06.199Z",
      },
      {
        id: 5,
        tags: ["a", "b", "c"],
        title: "我是一个标题",
        content:
          "疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是....",
        text_num: 3597,
        publish_time: "2023-02-28T06:27:06.199Z",
        create_time: "2023-02-28T06:27:06.199Z",
        update_time: "2023-02-28T06:27:06.199Z",
      },
      {
        id: 6,
        tags: ["a", "b", "c"],
        title: "我是一个标题",
        content:
          "疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是疾病的治疗方案是....",
        text_num: 3597,
        publish_time: "2023-02-28T06:27:06.199Z",
        create_time: "2023-02-28T06:27:06.199Z",
        update_time: "2023-02-28T06:27:06.199Z",
      },
    ],
  },
};

export const ArticlePage = (props) => {
  const chooseDetail = (articleId) => {
    props.chooseDetail(articleId);
  };
  return (
    <div
      style={{
        boxSizing: "border-box",
        padding: "40px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "fle",
      }}
    >
      <div
        className="content_container"
        style={{ height: "80vh", overflow: "auto" }}
      >
        {mockData.pagination.list.map((item) => (
          <div
            key={item.id}
            onClick={() => chooseDetail(item.id)}
            style={{
              backgroundColor: "#fff",
              color: "#4d4d4d",
              marginBottom: "10px",
              boxSizing: "border-box",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "14px", margin: "5px 0" }}>
              {item.content}
            </div>
            <div className="tags">
              {item.tags.map((it, index) => (
                <Tag key={index}>{it}</Tag>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <div>
                发布时间:
                {dayjs(item.publish_time).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <div>字数:{item.text_num}</div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        showSizeChanger={false}
        defaultCurrent={1}
        total={mockData.pagination.total_size}
      />
    </div>
  );
};
