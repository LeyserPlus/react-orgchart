import React from "react";
import "./MyNode.css";



const rowMaxRenderPersonCount = 3;

const itemWidth = 85;

const getContainerWidth = (
  rowCount = rowMaxRenderPersonCount,
  count = 0
) => {
  if (count < rowCount) {
    return count * itemWidth;
  }

  return rowCount * itemWidth;
};

const MyNode = ({ nodeData }) => {
  const selectNode = (employee) => {
    alert("Hi All. I'm " + employee.name + ". I'm a " + employee.description + ".");
  };

  return (
    <div
      className={`leaf ${ (nodeData.staff || []).length === 0 ? "emptyNode" : ""
        }`}

    >
      <div className="header">
        <div>{nodeData.name}</div>
      </div>
      {(nodeData.staff || []).length > 0 && (
        <ul
          className="stuff"
          style={{
            width: getContainerWidth(nodeData.rowCount,nodeData.staff?.length),
          }}
        >
          {(nodeData.staff || []).map((employee,index) => (
            <li
              key={employee.id + index}
              className={`person ${ employee.isLeader ? "leader" : "" }`}
              style={{
                width: itemWidth,
                textOverflow: "clip",
              }}
              onClick={() => { selectNode(employee) }}
            >
              {<img src={employee.avatar} alt="" />}
              <span className="personName">{employee.name}</span>
              <span className="personDescription">{employee.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyNode;
