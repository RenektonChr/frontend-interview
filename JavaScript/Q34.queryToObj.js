function parseQueryString(url) {
  if(typeof url !== 'string') {
    throw TypeError('url must be string.');
  }
  const search = decodeURIComponent(url).split('?')[1];
  console.log(search)
  if(!search) return {};
  return search.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    pre[key] = value;
    return pre;
  },{})
}

const obj = parseQueryString("http://iauto360.cn/index.php?key0=0&key1=1&key2=2");

console.log(obj);
