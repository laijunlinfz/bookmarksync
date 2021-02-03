/**
 * 对比本地和服务器书签数据，找出需要更改的数据
 */

let delList: string[] = [];
let updateList: any[] = [];
let createList: any[] = [];
let createCloudList: any[] = [];

const checkDelList = (itemLocal: any, cloudList: any[] = [], recentBookmark: any[] = []): void => {
  const { id = '' } = itemLocal || {};
  // console.log('itemLocal --- ', itemLocal);
  // console.log('cloudList --- ', cloudList);
  // console.log('recentBookmark --- ', recentBookmark);
  if (!cloudList.some((c) => c.id === id)) {
    if (recentBookmark.some((r) => r.id === id)) {
      createCloudList.push(itemLocal);
    } else {
      delList.push(id);
    }
  }
};

const checkCreateList = (itemCloud: any, localList: any[]): void => {
  const { id } = itemCloud;
  if (!localList.some((l) => l.id === id)) {
    createList.push(itemCloud);
  }
};

const checkUpdateList = (itemCloud: any, localList: any[]): void => {
  const { id, url, title } = itemCloud;
  localList.forEach(item => {
    if (id === item.id && url !== item.url && title !== item.title) {
      updateList.push(itemCloud);
    }
  })
};

export const merge = (localBookmark: any, cloudBookmark: any, recentBookmark: any) => {
  delList = [];
  updateList = [];
  createList = [];
  createCloudList = [];
  if (!cloudBookmark) {
    return localBookmark;
  }
  const recordChange = (localList: any[], cloudList: any[]): void => {
    for (let i = 0; i < cloudList.length; i++) {
      const itemCloud = cloudList[i];
      const itemLocal = localList[i];
      checkDelList(itemLocal, cloudList, recentBookmark);
      checkCreateList(itemCloud, localList);
      checkUpdateList(itemCloud, localList);
      const hasNext = itemLocal && Array.isArray(itemLocal.children) && itemCloud && Array.isArray(itemCloud.children);
      if (hasNext) {
        recordChange(itemLocal.children, itemCloud.children);
      }
    }
  };
  recordChange(localBookmark, cloudBookmark);
  return { delList, updateList, createList, createCloudList };
};
