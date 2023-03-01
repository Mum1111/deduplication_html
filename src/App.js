import "./App.css";
import { Row, Col } from "antd";
import { FormCom } from "./components/FormCom";
import { ArticlePage } from "./components/ArticlePage";

const colStyleProps = {
  style: { background: "#7aa4b2", height: "100vh", overflow: "auto" },
};

function App() {
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
          <ArticlePage />
        </Col>
      </Row>
    </div>
  );
}

export default App;
