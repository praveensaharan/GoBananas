import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Container,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/posts/search?q=${searchQuery}&skip=${
          (pagination.current - 1) * pagination.pageSize
        }&limit=${pagination.pageSize}`
      );
      const { posts, total } = response.data;
      setPosts(posts);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location, searchQuery, pagination.pageSize]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
    }));
    navigate(`?page=1&search=${value}`);
  };

  const handlePaginationChange = (event, page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
    }));
    navigate(`?page=${page}`);
  };

  const columns = [
    { id: "title", label: "Title", className: "text-sky-600 font-semibold" },
    { id: "body", label: "Body", className: "text-gray-700" },
    {
      id: "tags",
      label: "Tags",
      render: (tags) => (
        <span className="text-gray-600 capitalize">{tags.join(", ")}</span>
      ),
    },
  ];

  return (
    <section className="bg-gray-100">
      <Container className="mx-auto p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p variant="h3" className="text-3xl font-bold text-gray-600 mb-4">
            Explore Awesome Posts
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-4"
        >
          <TextField
            placeholder="Search posts"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
            size="small"
            variant="outlined"
            className="w-full max-w-md bg-white mb-4 sm:mb-0 sm:mr-4"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="table-container overflow-x-auto rounded-lg shadow-lg"
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} className={column.className}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="text-sky-600 font-semibold">
                        {post.title}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {post.body}
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600 capitalize">
                          {post.tags.join(", ")}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <Pagination
            count={Math.ceil(pagination.total / pagination.pageSize)}
            page={pagination.current}
            onChange={handlePaginationChange}
            color="primary"
            className="text-blue-600"
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default Home;
