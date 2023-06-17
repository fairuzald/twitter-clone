import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ClipLoader } from "react-spinners";

// import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();

  if (isLoadingUsers || isLoadingCurrentUser) {
    return (
      <div className="my-4 hidden w-[25%] flex-col items-center lg:flex xl:w-[31%] ">
        <div className="flex w-1/2 items-center justify-center rounded-xl bg-twitter-dark-gray py-3 pl-5 pr-10">
          <ClipLoader
            color="#308CD8"
            loading={isLoadingUsers || isLoadingCurrentUser}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }
  if (users.length === 0) {
    return null;
  }
  return (
    <div className="relative my-4 hidden w-[30%]  flex-col items-center lg:flex xl:w-[31%]">
      <div className="fixed w-[250px] rounded-xl bg-twitter-dark-gray py-3 pl-5">
        <h3 className="text-[22px] font-semibold text-white">Who to follow</h3>
        <div className="flex flex-col gap-1">
          {users
            .filter((user: any) => user.id !== currentUser?.id)
            .slice(0, 8)
            .map((user: any) => (
              <div key={user.id} className="flex items-center gap-4 break-all">
                <Avatar userId={user.id as string} isBorder size="small" />
                <div className="flex flex-col">
                  <p className="text-lg text-white">{user.name}</p>
                  <p className="text-sm text-twitter-light-gray">@{user.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
