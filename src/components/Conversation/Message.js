import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Chat_History } from "../../data";
import {
  DocMSG,
  LinkMSG,
  MediaMSG,
  ReplyMSG,
  TextMSG,
  Timeline,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import {
    FetchCurrentMessages,
    SetCurrentConversation,
  } from "../../redux/slices/conversation";
  import { socket } from "../../socket";

const Message = ({ menu }) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);

    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      console.log(data, "List of messages");
      dispatch(FetchCurrentMessages({ messages: data }));
    });

    dispatch(SetCurrentConversation(current));
  }, []);
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {current_messages.map((el) => {
          switch (el.type) {
            case "divider":
              return <Timeline el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  //img msg
                  return <MediaMSG el={el} menu={menu} />;
                case "doc":
                  return <DocMSG el={el} menu={menu} />;
                case "link":
                  return <LinkMSG el={el} menu={menu} />;
                case "reply":
                  return <ReplyMSG el={el} menu={menu} />;
                default:
                  //text
                  return <TextMSG el={el} menu={menu} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
