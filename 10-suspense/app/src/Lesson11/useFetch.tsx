const cache: { [key: string]: any } = {};

export const prefetch = (url: string) => {
  cache[url] = {};
  cache[url].request = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cache[url].data = data;
    })
    .catch((error) => {
      cache[url].error = error;
    });
};

const useFetch = (url: string) => {
  const entry = cache[url];
  if (entry) {
    if (entry.error) {
      throw entry.error;
    } else if (entry.data) {
      return entry.data;
    } else {
      throw entry.request;
    }
  }

  prefetch(url);

  throw cache[url].request;
};

export default useFetch;
