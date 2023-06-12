import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";

// import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="my-4 hidden w-[31%] flex-col items-center lg:flex">
      <div className="rounded-xl bg-twitter-dark-gray w-1/2 pl-5 pr-10 py-3">
        <h3 className="text-[22px] font-semibold text-white">Who to follow</h3>
        <div className="flex flex-col gap-1">
          {users.map((user: any) => {
            return (
              <div key={user.id} className="flex items-center gap-4">
                <Avatar userId={user.id as string} />
                <div className="flex flex-col">
                  <p className="text-lg text-white">{user.name}</p>
                  <p className="text-sm text-slate-400">@{user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
