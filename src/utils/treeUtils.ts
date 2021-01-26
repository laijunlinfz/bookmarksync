/** 实现树的 */

const getItemById = (id: string, arr: any[]) => {
};

export const merge = (localBookmark: any, cloudBookmark: any, recentBookmark: any) => {
  if (!cloudBookmark) {
    return localBookmark;
  }
  let itemLocal = localBookmark;
  let itemCloud = cloudBookmark;
  for (let i = 0; i < itemCloud.length; i++) {
    const { id } = itemCloud[i];
  }
};
