// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Select, Input, Table, Tag } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";
// const TableDisplay = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   let queryParams = new URLSearchParams(location.search);
//   const currentPageParam = queryParams.get("page");
//   const currentPage = currentPageParam ? parseInt(currentPageParam) : 1;
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [totalPage, setTotalPage] = useState(0);
//    // Initialize search query from URL parameter
//   const fetchPosts = async (page) => {
//     const limit = 10;
//     const skip = (page - 1) * limit;
//     const url = `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`;
//     try {
//       const response = await axios.get(url);
//       setPosts(response.data.posts);
//       setTotalPage(response.data.total);
//       queryParams.set("page", page);
//       navigate({ search: queryParams.toString() });
//     } catch (error) {
//       // Handle errors
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   //   search?q=love

//   const handleTableChange = (pagination, filters, sorter) => {
//     fetchPosts(pagination.current);
//   };

//   useEffect(() => {
//     fetchPosts(currentPage);
//   }, [currentPage]);
//   //   console.log(posts);
//   const columns = [
//     {
//       title: "Id",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Summary",
//       dataIndex: "body",
//       key: "body",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       render: (_, { tags }) => (
//         <>
//           {tags.map((tag) => {
//             let color = tag.length > 5 ? "geekblue" : "green";
//             if (tag === "loser") {
//               color = "volcano";
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: "Reactions",
//       dataIndex: "reactions",
//       key: "reactions",
//     },
//   ];
//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={posts}
//         pagination={{
//           current: currentPage,
//           total: totalPage,
//           pageSize: 10,
//         }}
//         onChange={handleTableChange}
//       />
//     </div>
//   );
// };

// export default TableDisplay;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Input, Table, Tag } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

// Component to display a table of posts
const TableDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current page from URL query parameter
  let queryParams = new URLSearchParams(location.search);
  const currentPageParam = queryParams.get("page");
  const currentPage = currentPageParam ? parseInt(currentPageParam) : 1;

  // State variables
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  // Fetch posts from API based on current page
  const fetchPosts = async (page) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const url = `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`;
    try {
      const response = await axios.get(url);
      setPosts(response.data.posts);
      setTotalPage(response.data.total);
      
      // Update URL query parameter with current page
      queryParams.set("page", page);
      navigate({ search: queryParams.toString() });
    } catch (error) {
      // Handle errors
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle table pagination and fetch new data
  const handleTableChange = (pagination, filters, sorter) => {
    fetchPosts(pagination.current);
  };

  // Fetch posts when component mounts or current page changes
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // Define columns for the table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Summary",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Reactions",
      dataIndex: "reactions",
      key: "reactions",
    },
  ];

  // Render the table component
  return (
    <div>
      <Table
        columns={columns}
        dataSource={posts}
        pagination={{
          current: currentPage,
          total: totalPage,
          pageSize: 10,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TableDisplay;
