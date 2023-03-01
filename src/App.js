import "./App.css";
import { Row, Col } from "antd";
import { FormCom } from "./components/FormCom";
import { ArticlePage } from "./components/ArticlePage";
import { useState } from "react";
import { ArticleDetail } from "./components/ArticleDetail";
import { loadArticleById } from "./apis/article";

const colStyleProps = {
  style: { background: "#7aa4b2", height: "100vh", overflow: "auto" },
};

function App() {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState({});
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
  return (
    <div className="App">
      <Row>
        <Col
          span={12}
          style={{
            height: "100vh",
            boxSizing: "border-box",
            padding: "60px",
            overflow: "auto",
          }}
        >
          <FormCom />
        </Col>
        <Col span={12} {...colStyleProps}>
          <ArticlePage chooseDetail={chooseArticleDetail} />
        </Col>
      </Row>
      <ArticleDetail article={article} open={open} changeOpen={changeOpen} />
    </div>
  );
}

export default App;
