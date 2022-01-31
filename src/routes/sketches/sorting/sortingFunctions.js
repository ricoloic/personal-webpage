// eslint-disable-next-line no-promise-executor-return
export const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sort = async (list, itt) => {
  const i = itt % list.length;
  if (i && list[i].value < list[i - 1].value) {
    const temp = list[i];
    list[i] = list[i - 1];
    list[i - 1] = temp;
    list[i].current = 1;
  } else {
    list[i].current = 0;
    if (i - 1 >= 0) list[i - 1].current = 0;
  }
};

export const bubbleSort = async (list, sleepTime) => {
  for (let itt = 0; itt < list.length * list.length; itt += 1) {
    sort(list, itt);
    // eslint-disable-next-line no-await-in-loop
    if (sleepTime) await sleep(sleepTime);
  }
  list.forEach((elem) => {
    elem.current = 0;
  });
};

const partition = async (list, lo, hi) => {
  const pivot = list[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    list[j].current = 2;
    if (list[j].value < pivot.value) {
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
      i++;
    }
  }
  const temp = list[i];
  list[i] = { ...list[hi], current: 1 };
  list[hi] = temp;
  return i;
};

export const quickSort = async (list, lo, hi, sleepTime) => {
  if (lo < hi) {
    const p = await partition(list, lo, hi);

    if (sleepTime) await sleep(sleepTime);
    // await Promise.all([
    //   quickSort(list, lo, p - 1, sleepTime),
    //   quickSort(list, p + 1, hi, sleepTime),
    // ]);

    await sleep(sleepTime / 2);
    await quickSort(list, lo, p - 1, sleepTime);
    await sleep(sleepTime / 2);
    await quickSort(list, p + 1, hi, sleepTime);

    for (let i = lo; i < hi; i++) {
      list[i].current = 0;
    }
    list[p].current = 0;
  }

  if (lo === 0) {
    list.forEach((elem) => {
      elem.current = 0;
    });
  }
};
