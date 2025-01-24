"use strict";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputGroup } from "@/components/ui/input-group";
import { Button, HStack, Heading, Input, Stack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchComments } from "../../services/api";
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentsTable = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetchComments();
        const comments = response.data.map((comment: any) => ({
          id: comment.id,
          name: comment.name,
          email: comment.email,
          body: comment.body,
        }));
        setComments(comments);
        setFilteredComments(comments);
      } catch (err) {
        setError("Failed to fetch comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(term) ||
        comment.email.toLowerCase().includes(term) ||
        comment.body.toLowerCase().includes(term)
    );
    setFilteredComments(filtered);
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

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

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

  const handleViewClick = (comment: Comment) => {
    setSelectedComment(comment);
    setIsOpen(true);
  };

  return (
    <Stack width="full" gap="5" className="mt-10">
      <Heading size="xl">Comments</Heading>

      <InputGroup flex="1">
        <Input
          placeholder="Search comments by name, email, or body"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader className="font-bold">
              Comment
            </Table.ColumnHeader>
            <Table.ColumnHeader className="hidden md:table-cell font-bold">
              Email
            </Table.ColumnHeader>
            <Table.ColumnHeader className="font-bold">
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentComments.map((comment) => (
            <Table.Row key={comment.id}>
              <Table.Cell>{comment.name}</Table.Cell>
              <Table.Cell>{comment.email}</Table.Cell>
              <Table.Cell>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
                  onClick={() => handleViewClick(comment)}
                >
                  View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <PaginationRoot
        count={filteredComments.length}
        pageSize={commentsPerPage}
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

      <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" style={{ display: "none" }} />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comment Details</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedComment && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedComment.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedComment.email}
                </p>
                <p>
                  <strong>Body:</strong> {selectedComment.body}
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

export default CommentsTable;
