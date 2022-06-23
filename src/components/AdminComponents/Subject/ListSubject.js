import React, { useState } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { deleteSubject } from "../../../api/subject";
import { getAccessToken } from "../../../api/auth";
import EditSubjectForm from "./EditSubject";
import AddSubjectForm from "./AddSubject";
import Modal from "../../Modal";

const { confirm } = ModalAntd;

export default function ListSubject(props) {
  /* page user */
  const { subjects, setReloadSubjects } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addSubjectModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva materia");
    setModalContent(
      <AddSubjectForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadSubjects={setReloadSubjects}
      />
    );
  };

  return (
    <div className="list-subject">
      <div className="list-subject__header">
        <div className="list-subject__header-switch">
          <List.Item
            actions={[
              <Button type="primary" onClick={addSubjectModal}>
                <EditOutlined />
              </Button>,
            ]}
          ></List.Item>
        </div>
      </div>

      <Subjects
        subjects={subjects}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadUsers={setReloadSubjects}
      />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Subjects(props) {
  const {
    subjects,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadSubjects,
  } = props;

  const EditSubject = (subject) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${subject.department ? subject.department : "..."}
      }`
    );
    setModalContent(
      <EditSubjectForm
        subject={subject}
        setIsVisibleModal={setIsVisibleModal}
        setReloadSubjects={setReloadSubjects}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={subjects}
      renderItem={(subject) => (
        <Subject
          subject={subject}
          editSubject={EditSubject}
          setReloadsubjects={setReloadSubjects}
        />
      )}
    />
  );
}

function Subject(props) {
  const { subject, editSubject, setReloadSubjects } = props;

  const showDeleteConfirm = () => {
    // const accesToken = getAccessToken();

    confirm({
      title: "Eliminando asignatura",
      content: `¿Estas seguro que quieres eliminar la asignatura a ${subject.department}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteSubject(subject._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadSubjects(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editSubject(subject)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`
                ${subject.department ? subject.department : "..."} 
            `}
        description={subject._id}
      />
    </List.Item>
  );
}
