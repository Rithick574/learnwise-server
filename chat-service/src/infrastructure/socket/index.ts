import { Socket } from "socket.io";
import { Server } from "http";
import { Server as IOServer } from "socket.io";
import { messageSeen, setLastSeen,saveNotification } from "../database/mongoDB/repositories";

const connectSocketIo = (server: Server) => {
  console.log("🚀 ~ file: index.ts:7 ~ connectSocketIo ~ server:", server)
  const io = new IOServer(server, {
    cors: {
      origin: ["https://learnwise-client.vercel.app"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};

  const getReceiverSocketId = (recieverId: string): string | undefined => {
    return userSocketMap[recieverId];
  };

  io.on("connection", (socket: Socket) => {
    const userId: string = socket.handshake.query.userId as string;
    console.log("🚀 ~ file: index.ts:24 ~ io.on ~ userId:", userId)
    if (userId) {
      userSocketMap[userId] = socket.id;
      setLastSeen(userId, new Date(Date.now()));
    } else {
      console.log("User ID is missing in handshake query");
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("joinNotifications", (userId: string) => {
      console.log(`User ${userId} joined notification room`);
      socket.join(userId);
    });

    socket.on("newNotification", async (notification) => {
      console.log("New notification received:", notification);
      try {
        await saveNotification(notification);
        const receiverSocketId = getReceiverSocketId(notification.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newNotification", notification);
        }
      } catch (error) {
        console.error("Error saving notification:", error);
      }
    });

    socket.on("newMessage", (newMessage: any) => {
      console.log("🚀 ~ file: index.ts:33 ~ socket.on ~ newMessage:", newMessage)
      const receiverSocketId = getReceiverSocketId(newMessage.obj.reciever);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
        setLastSeen(newMessage.obj.sender, new Date(Date.now()));
      } else {
        console.log("Receiver is offline");
      }
    });

    socket.on("messageSeen", async ({ messageId, chatId, recieverId }) => {
      console.log(`Message seen: ${messageId}, ${chatId}, ${recieverId}`);
      try {
        await messageSeen(messageId);
        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("messageSeen", { messageId, chatId });
        }
      } catch (error) {
        console.error("Error marking message as:", error);
      }
    });

    socket.on("typing", ({ roomId, sender }) => {
      console.log(`Typing from ${sender} to ${roomId}`);
      const receiverSocketId = getReceiverSocketId(roomId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { sender });
      }
    });

    socket.on("stopTyping", ({ roomId, sender }) => {
      console.log(`Stop typing from ${sender} to ${roomId}`);
      const receiverSocketId = getReceiverSocketId(roomId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", { sender });
      } else {
        console.log("Receiver not found to stop typing");
      }
    });

    socket.on("videoCall", (data) => {
      console.log("Video call data:", data);
      const targetSocketId: string | undefined = getReceiverSocketId(data.id);
      if (targetSocketId) {
        io.to(targetSocketId).emit("incomingCall", { data });
      } else {
        console.log("Target socket ID not found for video call");
      }
    });

    socket.on("joinCall", ({ callId }) => {
      console.log(`Joining call with callId ${callId}`);
      socket.join(callId);
    });

    socket.on("answer", ({ answer, callId }) => {
      console.log(`Answer received for call ${callId}`);
      socket.to(callId).emit("answer", { answer });
    });

    socket.on("endCall", ({ callId }) => {
      console.log(`Ending call with callId ${callId}`);
      io.to(callId).emit("callEnded");
      io.in(callId).socketsLeave(callId);
    });

    socket.on("acceptCall", ({ senderId, recieverId }) => {
      console.log(`Accepting call from ${senderId} by ${recieverId}`);
      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("callAccepted", { recieverId });
      } else {
        console.log("Sender not found to accept call");
      }
    });

    socket.on("declineCall", ({ senderId, recieverId }) => {
      console.log(`Declining call from ${senderId} by ${recieverId}`);
      const senderSocketId = getReceiverSocketId(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("callDeclined", { recieverId });
      } else {
        console.log("Sender not found to decline call");
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected", socket.id);
      Object.keys(userSocketMap).forEach((key) => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
          setLastSeen(key, new Date(Date.now()));
        }
      });
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export default connectSocketIo;
