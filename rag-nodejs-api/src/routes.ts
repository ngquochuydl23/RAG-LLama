import { FileController } from "./controller/file.controller";
import { UserController } from "./controller/UserController";
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
    middlewares: [uploadMiddleware.single("file")], // multer middleware here
  },
  {
    method: "get",
    route: "files/:fileId",
    controller: FileController,
    action: "getFile"
  },
];
