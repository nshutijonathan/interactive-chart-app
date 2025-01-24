"use client";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputGroup } from "@/components/ui/input-group";
import { Button, HStack, Heading, Input, Stack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { fetchPosts } from "../../services/api";

interface Post {
  id: number;
  name: string;
  body: string;
  title: string;
}

const PostsTable = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts();
        const posts = response.data.map((post: any) => ({
          id: post.id,
          name: post.title,
          body: post.body || "N/A",
          title: post.title,
        }));
        setItems(posts);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <Heading size="md">Loading...</Heading>;
  }

  if (error) {
    return (
      <Heading size="md" color="red.500">
        {error}
      </Heading>
    );
  }

  // Filter posts based on the search query
  const filteredPosts = items.filter((post) =>
    post.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  const range = 2;
  for (
    let i = Math.max(currentPage - range, 1);
    i <= Math.min(currentPage + range, totalPages);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleViewClick = (post: Post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  return (
    <Stack width="full" gap="5" className="mt-10">
      <Heading size="xl">Posts</Heading>

      {/* Search Input */}
      <InputGroup>
        <Input
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search posts"
        />
      </InputGroup>

      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader className="font-bold">Post</Table.ColumnHeader>
            <Table.ColumnHeader className="font-bold">
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentPosts.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
                  onClick={() => handleViewClick(item)}
                >
                  View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <PaginationRoot
        count={filteredPosts.length}
        pageSize={postsPerPage}
        page={currentPage}
      >
        <HStack wrap="wrap" justify="center" gap="2">
          <PaginationPrevTrigger
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Stack gap={2} direction="row">
            {currentPage > 1 && (
              <Button
                onClick={() => paginate(1)}
                className="text-xs"
                colorScheme="teal"
                variant={currentPage === 1 ? "solid" : "outline"}
              >
                1
              </Button>
            )}
            {pageNumbers.map((number) => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                className="text-xs"
                colorScheme="teal"
                variant={currentPage === number ? "solid" : "outline"}
              >
                {number}
              </Button>
            ))}
            {currentPage < totalPages && (
              <Button
                onClick={() => paginate(totalPages)}
                className="text-xs"
                colorScheme="teal"
                variant={currentPage === totalPages ? "solid" : "outline"}
              >
                {totalPages}
              </Button>
            )}
          </Stack>
          <PaginationNextTrigger
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </HStack>
      </PaginationRoot>

      {/* Modal */}
      <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedPost && (
              <div>
                <p>
                  <strong>Title:</strong> {selectedPost.title}
                </p>

                <p>
                  <strong>Body:</strong> {selectedPost.body}
                </p>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
};

export default PostsTable;
