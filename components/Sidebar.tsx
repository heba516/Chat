"use client";
import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import {
  Separator,
  Skeleton,
  ScrollArea,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components/ui";
import { newConversation, sidebar } from "@/app/actions/userActions";
import { Ichat } from "@/interfaces";
import { Plus } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

const Sidebar = ({
  onChatSelect,
}: {
  onChatSelect: (id: string, user: Ichat) => void;
}) => {
  const [contacts, setContacts] = useState<Ichat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const response = await sidebar();
      console.log(response.data);

      if (response.data) setContacts(response.data);
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewConversation = async () => {
    setErrorMsg("");
    try {
      if (!inputRef.current) return;
      console.log(inputRef.current.value);

      const res = await newConversation(inputRef.current.value);
      console.log(res.data[0]);

      if (contacts.includes(res.data[0])) {
        setErrorMsg("Contact already exists");
        return;
      }

      setContacts((prev) => [...prev, res.data[0]]);
      inputRef.current.value = "";
      setErrorMsg("");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setErrorMsg("No contacts found matching the search criteria");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollArea className="relative w-full h-[88vh] sm:h-[86vh] p-4 bg-white rounded-2xl">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 my-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))
      ) : (
        <>
          {contacts.map((contact) => (
            <React.Fragment key={contact._id}>
              <Chat
                key={contact._id}
                user={contact}
                setContacts={setContacts}
                onClick={() => {
                  onChatSelect(contact._id, contact);
                }}
              />
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="absolute right-4 bottom-4 z-50">
          <Button
            size={"icon"}
            className="h-10 w-10 ml-auto rounded-full bg-green-600 hover:bg-green-700"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-5 w-5 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Conversation</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4 my-4">
            <Input
              ref={inputRef}
              id="name"
              className="col-span-4"
              placeholder="Enter Name"
            />
            {errorMsg && <p className="text-red-600 col-span-4">{errorMsg}</p>}
          </div>
          <Button
            className="w-full bg-green-700 hover:bg-green-800 uppercase rounded-xl"
            onClick={addNewConversation}
            type="submit"
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
};

export default Sidebar;
