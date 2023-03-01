import "./App.css";
import { Row, Col, Tabs } from "antd";
import { FormCom } from "./components/FormCom";
import { ArticlePage } from "./components/ArticlePage";
import { useState } from "react";
import { ArticleDetail } from "./components/ArticleDetail";
import { loadArticleById } from "./apis/article";
import { UploadCom } from "./components/UploadCom";

const colStyleProps = {
  style: { background: "#7aa4b2", height: "100vh", overflow: "auto" },
};

function App() {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState({});
  const [articleList, setArticleList] = useState({});

  const loadArticleDetail = async (articleId) => {
    try {
      const res = await loadArticleById(articleId);
      setArticle(res);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const chooseArticleDetail = (articleId) => {
    console.log(articleId);
    loadArticleDetail(articleId);
  };

  const changeOpen = (open) => {
    setOpen(open);
  };

  const onArticlePageList = (pages) => {
    setArticleList(pages);
  };

  const tabsItems = [
    {
      key: "1",
      label: `搜索`,
      children: <FormCom onArticlePageList={onArticlePageList} />,
    },
    {
      key: "2",
      label: `上传素材`,
      children: <UploadCom />,
    },
  ];
  return (
    <div className="App">
      <Row>
        <Col
          span={12}
          style={{
            height: "100vh",
            boxSizing: "border-box",
            padding: "0 60px 60px",
            overflow: "auto",
          }}
        >
          <Tabs defaultActiveKey="1" centered items={tabsItems} />
        </Col>
        <Col span={12} {...colStyleProps}>
          <ArticlePage
            chooseDetail={chooseArticleDetail}
            articleList={articleList}
          />
        </Col>
      </Row>
      <ArticleDetail article={article} open={open} changeOpen={changeOpen} />
    </div>
  );
}

export default App;
