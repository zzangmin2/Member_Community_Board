import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import Pagination from "../components/Pagination";

const BoardList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:4000/posts`)
        .then((res) => {
          console.log("불러오기 성공!");
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr
            className="w-full rounded text-sm font-medium text-gray-700 text-left border-t-2 border-b"
            style={{ fontSize: "0.9674rem" }}
          >
            <th className="w-3/4 px-4 py-2">
              <p className="w-100">제목</p>
            </th>
            <th className="px-4 py-2">작성자</th>
            <th className=" px-4">작성일</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700">
          {currentItems.map((item, index) => (
            <ListItem
              key={index}
              {...item}
              author={item.writer}
              date={item.modDate ? item.modDate : item.regDate}
              id={item.id}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default BoardList;
