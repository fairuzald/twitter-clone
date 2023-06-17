import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserProfile from "@/components/UserProfile";
import useUsers from "@/hooks/useUsers";
import PageHead from "@/components/PageHead";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Explore = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = useUsers();
  const [offset, setOffset] = useState(5);

  // Handler for "Show more" button click
  const onCount = () => {
    const newOffset = offset + 4;
    setOffset(newOffset);
  };

  // Handler mutation user length found
  const foundUserLength = users?.filter(
    (user: Record<any, string>) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.username?.toLowerCase().includes(search.toLowerCase())
  ).length;

  const router = useRouter();
  const { data:sessionData, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" && !sessionData) {
      toast.error("You must login to use");
      router.push("/login");
    }
  }, [router, status, sessionData]);
  return (
    <>
      {/* Page Head for Metatags */}
      <PageHead
        title="Explore | Twitter Clone"
        websiteName="Fairuz Twitter Clone"
        description="Twitter clone made by fairuz"
        faviconUrl="/logo-twitter-clone.png"
        logoUrl="https://www.datocms-assets.com/102850/1686900586-logo-twitter-clone.png"
      />
      {/* Header component with search bar */}
      <Header
        body={
          <SearchBar
            value={search}
            setValue={setSearch}
            placeholder="Search in Twitter"
          />
        }
      />
      {/* Cliploader while data try to fetched */}
      {isLoading ? (
        <div className="m-auto flex h-[calc(100vh-200px)] w-full items-center justify-center">
          {/* Loading spinner */}
          <ClipLoader
            color="#308CD8"
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // Main users component will showed
        <main className="w-full px-7 lg:px-8 py-2">
          {search ? (
            // Display filtered users based on search query
            <>
              {/* Mutation found users */}
              <p className="py-4 text-center text-sm  lg:text-base font-bold text-twitter-blue">
                {foundUserLength <= 0
                  ? "Not found users"
                  : foundUserLength === 1
                  ? foundUserLength + " found user"
                  : foundUserLength + " found users"}
              </p>
              <div>
                {users
                  .filter(
                    (user: Record<any, string>) =>
                      user.name?.toLowerCase().includes(search.toLowerCase()) ||
                      user.username
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((user: Record<any, string>) => (
                    <div key={user.id}>
                      <UserProfile data={user} />
                    </div>
                  ))}
              </div>
            </>
          ) : (
            // Display all users
            users?.slice(0, offset).map((user: Record<any, string>) => (
              <div key={user.id}>
                <UserProfile data={user} />
              </div>
            ))
          )}

          {!search && offset < users.length && (
            // "Show more" button to load additional users
            <p
              className="text-center text-twitter-blue hover:cursor-pointer text-sm lg:text-base mt-2"
              onClick={onCount}
            >
              Show more
            </p>
          )}
        </main>
      )}
    </>
  );
};

export default Explore;
