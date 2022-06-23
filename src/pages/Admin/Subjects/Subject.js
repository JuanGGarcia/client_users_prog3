import React, { useState, useEffect } from "react";
import "./Subject.scss";
import { getAccessToken } from "../../../api/auth";
import ListSubject from "../../../components/AdminComponents/Subject/ListSubject";
import { getSubjects } from "../../../api/subject";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [reloadSubjects, setReloadSubject] = useState(false);
  const token = getAccessToken();

  useEffect(() => {
    getSubjects(token).then((response) => {
      setSubjects(response.subjects);
    });
    setReloadSubject(false);
  }, [token, reloadSubjects]);

  return (
    <ListSubject
      subjects={subjects}
      setReloadSubject={setReloadSubject}
    ></ListSubject>
  );
}
