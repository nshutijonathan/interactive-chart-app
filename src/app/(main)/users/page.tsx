import BackButton from "@/components/BackButton";
import UsersTable from "@/components/users/UsersTable";
const UsersPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <UsersTable />
    </>
  );
};

export default UsersPage;
