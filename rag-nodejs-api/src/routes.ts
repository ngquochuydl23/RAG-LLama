import { ChatController } from "./controller/chat.controller";
import { FileController } from "./controller/file.controller";
import { KnowledgeController } from "./controller/knowledge.controller";
import { uploadMiddleware } from "./middlewares/upload.middleware";

export const Routes = [
  // {
  //   method: "get",
  //   route: "/users",
  //   controller: UserController,
  //   action: "all",
  // },
  // {
  //   method: "get",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "one",
  // },
  // {
  //   method: "post",
  //   route: "/users",
  //   controller: UserController,
  //   action: "save",
  // },
  // {
  //   method: "delete",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "remove",
  // },
  {
    method: "post",
    route: "files/upload",
    controller: FileController,
    action: "uploadFile",
    middlewares: [uploadMiddleware.single("file")],
  },
  {
    method: "get",
    route: "files/:fileId",
    controller: FileController,
    action: "getFile",
  },
  {
    method: "post",
    route: "knowledge/:fileId/file/add",
    controller: KnowledgeController,
    action: "addFile",
  },
  {
    method: "post",
    route: "chat/completions",
    controller: ChatController,
    action: "completions",
  },
];
