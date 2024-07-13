import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext/userContext";

const GetStudents = () => {
  const { allStudents, setallStudents, user } = useContext(userContext);
  const [status, setStatus] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [ids, setIds] = useState("");
  const [show, setShow] = useState({});
  const [count, setCount] = useState({ present: 0, absent: 0, leaves: 0 });

  //! Update Student
  const updateStudents = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        `http://localhost:3001/admin/updateStudentsData/${ids}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );
      const updatedStudent = await data.json();

      // Update the local state with the new student data
      setallStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === updatedStudent._id ? updatedStudent : student
        )
      );

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setStatus(e.target.value);
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setStatus(student.status);
    setIds(student._id);
    const modalElement = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modalElement.show();
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setStatus("");
    const modalElement = window.bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modalElement.hide();
  };

  useEffect(() => {
    const countStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/admin/countStudent/${show.email}`
        );
        const countData = await response.json();
        setCount(countData);
      } catch (error) {
        console.log(error);
      }
    };

    if (show.email) {
      countStudents();
    }
  }, [show.email]);

  return (
    <>
      <table>
        <caption>Students Attendance</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DATE</th>
            <th scope="col">NAME</th>
            <th scope="col">STATUS</th>
            <th scope="col">Action</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allStudents.map((student, i) => (
            <tr key={student._id}>
              <td data-label="ID">{i + 1}</td>
              <td data-label="Date">{new Date(student.date).toISOString().slice(0, 10)}</td>
              <td data-label="Name">{student.fullName}</td>
              <td data-label="Status">
                {student.status ? student.status : "Pending"}
              </td>
              <td
                className="edit"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
                onClick={() => setShow(student)}
              >
                Show
              </td>
              <td
                className="edit"
                data-label="Action"
                onClick={() => openModal(student)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {selectedStudent ? selectedStudent.fullName : ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateStudents}>
                <div className="input-box">
                  <input
                    type="text"
                    required
                    name="status"
                    value={status}
                    onChange={handleInput}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* show */}
      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            {show.fullName}
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <p>Present: {count.present}</p>
          <p>Absent: {count.absent}</p>
          <p>Leaves: {count.leaves}</p>
          <p>
            {count.present >= 26
              ? "A Grade"
              : count.present >= 18 && count.present < 26
              ? "B Grade"
              : count.present > 10 && count.present < 18
              ? "C Grade"
              : "D Grade"}
          </p>
        </div>
      </div>
    </>
  );
};

export default GetStudents;
