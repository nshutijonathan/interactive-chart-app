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
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputGroup } from "@/components/ui/input-group";
import { Button, HStack, Heading, Input, Stack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  phone: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        const users = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          website: user.website,
          phone: user.phone,
        }));
        setUsers(users);
        setFilteredUsers(users);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <Stack width="full" gap="5" className="mt-10">
      <Heading size="xl">Users</Heading>

      {/* Search Input */}
      <InputGroup>
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users by name, email, or username"
        />
      </InputGroup>

      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader className="font-bold">User</Table.ColumnHeader>
            <Table.ColumnHeader className="hidden md:table-cell font-bold">
              Email
            </Table.ColumnHeader>
            <Table.ColumnHeader className="font-bold">
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
                  onClick={() => handleViewClick(user)}
                >
                  View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <HStack wrap="wrap" justify="center" gap="2">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            _active={{ bg: "blue.500", color: "white" }}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>

      {/* Modal */}
      <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" style={{ display: "none" }} />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedUser && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Website:</strong> {selectedUser.website}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
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

export default UsersTable;
