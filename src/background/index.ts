import { uploadBookmark } from "@/api";
import { getTree } from '@/utils/chromeUtils';
// import myLocalStorage from "../utils/localStorageUtils";

// setInterval(() => {
//   console.log("background time ", Date.now());
// }, 3000);

/*global chrome*/
// chrome.runtime.onInstalled.addListener(function () {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         // 运行插件运行的页面URL规则
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({ pageUrl: {} }),
//         ],
//         actions: [new window.chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   // 接受来自content-script的消息，requset里不允许传递function类型的参数
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     const { contentRequest } = request;
//     // 接收来自content的api请求
//     if (contentRequest === "apiRequest") {
//       let { config } = request;
//       // API请求成功的回调
//       config.success = (data: any) => {
//         data.result = "succ";
//         sendResponse(data);
//       };
//       // API请求失败的回调
//       config.fail = (msg: any) => {
//         sendResponse({
//           result: "fail",
//           msg,
//         });
//       };
//       // 发起请求
//       apiRequest(config);
//     }
//   });
//   return true;
// });

const bookmarksChangeCallback = async(): Promise<void> => {
  const treeResult = await getTree();
  uploadBookmark(treeResult);
};

chrome.bookmarks.onChanged.addListener(bookmarksChangeCallback);
chrome.bookmarks.onChildrenReordered.addListener(bookmarksChangeCallback);
chrome.bookmarks.onCreated.addListener(bookmarksChangeCallback);
// chrome.bookmarks.onImportBegan.addListener(bookmarksChangeCallback);
chrome.bookmarks.onImportEnded.addListener(bookmarksChangeCallback);
chrome.bookmarks.onMoved.addListener(bookmarksChangeCallback);
chrome.bookmarks.onRemoved.addListener(bookmarksChangeCallback);

// 当书签或者书签夹发生改变时触发该事件。注意: 近期只有标题和url发生改变时，才触发该事件
// chrome.bookmarks.onChanged.addListener(function (id, changeInfo) {});

// 由于UI中的顺序发生改变时，书签夹会改变其子节点的顺序，此时会触发该事件。函数 move()不会触发该事件。
// chrome.bookmarks.onChildrenReordered.addListener(function (id, reorderInfo) {});

// 当创建书签或者书签夹夹时，会触发该事件。
// chrome.bookmarks.onCreated.addListener(function (id, bookmark) {});

// 当开始导入书签时，会触发该事件 。
// 事件响应者在导入结束前不要处理标签创建、更新的事件。但仍然可以立即处理其他事件。
// chrome.bookmarks.onImportBegan.addListener(function () {});

// 当导入书签结束时，会触发该事件 。
// chrome.bookmarks.onImportEnded.addListener(function () {});

// 当书签或者书签夹被移动到其他父书签夹时，触发该事件。
// chrome.bookmarks.onMoved.addListener(function (id, moveInfo) {});

// 当书签和书签夹被删除时，触发该事件。
// 当递归删除书签夹时，只会触发一个节点删除事件，它的子节点不会触发节点删除事件。
// chrome.bookmarks.onRemoved.addListener(function (id, removeInfo) {});
