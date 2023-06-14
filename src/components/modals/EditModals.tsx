import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useCallback, useEffect, useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { toast } from "react-hot-toast";
import axios from "axios";
import useEditModal from "@/hooks/useEditModals";
import Modals from "./Modals";
import CrossIcon from "../icons/CrossIcon";
import Button from "../Button";
import Avatar from "../Avatar";
import TextInput from "../TextInput";
import useUser from "@/hooks/useUser";
import AvatarUpload from "../AvatarUpload";
import ImageUpload from "../ImageUpload";

const EditModals = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate } = useUser(currentUser?.id);
  const [isLoading, setIsLoading] = useState(false);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      toast.success("Your data is updated.");
      mutate();
      editModal.onClose();
    } catch (error) {
      toast.error("Something went error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [name, username, bio, profileImage, coverImage, editModal, mutate]);
  const header = (
    <div className="flex items-center justify-between">
      <div className="items-center-justify between flex gap-4">
        <button
          onClick={editModal.onClose}
          className="rounded-full p-2 hover:bg-twitter-light-gray"
        >
          <CrossIcon style="w-4 h-4 fill-white" />
        </button>
        <h3 className="text-2xl font-semibold text-white">Edit profile</h3>
      </div>
      <div className="w-[100px]">
        <Button color="white" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
  const body = (
    <div className="flex flex-col gap-20">
      <div className="relative flex h-36 w-full bg-[#333639]">
        <ImageUpload
          url={coverImage}
          alt={"Cover Image"}
          setUrl={setCoverImage}
        />
        <div className="absolute -bottom-16 left-4">
          <AvatarUpload
            url={profileImage}
            setUrl={setProfileImage}
            disabled={isLoading}
            alt="PP"
            isBorder
            size="medium"
          ></AvatarUpload>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <TextInput
          value={name}
          setValue={setName}
          placeholder="Name"
          type="text"
          required
        />
        <TextInput
          value={username}
          setValue={setUsername}
          placeholder="UserName"
          type="text"
          required
        />
        <TextInput
          value={bio}
          setValue={setBio}
          placeholder="Bio"
          type="text"
          required
        />
      </div>
    </div>
  );
  return <Modals isOpen={editModal.isOpen} header={header} body={body} />;
};

export default EditModals;
