import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Input, Table, Tag, Row, Col, Skeleton, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const { Search } = Input;
// Component to display a table of posts
const TableDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page from URL query parameter
  let queryParams = new URLSearchParams(location.search);
  const currentPageParam = queryParams.get("page");
  const currentPage = currentPageParam ? parseInt(currentPageParam) : 1;
  const selectedTagsParam = queryParams.getAll("tags");
  // State variables
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || ""
  );
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState(
    selectedTagsParam.length ? selectedTagsParam : []
  );
  //   const [selectedTags, setSelectedTags] = useState([]);

  // Fetch posts from API based on current page
  // const fetchPosts = async (page, searchQuery, tags) => {
  //   setLoading(true);
  //   const limit = 10;
  //   const skip = (page - 1) * limit;
  //   let url = `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`;
  //   if (searchQuery) {
  //     url = `https://dummyjson.com/posts/search?q=${searchQuery}&skip=${skip}&limit=${limit}`;
  //     console.log(url);
  //   }

  //   try {
  //     const response = await axios.get(url);
  //     setPosts(response.data.posts);
  //     setTotalPage(response.data.total);
  //     const filteredPosts = posts.filter((post) => {
  //       return selectedTags.every((tag) => post.tags.includes(tag));
  //     });
  //     setFilteredPosts(filteredPosts);
  //     //   console.log(totalPage);

  //     // Update URL query parameter with current page
  //     queryParams.set("page", page);
  //     if (searchQuery) {
  //       queryParams.set("search", searchQuery);
  //     } else {
  //       queryParams.delete("search");
  //     }
  //     queryParams.delete("tags");
  //     tags.forEach((tag) => queryParams.append("tags", tag));
  //     navigate({ search: queryParams.toString() });
  //   } catch (error) {
  //     // Handle errors
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchPosts = async (page, searchQuery, tags) => {
    setLoading(true);
    const limit = 10;
    const skip = (page - 1) * limit;
    let url = `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`;

    if (searchQuery) {
      url = `https://dummyjson.com/posts/search?q=${searchQuery}&skip=${skip}&limit=${limit}`;
    }

    try {
      const response = await axios.get(url);
      const fetchedPosts = response.data.posts;

      // Filter posts based on selected tags
      const filteredPosts = fetchedPosts.filter((post) => {
        return tags.every((tag) => post.tags.includes(tag));
      });

      setPosts(fetchedPosts);
      setFilteredPosts(filteredPosts);
      setTotalPage(response.data.total);

      // Update URL query parameters
      const newQueryParams = new URLSearchParams(location.search);
      newQueryParams.set("page", page);
      if (searchQuery) {
        newQueryParams.set("search", searchQuery);
      } else {
        newQueryParams.delete("search");
      }
      newQueryParams.delete("tags");
      tags.forEach((tag) => newQueryParams.append("tags", tag));
      navigate({ search: newQueryParams.toString() });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    // Update search query state
  };

  // Handle table pagination and fetch new data
  const handleTableChange = (pagination, filters, sorter) => {
    fetchPosts(pagination.current, searchQuery, selectedTags);
  };

  const handleNewFilter = (selectedTags) => {
    setSelectedTags(selectedTags);

    // Filter posts based on selected tags
    const filteredPosts = posts.filter((post) => {
      return selectedTags.every((tag) => post.tags.includes(tag));
    });
    setFilteredPosts(filteredPosts);
  };

  // Fetch posts when component mounts or current page changes
  useEffect(() => {
    fetchPosts(currentPage, searchQuery, selectedTags);
  }, [currentPage, searchQuery, selectedTags]);
  console.log(posts);
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
  // Render loading state if data is still being fetched
  // if (loading) {
  //   return <div><Spin/></div>;
  // }
  // Render the table component
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          style={{ width: "100%" }}
          placeholder="Select Filter"
          onChange={handleNewFilter}
          value={selectedTags}
          mode="multiple"
        >
          {[
            "crime",
            "history",
            "american",
            "magical",
            "english",
            "french",
            "mystery",
          ].map((tag) => (
            <Select.Option key={tag} value={tag}>
              {tag}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} sm={12} md={16} lg={18}>
        <Search
          placeholder="Search posts"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={filteredPosts.length < 1 ? posts : filteredPosts}
          pagination={{
            total: totalPage,
            pageSize: 10,
          }}
          onChange={handleTableChange}
          scroll={{ x: true }}
          loading={loading ? <Spin /> : false}
        />
      </Col>
    </Row>
  );
};

export default TableDisplay;
