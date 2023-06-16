import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserProfile from "@/components/UserProfile";
import useUsers from "@/hooks/useUsers";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Explore = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = useUsers();
  const [offset, setOffset] = useState(5);

  const onCount = () => {
    const newOffset = offset + 4;
    setOffset(newOffset);
  };

  return (
    <>
      <Header
        body={
          <SearchBar
            value={search}
            setValue={setSearch}
            placeholder="Search in Twitter"
          />
        }
      />

      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <ClipLoader
            color="#308CD8"
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="w-full px-8">
          {search
            ? users
                .filter(
                  (user: Record<any, string>) =>
                    user.name?.toLowerCase().includes(search.toLowerCase()) ||
                    user.username?.toLowerCase().includes(search.toLowerCase())
                )
                .map((user: Record<any, string>) => (
                  <div key={user.id}>
                    <UserProfile isLink data={user} />
                  </div>
                ))
            : users?.slice(0, offset).map((user: Record<any, string>) => (
                <div key={user.id}>
                  <UserProfile isLink data={user} />
                </div>
              ))}
              
          {!search && offset < users.length && (
            <p
              className="text-twitter-blue hover:cursor-pointer"
              onClick={onCount}
            >
              Show more
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Explore;
