import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";

// import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="my-4 hidden w-[31%] flex-col items-center lg:flex">
      <div className="w-1/2 rounded-xl bg-twitter-dark-gray py-3 pl-5 pr-10">
        <h3 className="text-[22px] font-semibold text-white">Who to follow</h3>
        <div className="flex flex-col gap-1">
          {users
            .filter((user: any) => user.id !== currentUser?.id)
            .map((user: any) => (
              <div key={user.id} className="flex items-center gap-4">
                <Avatar userId={user.id as string} isBorder size="small"/>
                <div className="flex flex-col">
                  <p className="text-lg text-white">{user.name}</p>
                  <p className="text-sm text-slate-400">@{user.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
