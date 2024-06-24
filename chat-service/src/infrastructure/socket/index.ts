import { Socket } from "socket.io";
import { Server } from "http";
import socketIO from "socket.io";

const connectSocketIo = (server: Server) => {
  const io = new socketIO.Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};
  const userLastSeen: { [key: string]: number } = {};

  const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
  };

  // Connection
  io.on("connection", (socket: Socket) => {
    console.log("🚀 ~ file: index.ts:23 ~ io.on ~ socket:", socket.id);
    const userId: string = socket.handshake.query.userId as string;
    if (userId) {
      userSocketMap[userId] = socket.id;
      userLastSeen[userId] = Date.now();
    } else {
      console.log("User ID is missing in handshake query");
    }

    // Get online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // New messages
    socket.on("newMessage", (newMessage) => {
      const receiverSocketId = getReceiverSocketId(newMessage.obj.receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      } else {
        console.log("Receiver is offline");
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Socket Disconnected", socket.id);
      Object.keys(userSocketMap).forEach((key) => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
          userLastSeen[key] = Date.now();
        }
      });
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    // Read message
    socket.on("readMessage", (messageId: string, chatId: string) => {
    });

    // Typing
    socket.on(
      "typing",
      ({ roomId, sender }: { roomId: string; sender: string }) => {
        console.log("Typing event received on server", roomId, sender);
        io.to(roomId).emit("typing", { sender, roomId });
      }
    );

    // Stop typing
    socket.on(
      "stopTyping",
      ({ roomId, sender }: { roomId: string; sender: string }) => {
        console.log("Typing is stopped");
        io.to(roomId).emit("stopTyping", { sender });
      }
    );
  });
};

export default connectSocketIo;
