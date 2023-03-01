import { Modal } from "antd";
import { useState } from "react";

export const ArticleDetail = (props) => {
  //   const [open, setOpen] = useState(false);
  const changeOpen = (open) => {
    props.changeOpen(open);
  };
  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        open={props.open}
        onOk={() => changeOpen(false)}
        onCancel={() => changeOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
