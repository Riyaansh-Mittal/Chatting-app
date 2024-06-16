// import { Stack } from "@mui/material";
// import React, { useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
// import { useDispatch, useSelector } from "react-redux";
// import { connectSocket, socket } from "../../socket";
// import { selectConversation, showSnackbar } from "../../redux/slices/app";
// import {
//   AddDirectConversations,
//   UpdateDirectConversations,
//   AddDirectMessage,
// } from "../../redux/slices/conversation";

// const DashboardLayout = () => {
//   const { conversations, current_conversation } = useSelector(
//     (state) => state.conversation.direct_chat
//   );
//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const user_id = window.localStorage.getItem("user_id");

//   useEffect(() => {
//     if (isLoggedIn) {
//       window.onload = function () {
//         if (!window.location.hash) {
//           window.location = window.location + "#loaded";
//           window.location.reload();
//         }
//       };

//       window.onload();

//       if (!socket) {
//         connectSocket(user_id);
//       }

//       // "new_friend_request"

//       socket.on("new_friend_request", (data) => {
//         dispatch(showSnackbar({ severity: "success", message: data.message }));
//       });
//       socket.on("request_accepted", (data) => {
//         dispatch(showSnackbar({ severity: "success", message: data.message }));
//       });
//       socket.on("request_sent", (data) => {
//         dispatch(showSnackbar({ severity: "success", message: data.message }));
//       });
//       socket.on("new_message", (data) => {
//         const message = data.message;
//         console.log(current_conversation, data);
//         // check if msg we got is from currently selected conversation
//         if (current_conversation?.id === data.conversation_id) {
//           dispatch(
//             AddDirectMessage({
//               id: message._id,
//               type: "msg",
//               subtype: message.type,
//               message: message.text,
//               incoming: message.to === user_id,
//               outgoing: message.from === user_id,
//             })
//           );
//         }
//       });
//       socket.on("start_chat", (data) => {
//         const existing_conversation = conversations.find(
//           (el) => el._id === data._id
//         );
//         if (existing_conversation) {
//           dispatch(UpdateDirectConversations({ conversations: data }));
//         } else {
//           dispatch(AddDirectConversations({ conversations: data }));
//         }
//         dispatch(selectConversation({ room_id: data._id }));
//       });
//     }

//     return () => {
//       socket?.off("new_friend_request");
//       socket?.off("request_accepted");
//       socket?.off("request_sent");
//       socket?.off("start_chat");
//     };
//   }, [isLoggedIn, socket]);

//   if (!isLoggedIn) {
//     return <Navigate to="/auth/login" />;
//   }
//   return (
//     <Stack direction="row">
//       {/*SideBar*/}
//       <SideBar />
//       <Outlet />
//       {/*Outlet is used so that the generalApp code can also be rendered*/}
//     </Stack>
//   );
// };

// export default DashboardLayout;
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { selectConversation, showSnackbar } from "../../redux/slices/app";
import {
  AddDirectConversations,
  UpdateDirectConversations,
  AddDirectMessage,
} from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      if (!socket) {
        connectSocket(user_id);
      }

      // "new_friend_request"
      const handleNewFriendRequest = (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      };

      const handleRequestAccepted = (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      };

      const handleRequestSent = (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      };

      const handleNewMessage = (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      };

      const handleStartChat = (data) => {
        const existing_conversation = conversations.find(
          (el) => el._id === data._id
        );
        if (existing_conversation) {
          dispatch(UpdateDirectConversations({ conversations: data }));
        } else {
          dispatch(AddDirectConversations({ conversations: data }));
        }
        dispatch(selectConversation({ room_id: data._id }));
      };

      socket.on("new_friend_request", handleNewFriendRequest);
      socket.on("request_accepted", handleRequestAccepted);
      socket.on("request_sent", handleRequestSent);
      socket.on("new_message", handleNewMessage);
      socket.on("start_chat", handleStartChat);

      return () => {
        socket.off("new_friend_request", handleNewFriendRequest);
        socket.off("request_accepted", handleRequestAccepted);
        socket.off("request_sent", handleRequestSent);
        socket.off("new_message", handleNewMessage);
        socket.off("start_chat", handleStartChat);
      };
    }
  }, [isLoggedIn, current_conversation?.id, user_id, dispatch, conversations]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Stack direction="row">
      {/*SideBar*/}
      <SideBar />
      <Outlet />
      {/*Outlet is used so that the generalApp code can also be rendered*/}
    </Stack>
  );
};

export default DashboardLayout;
